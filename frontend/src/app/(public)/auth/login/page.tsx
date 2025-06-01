"use client";

import AuthPageWrapper from "@/components/AuthPageWrapper";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { AnimatePresence } from "framer-motion";
import {
  FormWrapper,
  TextInput,
  Button,
  StatusMessage,
  PageTitle,
  LinkText,
} from "@/components/Forms/FormComponents";
import Button3D from "@/components/Buttons/Button3D";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import Notification from "@/components/Notification";
import OAuthGoogle from "@/components/Auth/OAuthGoogle";
import { usePathname, useSearchParams } from "next/navigation";
import {
  useGetCaptcha,
  useLoginUser,
  useVerifyCaptcha,
} from "@/graphql/auth/hooks";
import SliderCaptcha from "@slider-captcha/react";

export default function LoginPage() {
  const pathname = usePathname();
  const { isNeumorphism } = useNeumorph();
  const { login, isLoginLoading, loginError, statusLogin } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const {
    data: captchaData,
    loading: captchaLoading,
    refetch: refetchCaptcha,
  } = useGetCaptcha();
  const [localCaptchaData, setLocalCaptchaData] = useState<{
    background: {};
    slider: {};
  } | null>(null);

  const [verifyCaptchaMutation, { error: verifFail }] = useVerifyCaptcha();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (captchaData?.getCaptcha?.data) {
      setLocalCaptchaData(captchaData.getCaptcha.data);
      console.log(
        "captchaData?.getCaptcha?.data : ",
        captchaData?.getCaptcha?.data
      );
    }
  }, [captchaData]);

  useEffect(() => {
    const email = searchParams.get("email") ?? "";
    setUsername(email);
  }, [pathname]);

  const trailRef = useRef<{ x: number[]; y: number[] }>({ x: [], y: [] });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    trailRef.current.x.push(e.clientX);
    trailRef.current.y.push(e.clientY);

    // console.clear();
    // console.log("Realtime mouse trail:", trailRef.current);
  };

  const handleMouseDown = () => {
    trailRef.current = { x: [], y: [] };
  };

  const verifyCaptcha = async (
    response: number,
    trail: { x: number[]; y: number[] }
  ) => {
    try {
      console.log("Captcha response from slider:", response, " - ", trail);

      const { data } = await verifyCaptchaMutation({
        variables: {
          responseBody: {
            response,
            trail,
          },
        },
      });

      if (data.verifyCaptcha.result !== "success") {
        setLocalCaptchaData(null);
        setIsCaptchaVerified(false);
        setCaptchaToken(null);

        const newCaptchaDataResult = await refetchCaptcha();

        if (newCaptchaDataResult.data?.getCaptcha?.data) {
          setLocalCaptchaData(newCaptchaDataResult.data.getCaptcha.data);
        }

        // throw new Error("Captcha verification failed");
      }

      setIsCaptchaVerified(true);
      console.log("captchaToken : ", data.verifyCaptcha.token);

      setCaptchaToken(data.verifyCaptcha.token);
      return data.verifyCaptcha;
    } catch (error) {
      console.error("Captcha verification error:", error);
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "!isCaptchaVerified || !captchaToken :",
      !isCaptchaVerified,
      !captchaToken
    );
    // if (!isCaptchaVerified || !captchaToken) {
    //   alert("Please complete and verify the captcha before logging in.");
    //   return;
    // }

    try {
      await login(username, password, captchaToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthPageWrapper>
      <AnimatePresence>
        <div
          className={`p-8 rounded-2xl ${
            isNeumorphism ? "neumorphic-convex" : "bg-[var(--card)]"
          } transition-all duration-300`}
        >
          <PageTitle title="Want to access? Please Sign In" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-[var(--text-accent)]">Mode:</span>
            <Button3D />
          </div>

          <FormWrapper onSubmit={handleSubmit}>
            <TextInput
              id="username"
              label="Username / Email"
              placeholder="Enter your username / email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {loginError && loginError.message.includes("Username") && (
              <StatusMessage success={false} message={loginError.message} />
            )}

            <TextInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {loginError && loginError.message.includes("Password") && (
              <StatusMessage success={false} message={loginError.message} />
            )}

            {localCaptchaData ? (
              <div
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                style={{ display: "inline-block" }}
              >
                <SliderCaptcha
                  create={() => Promise.resolve(localCaptchaData)}
                  verify={verifyCaptcha}
                  text={{
                    anchor: "I am human",
                    challenge: "Slide to finish the puzzle",
                  }}
                  variant="dark"
                  callback={(token) => {
                    // ...
                  }}
                />
              </div>
            ) : (
              <div>Loading captcha...</div>
            )}

            {statusLogin?.success && (
              <Notification message={statusLogin.message} />
            )}

            <Button
              type="submit"
              // disabled={!isCaptchaVerified || isLoginLoading}
              loading={isLoginLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </FormWrapper>

          <div className="flex justify-end my-4">
            <OAuthGoogle />
          </div>

          <LinkText
            text="Don't have an account?"
            linkText="Register here"
            href="/auth/register"
          />
        </div>
      </AnimatePresence>
    </AuthPageWrapper>
  );
}
