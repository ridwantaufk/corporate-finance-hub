"use client";

import Image from "next/image";
import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  FiMessageCircle,
  FiUserPlus,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowRight,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { PiCursorTextBold } from "react-icons/pi";
import { MdOutlineChat, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { PersonalChat } from "./PersonalChat";
import { useGetUserBiodatas } from "@/graphql/auth/hooks";

interface Biodata {
  biodata_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  gender: string;
  marital_status: string;
  nationality: string;
  occupation: string;
  age: number;
  created_at: string;
  updated_at: string;
}

interface UserBiodata {
  user_id: string;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  biodata: Biodata;
}

export default function ChatUserSidebar() {
  const { data: userBiodatas } = useGetUserBiodatas();
  const { isNeumorphism } = useNeumorph();
  const [width, setWidth] = useState(350);
  const [isResizingActive, setIsResizingActive] = useState(false);
  const [showSelect, setShowSelect] = useState(true);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  // console.log("biodatas : ", biodatas);

  useEffect(() => {
    console.log("userBiodatas : ", userBiodatas);
  }, [userBiodatas]);

  const [showSelectPersonalChat, setShowSelectPersonalChat] = useState<{
    status: boolean;
    data: any;
  } | null>(null);

  useEffect(() => {
    setShowSelect(width > 100);
  }, [width]);

  const handleMouseDown = (e: any) => {
    isResizing.current = true;
    setIsResizingActive(true);
    startX.current = e.clientX;
    startWidth.current = width;
    e.preventDefault();
  };

  const handleMouseMove = (e: any) => {
    if (!isResizing.current) return;

    const deltaX = e.clientX - startX.current;
    const newWidth = startWidth.current + deltaX;

    const maxAllowedWidth = window.innerWidth / 2;
    const clampedWidth = Math.min(Math.max(80, newWidth), maxAllowedWidth);

    setWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    setIsResizingActive(false);
  };

  const lastTap = useRef<number>(0);

  const handleTouchStart = (e: TouchEvent) => {
    const currentTime = Date.now();
    const tapGap = currentTime - lastTap.current;

    if (tapGap < 300 && tapGap > 0) {
      handleDoubleClick();
      e.preventDefault();
      return;
    }

    lastTap.current = currentTime;

    isResizing.current = true;
    setIsResizingActive(true);
    startX.current = e.touches[0].clientX;
    startWidth.current = width;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isResizing.current) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const newWidth = startWidth.current + deltaX;

    const maxAllowedWidth = window.innerWidth / 2;
    const clampedWidth = Math.min(Math.max(80, newWidth), maxAllowedWidth);

    setWidth(clampedWidth);
  };

  const handleTouchEnd = () => {
    isResizing.current = false;
    setIsResizingActive(false);
  };

  const handleDoubleClick = () => {
    // setWidth(defaultWidth.current);
  };

  useEffect(() => {
    // mouse
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // touch
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const handleChatPersonal = (status: boolean, data: any) => {
    setShowSelectPersonalChat({ status, data });
  };

  return (
    <div className="flex">
      <section
        className={`transition-all duration-200 ease-in-out ${
          showSelect ? "p-6" : "p-0"
        }`}
        style={{
          width: `${showSelect ? `${width / 15}vw` : 0}`,
          backgroundColor: isNeumorphism ? "var(--card-2)" : "var(--body)",
          borderLeft: "1px solid var(--accent-dark)",
          height: "100vh",
          overflowY: "auto",
          position: "sticky",
          top: 0,
        }}
      >
        {showSelect && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase text-[var(--text-accent)]">
                Chat Users
              </h3>
              <button className="text-[10px] font-bold text-[var(--accent-dark)] hover:underline">
                + Filter
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search user..."
                className={`${
                  isNeumorphism ? "neumorphic-pressed" : ""
                } w-full bg-[var(--card)] rounded-md py-2 pl-10 pr-12 text-xs text-[var(--text-accent)] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-accent)] text-xs" />
              <FiArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-accent)] text-xs cursor-pointer hover:scale-110 transition-transform" />
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5">
              <h4 className="text-[10px] font-semibold text-[var(--accent-dark)] uppercase">
                Internal
              </h4>
              <ul className="space-y-2">
                {!showSelectPersonalChat?.status &&
                !showSelectPersonalChat?.data ? (
                  (userBiodatas?.getUserBiodatas as UserBiodata[])
                    ?.filter((user) => user.role !== "client")
                    .map((user, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-2 rounded hover:bg-[var(--card)] transition cursor-pointer group"
                        onClick={() => handleChatPersonal(true, user)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <img
                              src={`https://api.dicebear.com/6.x/thumbs/svg?seed=User${i}`}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white"></span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[var(--text-accent)]">
                              {user.biodata.first_name} {user.biodata.last_name}
                            </p>
                            <p className="text-[10px] text-[var(--text-subtle)] truncate w-[10vw]">
                              Last message preview...
                            </p>
                          </div>
                        </div>
                        <div className="text-[10px] text-[var(--text-subtle)]">
                          <span className="group-hover:hidden">2m</span>
                          <span className="hidden group-hover:flex items-center text-[var(--accent)] space-x-1">
                            <FiStar />
                          </span>
                        </div>
                      </li>
                    ))
                ) : (
                  <PersonalChat data={showSelectPersonalChat?.data} />
                )}
              </ul>

              <h4 className="text-[10px] font-semibold text-[var(--accent-dark)] uppercase mt-4">
                External
              </h4>
              <ul className="space-y-2">
                <ul className="space-y-2">
                  {(userBiodatas?.getUserBiodatas as UserBiodata[])
                    ?.filter((user) => user.role === "client")
                    .map((user, i) => (
                      <li
                        key={`external-${i}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-[var(--card)] transition cursor-pointer group"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <img
                              src={`https://api.dicebear.com/6.x/thumbs/svg?seed=External${i}`}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-blue-500 border border-white"></span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[var(--text-accent)]">
                              {user.biodata.first_name} {user.biodata.last_name}
                            </p>
                            <p className="text-[10px] text-[var(--text-subtle)] truncate w-[10vw]">
                              External message...
                            </p>
                          </div>
                        </div>
                        <div className="text-[10px] text-[var(--text-subtle)]">
                          <span className="group-hover:hidden">5m</span>
                          <span className="hidden group-hover:flex items-center text-[var(--accent)] space-x-1">
                            <FiStar />
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex space-x-2 flex-shrink-0">
              <button
                className={`${
                  isNeumorphism ? "neumorphic-convex neumorphic-box" : "border"
                } flex-1 py-2 text-[10px] rounded-md text-[var(--text-accent)] hover:bg-[var(--accent-dark)] hover:text-white font-bold uppercase`}
              >
                <FiUserPlus className="inline-block mr-2 w-4 h-4" />
                Add
              </button>
              <button
                className={`${
                  isNeumorphism ? "neumorphic-pressed neumorphic-box" : ""
                } flex-1 py-2 text-[10px] rounded-md text-[var(--text-accent)] hover:text-[var(--accent-dark)] font-bold uppercase`}
              >
                Invite
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => handleTouchStart(e as any)}
        onDoubleClick={handleDoubleClick}
        className={`w-0.5 bg-[var(--body)] hover:w-1 cursor-col-resize transition-all duration-200 mr-1 flex items-center justify-center ${
          isResizingActive ? "bg-[var(--accent)]" : "bg-[var(--accent-dark)]"
        } hover:bg-[var(--accent)] active:bg-[var(--text-accent)] hover:shadow-md`}
        style={{
          top: 0,
          right: 0,
          height: "100vh",
          zIndex: 1,
          position: "relative",
        }}
      >
        <PiCursorTextBold
          className={`absolute text-3xl ${
            isResizingActive
              ? "text-[var(--accent)]"
              : "text-[var(--accent-dark)]"
          } hover:text-[var(--accent)] active:text-[var(--text-accent)]`}
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
}
