"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  FaSun,
  FaRegMoon,
  FaLeaf,
  FaSnowflake,
  FaWater,
  FaPalette,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button3D from "./Button3D";

type ThemeSwitcherProps = {
  setShowNotifications: (value: boolean) => void;
};

const themes = [
  { name: "dark-purple", icon: <FaRegMoon /> },
  { name: "light-gold", icon: <FaSun /> },
  { name: "blue-modern", icon: <FaWater /> },
  { name: "forest-green", icon: <FaLeaf /> },
  { name: "frosted-glass", icon: <FaSnowflake /> },
];

const ThemeSwitcher = ({ setShowNotifications }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const { isNeumorphism } = useNeumorph();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowNotifications(false);
    setOpen((prev) => !prev);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(
      newTheme as
        | "dark-purple"
        | "light-gold"
        | "blue-modern"
        | "forest-green"
        | "frosted-glass"
    );
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`p-2 rounded-full bg-[var(--accent-dark)] ${
          isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
        } text-[var(--text-accent)] hover:scale-105 transition`}
        aria-label="Change Theme"
      >
        <FaPalette />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-40 p-3 rounded-xl bg-[var(--card)] backdrop-blur-md shadow-lg z-50 flex flex-col items-center space-y-3"
          >
            {/* theme options group */}
            <div className="grid grid-cols-3 gap-2 w-full">
              {themes.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleThemeChange(item.name)}
                  className={`p-2 rounded-full w-6 h-6 flex items-center justify-center transition ${
                    theme === item.name
                      ? "bg-[var(--accent-dark)] neumorphic-pressed"
                      : "hover:bg-[var(--accent)] hover:bg-opacity-20"
                  } ${isNeumorphism ? "neumorphic-convex neumorphic-box" : ""}`}
                  title={item.name}
                >
                  <span className="text-[var(--text-accent)]">{item.icon}</span>
                </button>
              ))}
            </div>

            {/* Button3D Section */}
            <div className="w-full">
              <Button3D />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
