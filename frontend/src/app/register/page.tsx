"use client";

import { useState } from "react";
import { useCreateUser } from "@/graphql/auth/hooks";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthPageWrapper from "@/components/AuthPageWrapper";
import Select from "react-select";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface RoleOption {
  value: string;
  label: string;
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RoleOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [isNeumorphism, setIsNeumorphism] = useState(true);
  const [registerUser, { loading, error }] = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await registerUser({
        variables: {
          username,
          password,
          email,
          role: role?.value,
          phone_number: phoneNumber,
          is_active: isActive,
        },
      });
      console.log("Registration successful:", data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Registration failed: ${err.message}`);
      } else {
        console.error("Registration failed: An unknown error occurred.");
      }
    }
  };

  const toggleNeumorphism = () => {
    setIsNeumorphism((prev) => !prev);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const roleOptions: RoleOption[] = [
    { value: "client", label: "Client" },
    { value: "admin", label: "Admin" },
    { value: "rm", label: "RM" },
    { value: "finance_controller", label: "Finance Controller" },
  ];

  const handleToggleChange = () => {
    setIsActive((prev) => !prev);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 4000);
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <AuthPageWrapper>
      <div suppressHydrationWarning>
        <motion.div
          className={`p-8 rounded-2xl ${
            isNeumorphism ? "neumorphism" : ""
          } transition-all duration-300`}
          style={{
            boxShadow: isNeumorphism
              ? "8px 8px 20px #d1d9e6, -8px -8px 20px #ffffff"
              : "none",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-center text-gray-800 mb-6"
          >
            Create Your Account
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Username */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`neumorphic-input ${
                  isNeumorphism ? "input-pressed" : ""
                }`}
                style={{ backgroundColor: "#f0f4ff" }}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`neumorphic-input ${
                  isNeumorphism ? "input-pressed" : ""
                }`}
                style={{ backgroundColor: "#f0f4ff" }}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`neumorphic-input ${
                  isNeumorphism ? "input-pressed" : ""
                }`}
                style={{ backgroundColor: "#f0f4ff" }}
              />
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`neumorphic-input ${
                  isNeumorphism ? "input-pressed" : ""
                }`}
                style={{ backgroundColor: "#f0f4ff" }}
              />
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-600"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <Select
                id="role"
                options={roleOptions}
                value={role}
                onChange={(selectedOption) =>
                  setRole(selectedOption as RoleOption)
                }
                placeholder="Select your role"
                className="neumorphic-input"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#f0f4ff",
                    borderColor: "#e2e8f0",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#ffffff",
                  }),
                }}
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                id="phone_number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                international
                defaultCountry="ID"
                className={`neumorphic-input ${
                  isNeumorphism ? "input-pressed" : ""
                }`}
                style={{ backgroundColor: "#f0f4ff" }}
              />
            </motion.div>

            {/* Active Status */}
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <label className="label">
                <div className="toggle-active">
                  <input
                    className="toggle-state"
                    type="checkbox"
                    checked={isActive}
                    onChange={handleToggleChange}
                    name="check"
                    value="check"
                  />
                  <motion.div
                    className="indicator-toggle-active"
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(49, 220, 54, 0.7)"
                        : "rgba(255, 255, 255, 0.826)",
                      transform: isActive
                        ? "translate3d(25%, 0, 0)"
                        : "translate3d(-75%, 0, 0)",
                      boxShadow: isActive
                        ? "0 0 10px 2px rgba(49, 220, 54)"
                        : "0 0 4px rgb(0, 0, 0, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>

                {showStatus && (
                  <motion.span
                    key={isActive ? "active" : "inactive"}
                    className="role-status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showStatus ? 1 : 0 }}
                    transition={{ duration: 1 }}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </motion.span>
                )}
              </label>
            </motion.div>

            {error && (
              <motion.p
                variants={itemVariants}
                className="text-red-500 text-sm"
              >
                {error.message}
              </motion.p>
            )}

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className={`neumorphic-btn w-full py-3 mt-4 rounded-md font-semibold focus:outline-none focus:ring-2 transition duration-200`}
              style={{ backgroundColor: "#f0f4ff" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </motion.form>

          <motion.p
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm mt-4 text-gray-600"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium relative overflow-hidden group"
            >
              <span>Login here</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </AuthPageWrapper>
  );
}
