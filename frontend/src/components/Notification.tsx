import React from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  // the theme color of CSS variables, default color fallback
  const getColor = () => {
    switch (type) {
      case "success":
        return "var(--accent, #4caf50)";
      case "error":
        return "#f44336";
      case "info":
      default:
        return "var(--text-accent, #2196f3)";
    }
  };

  return (
    <div
      className={`bg-card font-semibold text-center cursor-default select-none`}
    >
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="font-bold text-xl text-white z-50 cursor-pointer bg-transparent border-none"
          aria-label="Close notification"
        >
          X
        </button>
      )}
    </div>
  );
};

export default Notification;
