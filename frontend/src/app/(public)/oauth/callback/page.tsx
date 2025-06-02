"use client";

import { useOauthLogin } from "@/graphql/auth/hooks";
import { ApolloError } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback(): {} {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState<string | null>(null);
  const [oAuthLogin, { data, error: GraphQLError, loading }] = useOauthLogin();
  const [dataGoogle, setDataGoogle] = useState<any>(null);

  useEffect(() => {
    if (!code) return;
    setError(null);
    setDataGoogle(null);

    oAuthLogin({ variables: { provider: "google", code } })
      .then(({ data }) => {
        if (
          data?.oAuthLogin?.success === true &&
          data.oAuthLogin.user &&
          typeof data.oAuthLogin.user.id === "string" &&
          data.oAuthLogin.user.id.trim() !== ""
        ) {
          router.replace("/dashboard");
        } else {
          if (data?.oAuthLogin?.message === "Email is not found") {
            setDataGoogle(data?.oAuthLogin?.user);
            setError(data?.oAuthLogin?.message);
          } else if (data?.oAuthLogin?.message === "User is not found") {
            setDataGoogle(data?.oAuthLogin?.user?.email);
            setError(data?.oAuthLogin?.message);
          }
        }
      })
      .catch((err) => {
        setError(err.message || "Unexpected error");
      });
  }, [code, oAuthLogin, router]);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // const timer = setTimeout(() => {
    setVisible(false);
    // router.push("/auth/login"); // redirect otomatis setelah 5 detik
    // }, 5000);

    // return () => clearTimeout(timer);
  }, [router]);

  if (loading)
    return (
      <p className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-5/6">
        Loading, please wait...
      </p>
    );

  const handleSignUpClick = () => {
    const query = new URLSearchParams({
      id: dataGoogle?.id,
      name: dataGoogle?.name,
      email: dataGoogle?.email,
    }).toString();

    router.push(`/auth/register?${query}`);
  };

  const handleSignInClick = () => {
    const query = new URLSearchParams({
      email: dataGoogle,
    }).toString();

    router.push(`/auth/login?${query}`);
  };

  return (
    <>
      {/* Style animasi di dalam file (temporary)*/}
      <style>{`
        @keyframes fade-slide-left {
          0%, 100% {
            opacity: 0;
            transform: translateX(10px);
          }
          50% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-slide-left {
          animation: fade-slide-left 2s ease-in-out infinite;
        }
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease forwards;
        }
      `}</style>

      {error === "Email is not found" && (
        <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-3/4 max-w-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 shadow-lg rounded-md animate-slide-in z-50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 18h.01"
                />
              </svg>
              <p className="text-sm font-medium">
                This email is not registered. Please sign up first.
              </p>
            </div>

            <button
              onClick={handleSignUpClick}
              className="flex cursor-pointer items-center space-x-2 text-yellow-700 bg-yellow-200 hover:bg-yellow-300 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {/* Panah kiri dengan animasi fade-slide-left */}
              <svg
                className="w-5 h-5 text-yellow-700 animate-fade-slide-left"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}

      {error === "User is not found" && (
        <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-3/4 max-w-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 shadow-lg rounded-md animate-slide-in z-50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 18h.01"
                />
              </svg>
              <p className="text-sm font-medium">
                Your email is already registered but not yet confirmed. Please
                log in and verify your account first.
              </p>
            </div>

            <button
              onClick={handleSignInClick}
              className="flex cursor-pointer items-center space-x-2 text-yellow-700 bg-yellow-200 hover:bg-yellow-300 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {/* Panah kiri dengan animasi fade-slide-left */}
              <svg
                className="w-5 h-5 text-yellow-700 animate-fade-slide-left"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
