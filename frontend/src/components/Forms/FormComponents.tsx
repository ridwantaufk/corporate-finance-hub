"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useNeumorph } from "@/contexts/NeumorphContext";
import "react-phone-number-input/style.css";

const Select = dynamic(() => import("react-select"), { ssr: false });
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

export const animations = {
  formVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  },
};

// Text Input Component
interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const TextInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: TextInputProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.div variants={animations.itemVariants}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        required={required}
        className={`neumorphic-input ${
          isNeumorphism
            ? "input-pressed neumorphic-pressed"
            : "border border-[var(--accent-dark)]"
        } text-[var(--text-accent)]`}
      />
    </motion.div>
  );
};

// Phone Input Component
interface PhoneInputProps {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  required?: boolean;
  defaultCountry?: string;
}

export const CustomPhoneInput = ({
  id,
  label,
  value,
  onChange,
  required = false,
  defaultCountry = "ID",
}: PhoneInputProps) => {
  const { isNeumorphism } = useNeumorph();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div variants={animations.itemVariants}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <PhoneInput
        id="phone"
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        international
        defaultCountry={defaultCountry as any}
        className={`neumorphic-input ${
          isNeumorphism
            ? "input-pressed neumorphic-pressed"
            : "border border-[var(--accent-dark)]"
        }`}
      />
    </motion.div>
  );
};

// Select Input Component
interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  required?: boolean;
}

export const SelectInput = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
}: SelectInputProps) => {
  const { isNeumorphism } = useNeumorph();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div variants={animations.itemVariants}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Select
        instanceId={`${id}-select`}
        options={options}
        value={value}
        onChange={(selectedOption: any) => onChange(selectedOption)}
        className={`${
          isNeumorphism
            ? "input-pressed neumorphic-pressed"
            : "border border-[var(--accent-dark)]"
        } neumorphic-input`}
        styles={{
          control: (provided: any) => ({
            ...provided,
            backgroundColor: "var(--neu-bg)",
            color: "var(--text)",
            borderColor: "var(--text-accent)",
            border: "none",
          }),
          menu: (provided: any) => ({
            ...provided,
            background: "var(--neu-bg)",
            color: "var(--text-accent)",
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: "var(--text)",
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: "var(--text)",
            opacity: 0.5,
          }),
        }}
      />
    </motion.div>
  );
};

// Toggle Switch Component
interface ToggleSwitchProps {
  label?: string;
  isChecked: boolean;
  onChange: () => void;
}

export const ToggleSwitch = ({
  label,
  isChecked,
  onChange,
}: ToggleSwitchProps) => {
  const { isNeumorphism } = useNeumorph();
  const [showStatus, setShowStatus] = useState(false);

  const handleToggle = () => {
    onChange();
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 4000);
  };

  return (
    <motion.div
      variants={animations.itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <label className="label">
        {label && (
          <span className="block text-sm font-medium text-[var(--text-accent)] mb-2">
            {label}
          </span>
        )}
        <div
          className={`${
            isNeumorphism
              ? "neumorphic-pressed"
              : "border border-[var(--accent-dark)]"
          } toggle-active`}
        >
          <input
            className="toggle-state"
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            name="check"
            value="check"
          />
          <motion.div
            className="indicator-toggle-active"
            animate={{
              backgroundColor: isChecked
                ? "rgba(49, 220, 54, 0.7)"
                : "rgba(255, 255, 255, 0.5)",
              transform: isChecked
                ? "translate3d(25%, 0, 0)"
                : "translate3d(-75%, 0, 0)",
              boxShadow: isChecked
                ? "0 0 10px 2px rgba(49, 220, 54)"
                : "5px 0 8px 3px rgb(0, 0, 0, 1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {showStatus && (
          <motion.span
            key={isChecked ? "active" : "inactive"}
            className={`${
              isChecked ? "role-status-active" : "role-status-inactive"
            } role-status`}
            initial={{ opacity: 0 }}
            animate={{ opacity: showStatus ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            {isChecked ? "Active" : "Inactive"}
          </motion.span>
        )}
      </label>
    </motion.div>
  );
};

// Button Component
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
  className?: string;
}

export const Button = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  children,
  className = "",
}: ButtonProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.button
      variants={animations.itemVariants}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${
        isNeumorphism
          ? "neumorphic-convex text-[var(--text-accent)] input-pressed"
          : "border border-[var(--accent-dark)]"
      } text-[var(--text-accent)] w-full py-3 mt-4 rounded-md font-semibold focus:outline-none focus:ring-2 transition duration-200 cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? loadingText : children}
    </motion.button>
  );
};

// Form Wrapper Component
interface FormWrapperProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const FormWrapper = ({
  children,
  onSubmit,
  className = "",
}: FormWrapperProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className={`space-y-5 ${className}`}
      variants={animations.formVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.form>
  );
};

interface StatusMessageProps {
  success: boolean;
  message: string;
}

export const StatusMessage = ({ success, message }: StatusMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={` rounded-md ${success ? " text-green-800" : " text-red-800"}`}
    >
      {message}
    </motion.div>
  );
};

// Link Text Component
interface LinkTextProps {
  text: string;
  linkText: string;
  href: string;
}

export const LinkText = ({ text, linkText, href }: LinkTextProps) => {
  return (
    <motion.p
      variants={animations.itemVariants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center text-sm text-[var(--text-accent)] mt-4"
    >
      {text}{" "}
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-700 font-medium relative overflow-hidden group"
      >
        <span>{linkText}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </motion.p>
  );
};

// TextArea Component
interface TextAreaProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

export const TextArea = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
}: TextAreaProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.div variants={animations.itemVariants}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`neumorphic-input ${
          isNeumorphism
            ? "input-pressed neumorphic-pressed"
            : "border border-[var(--accent-dark)]"
        } text-[var(--text-accent)] w-full`}
      />
    </motion.div>
  );
};

// Checkbox Component
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.div
      variants={animations.itemVariants}
      className="flex items-center"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`mr-2 ${
          isNeumorphism
            ? "neumorphic-checkbox"
            : "border border-[var(--accent-dark)]"
        }`}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
      </label>
    </motion.div>
  );
};

// Radio Button Group
interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  required = false,
}: RadioGroupProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.div variants={animations.itemVariants}>
      <label className="block text-sm font-medium text-[var(--text-accent)]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={`mr-2 ${
                isNeumorphism
                  ? "neumorphic-radio"
                  : "border border-[var(--accent-dark)]"
              }`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm text-[var(--text-accent)]"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// File Input Component
interface FileInputProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
}

export const FileInput = ({
  id,
  label,
  onChange,
  accept,
  required = false,
  multiple = false,
}: FileInputProps) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <motion.div variants={animations.itemVariants}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-accent)]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        type="file"
        onChange={onChange}
        accept={accept}
        required={required}
        multiple={multiple}
        className={`neumorphic-input ${
          isNeumorphism
            ? "input-pressed neumorphic-pressed"
            : "border border-[var(--accent-dark)]"
        } text-[var(--text-accent)] w-full p-2`}
      />
    </motion.div>
  );
};

// Page Title Component
interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold text-center text-[var(--text-accent)] mb-2"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-[var(--text-accent-light)] mb-6"
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );
};
