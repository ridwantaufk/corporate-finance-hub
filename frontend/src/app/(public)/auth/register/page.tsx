"use client";

import { useState, useCallback, useEffect } from "react";
import { useCreateUser } from "@/graphql/auth/hooks";
import AuthPageWrapper from "@/components/AuthPageWrapper";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

import {
  TextInput,
  CustomPhoneInput,
  SelectInput,
  ToggleSwitch,
  Button,
  FormWrapper,
  StatusMessage,
  LinkText,
  PageTitle,
} from "@/components/Forms/FormComponents";
import Button3D from "@/components/Buttons/Button3D";

// Type definitions
interface RoleOption {
  value: string;
  label: string;
}

interface Biodata {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | undefined;
}

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  role: RoleOption | null;
  isActive: boolean;
  biodata: Biodata;
}

const roleOptions: RoleOption[] = [
  { value: "", label: "Select your role" },
  { value: "client", label: "Client" },
  { value: "admin", label: "Admin" },
  { value: "rm", label: "RM" },
  { value: "finance_controller", label: "Finance Controller" },
];

export default function RegisterPage() {
  const pathname = usePathname();
  const { isNeumorphism } = useNeumorph();
  const [registerUser, { loading, error }] = useCreateUser();
  const [registrationStatus, setRegistrationStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [dataGoogle, setDataGoogle] = useState<{
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id") || "";
    const name = searchParams.get("name") || "";
    const [firstName, lastName] = name.split(" ");
    const email = searchParams.get("email") || "";

    setDataGoogle({ id, firstName, lastName, email });
  }, [pathname]);

  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
    role: null,
    isActive: true,
    biodata: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (dataGoogle) {
      setFormState((prev) => ({
        ...prev,
        biodata: {
          ...prev.biodata,
          first_name: dataGoogle.firstName ?? "",
          last_name: dataGoogle.lastName ?? "",
          email: dataGoogle.email ?? "",
        },
      }));
    }
  }, [dataGoogle]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleBiodataChange = useCallback(
    (field: keyof Biodata, value: string) => {
      setFormState((prev) => ({
        ...prev,
        biodata: {
          ...prev.biodata,
          [field]: value,
        },
      }));
    },
    []
  );

  const handleToggleChange = useCallback(() => {
    setFormState((prev) => ({ ...prev, isActive: !prev.isActive }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword, role, biodata, isActive, username } =
      formState;

    setRegistrationStatus(null);

    if (password !== confirmPassword) {
      setRegistrationStatus({
        success: false,
        message: "Passwords do not match!",
      });
      return;
    }

    if (!role || !role.value) {
      setRegistrationStatus({
        success: false,
        message: "Please select a role",
      });
      return;
    }

    if (!biodata.first_name || !biodata.last_name || !biodata.email) {
      setRegistrationStatus({
        success: false,
        message: "Please fill all required fields",
      });
      return;
    }

    console.log("Submitting registration with data:", {
      username,
      password: "[REDACTED]",
      role: role.value,
      is_active: isActive,
      biodata: {
        first_name: biodata.first_name,
        last_name: biodata.last_name,
        email: biodata.email,
        phone: biodata.phone || "",
      },
    });

    try {
      const { data } = await registerUser({
        variables: {
          input: {
            username,
            password,
            role: role.value,
            is_active: isActive,
            biodata: {
              first_name: biodata.first_name,
              last_name: biodata.last_name,
              email: biodata.email,
              phone: biodata.phone || "",
            },
          },
        },
      });

      console.log("Registration successful:", data);
      setRegistrationStatus({
        success: true,
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Registration error details:", err);

      let errorMessage = "Registration failed";
      if (err instanceof Error) {
        console.error("Error type:", err.constructor.name);
        console.error("Error message:", err.message);
        errorMessage = err.message;

        if ("graphQLErrors" in err) {
          const graphQLErrors = (err as any).graphQLErrors;
          if (graphQLErrors && graphQLErrors.length > 0) {
            console.error("GraphQL errors:", graphQLErrors);
            errorMessage = graphQLErrors[0].message || errorMessage;
          }
        }

        if ("networkError" in err) {
          const networkError = (err as any).networkError;
          if (networkError) {
            console.error("Network error:", networkError);
            errorMessage = "Network error. Please check your connection.";
          }
        }
      }

      setRegistrationStatus({
        success: false,
        message: errorMessage,
      });
    }
  };

  return (
    <AuthPageWrapper>
      <AnimatePresence>
        <div
          className={`p-8 rounded-2xl ${
            isNeumorphism ? "neumorphic-convex" : "bg-[var(--card)]"
          } transition-all duration-300 max-h-[95vh] overflow-y-auto`}
        >
          <PageTitle title="Create Your Account" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-[var(--text-accent)]">Mode:</span>
            <Button3D />
          </div>

          <FormWrapper onSubmit={handleSubmit}>
            <TextInput
              id="first_name"
              label="First Name"
              value={formState.biodata.first_name}
              onChange={(e: any) =>
                handleBiodataChange("first_name", e.target.value)
              }
              required
            />

            <TextInput
              id="last_name"
              label="Last Name"
              value={formState.biodata.last_name}
              onChange={(e: any) =>
                handleBiodataChange("last_name", e.target.value)
              }
              required
            />

            <TextInput
              id="email"
              label="Email"
              type="email"
              value={formState.biodata.email}
              onChange={(e: any) =>
                handleBiodataChange("email", e.target.value)
              }
              required
            />

            <CustomPhoneInput
              id="phone"
              label="Phone"
              value={formState.biodata.phone}
              onChange={(value: any) =>
                handleBiodataChange("phone", value as string)
              }
              defaultCountry="ID"
            />

            <TextInput
              id="username"
              label="Username"
              value={formState.username}
              onChange={handleInputChange}
              required
            />

            <TextInput
              id="password"
              label="Password"
              type="password"
              value={formState.password}
              onChange={handleInputChange}
              required
            />

            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              required
            />

            <SelectInput
              id="role"
              label="Role"
              options={roleOptions}
              value={formState.role || roleOptions[0]}
              onChange={(selectedOption: any) =>
                setFormState((prev) => ({
                  ...prev,
                  role: selectedOption as RoleOption,
                }))
              }
              required
            />

            <ToggleSwitch
              label="Account Status"
              isChecked={formState.isActive}
              onChange={handleToggleChange}
            />

            <Button
              type="submit"
              loading={loading}
              loadingText="Registering..."
            >
              Register
            </Button>

            <LinkText
              text="Already have an account?"
              linkText="Login here"
              href="/login"
            />
          </FormWrapper>
        </div>
      </AnimatePresence>
    </AuthPageWrapper>
  );
}
