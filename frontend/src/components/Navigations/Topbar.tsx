import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaBell,
  FaChevronDown,
  FaEnvelope,
  FaFileAlt,
  FaCheckCircle,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/Buttons/ThemeSwitcher";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import TopbarSkeleton from "../Skeletons/TopbarSkeleton";

interface Notification {
  id: number;
  icon: React.ReactNode;
  title: string;
  time: string;
  read: boolean;
}

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { isNeumorphism } = useNeumorph();
  const { userBiodata, isMeLoading, logout } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setShowProfileMenu(false);
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [logout]);

  const handleNotificationClick = useCallback(() => {
    if (showProfileMenu) setShowProfileMenu(false);
    setShowNotifications(!showNotifications);
  }, [showProfileMenu, showNotifications]);

  const handleProfileClick = useCallback(() => {
    if (showNotifications) setShowNotifications(false);
    setShowProfileMenu(!showProfileMenu);
  }, [showNotifications, showProfileMenu]);

  const notifications: Notification[] = [
    {
      id: 1,
      icon: <FaEnvelope />,
      title: "New message from CFO regarding Q1 report and compliance update",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      icon: <FaFileAlt />,
      title: "Budget planning document uploaded",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      title: "Audit review has been approved",
      time: "Yesterday",
      read: false,
    },
  ];

  if (isMeLoading) {
    return <TopbarSkeleton />;
  }

  return (
    <div
      className={`hidden lg:flex bg-[var(--body)] ${
        isNeumorphism ? "neumorphic-convex" : "rounded-md"
      } items-center justify-between sticky top-0 left-0 z-40 h-[3rem] sm:h-[3.25rem] lg:h-[3.5rem] py-2 px-4 border-[var(--accent-dark)] mb-2`}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="flex items-center justify-between space-x-4 flex-1 min-w-0">
        <div className="text-[10px] text-[var(--text-accent)] truncate max-w-[50%]">
          Corporate Finance Hub • Cash Management • Trade Finance • Treasury •
          Compliance
        </div>
        <div className="relative transition-transform">
          <div className="relative transform duration-500 ease-in-out w-48 md:w-48 hover:w-62 hover:scale-105 focus-within:scale-105 focus-within:w-62 origin-right">
            <span className="absolute inset-y-0 left-3 flex items-center text-[var(--text-accent)] text-sm">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search modules..."
              className={`bg-[var(--card)] ${
                isNeumorphism ? "neumorphic-pressed" : ""
              } text-xs text-[var(--text)] placeholder-[var(--text-accent)] rounded-full pl-9 pr-3 py-1.5 w-full focus:outline-none`}
            />
          </div>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="flex items-center space-x-4 ml-4 relative"
      >
        <ThemeSwitcher setShowNotifications={setShowNotifications} />

        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={handleNotificationClick}
            className={`bg-[var(--accent)] rounded-full ${
              isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
            } p-2 text-yellow-500 text-sm hover:bg-[var(--accent-dark)] transition`}
          >
            <FaBell />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-3 w-80 max-h-80 bg-[var(--card)] rounded-lg shadow-lg overflow-y-auto z-50`}
              >
                <div
                  className={`p-3 ${
                    isNeumorphism ? "neumorphic-convex" : ""
                  } font-semibold text-[var(--text)] text-sm border-b`}
                >
                  Notifications
                </div>
                <ul className="divide-y divide-[var(--accent-dark)] divide-opacity-20">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`${
                        isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                      } flex gap-3 px-4 py-3 text-xs text-[var(--text)] ${
                        notif.read ? "opacity-70" : "opacity-100"
                      } hover:bg-[var(--accent-dark)]`}
                    >
                      <div className="text-lg text-[var(--text-accent)] mt-[2px]">
                        {notif.icon}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium break-words whitespace-normal">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-accent)]">
                          {notif.time}
                        </span>
                      </div>
                      <div className="ml-auto mt-[2px]">
                        {notif.read ? (
                          <span className="text-green-500 text-[10px]">
                            Read
                          </span>
                        ) : (
                          <span className="text-yellow-400 text-[10px]">
                            New
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`${
            isNeumorphism ? "neumorphic-convex rounded-full" : ""
          } flex items-center space-x-2 relative`}
          style={{ minWidth: "200px" }}
        >
          <button
            aria-label="User menu dropdown"
            className={`${
              isNeumorphism ? "neumorphic-box" : ""
            } text-[var(--text)] cursor-pointer flex gap-5 justify-center items-center text-xs focus:outline-none hover:bg-[var(--dark)] hover:rounded-full p-1.5 rounded-full transition `}
            onClick={handleProfileClick}
          >
            <img
              alt="User avatar"
              className={`${
                isNeumorphism ? "neumorphic-convex rounded-full" : ""
              } rounded-full w-9 h-9 object-cover`}
              src="https://storage.googleapis.com/a1aa/image/d14a373c-68da-46ba-cec6-7e6139be05c8.jpg"
            />
            <div className="text-[10px] font-bold text-[var(--text)] whitespace-nowrap leading-tight">
              {userBiodata?.biodata
                ? `${userBiodata.biodata.first_name?.toUpperCase() ?? ""} ${
                    userBiodata.biodata.last_name?.toUpperCase() ?? ""
                  }`
                : "USER"}
              <br />
              <span className="text-[var(--text-accent)] font-normal">
                {userBiodata?.biodata?.occupation || "No occupation"}
              </span>
            </div>
            <FaChevronDown />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-48 bg-[var(--card)] text-[var(--text)] text-sm rounded-lg overflow-y-auto shadow-md z-50"
                style={{
                  position: "absolute",
                  right: "0",
                  minWidth: "200px",
                  zIndex: 9999,
                  pointerEvents: showProfileMenu ? "auto" : "none",
                  transform: "translateY(5px)",
                }}
              >
                <button
                  className={`${
                    isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                  } w-full text-left px-4 py-2 hover:bg-[var(--accent-dark)] flex items-center gap-2`}
                >
                  <FaUser
                    className={`${
                      isNeumorphism ? "neumorphic-convex rounded-full" : ""
                    } text-[var(--text-accent)]`}
                  />{" "}
                  My Profile
                </button>
                <button
                  onClick={() =>
                    router.push(`/settings/${userBiodata?.user_id}`)
                  }
                  className={`${
                    isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                  } w-full text-left px-4 py-2 hover:bg-[var(--accent-dark)] flex items-center gap-2`}
                >
                  <FaCog
                    className={`${
                      isNeumorphism ? "neumorphic-convex rounded-full" : ""
                    } text-[var(--text-accent)]`}
                  />
                  Settings
                </button>
                <hr className="border-[var(--accent-dark)] border-opacity-30" />
                <button
                  className={`${
                    isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                  } w-full text-left px-4 py-2 hover:bg-[var(--accent-dark)] flex items-center gap-2 text-red-400`}
                  onClick={handleLogout}
                  disabled={isMeLoading}
                >
                  <FaSignOutAlt
                    className={`${
                      isNeumorphism ? "neumorphic-convex rounded-full" : ""
                    }`}
                  />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
