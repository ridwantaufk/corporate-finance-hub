"use client";

import { useState } from "react";
import { useLoginUser } from "@/graphql/auth/hooks";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthPageWrapper from "@/components/AuthPageWrapper";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNeumorphism, setIsNeumorphism] = useState(true);
  const [loginUser, { loading, error }] = useLoginUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { username, password },
      });

      if (data?.login) {
        console.log("Login sukses!");
      }
    } catch (err) {
      console.error("Login gagal:", err);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AuthPageWrapper>
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
          Login to Your Account
        </motion.h2>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Mode:</span>
          <div className="container">
            <label className="switch">
              <input
                className="togglesw"
                type="checkbox"
                checked={isNeumorphism}
                onChange={toggleNeumorphism}
              />
              <div className="indicator left">
                <span className="text-3d">3D</span>
              </div>
              <div className="indicator right">
                <span className="text-2d">2D</span>
              </div>
              <div className="button"></div>
            </label>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
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

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
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

          {error && (
            <motion.p variants={itemVariants} className="text-red-500 text-sm">
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
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>

        <motion.p
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium relative overflow-hidden group"
          >
            <span>Register here</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.p>
      </motion.div>
    </AuthPageWrapper>
  );
}
