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
} from "react-icons/fi";
import { PiCursorTextBold } from "react-icons/pi";
import { MdOutlineChat, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
// import { useGetBiodatas } from "@/graphql/auth/hooks";

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
  __typename: string;
}

interface User {
  name: string;
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
  biodata_id: string;
  role: string;
  status: string;
  department: string;
  img: string;
  actions: string[];
  created_at: string;
  updated_at: string;
  date_of_birth: string;
}

export default function ChatUserSidebar() {
  // const { data, loading, error } = useGetBiodatas();
  // const biodatas = data?.getBiodatas || [];

  const { isNeumorphism } = useNeumorph();
  const [width, setWidth] = useState(350);
  const [isResizingActive, setIsResizingActive] = useState(false);
  const [showSelect, setShowSelect] = useState(true);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  // console.log("biodatas : ", biodatas);
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const users = biodatas.map((biodata: Biodata) => ({
  //   name: `${biodata.first_name} ${biodata.last_name}`,
  //   email: biodata.email,
  //   phone: biodata.phone,
  //   address: biodata.address,
  //   city: biodata.city,
  //   state: biodata.state,
  //   country: biodata.country,
  //   postal_code: biodata.postal_code,
  //   gender: biodata.gender,
  //   marital_status: biodata.marital_status,
  //   nationality: biodata.nationality,
  //   occupation: biodata.occupation,
  //   age: biodata.age,
  //   biodata_id: biodata.biodata_id,
  //   role: biodata.occupation || "Unknown",
  //   status: "Online",
  //   department: "General",
  //   img: "https://via.placeholder.com/150",
  //   actions: ["chat", "view", "edit", "delete"],
  //   created_at: new Date(Number(biodata.created_at)).toLocaleDateString(),
  //   updated_at: new Date(Number(biodata.updated_at)).toLocaleDateString(),
  //   date_of_birth: new Date(Number(biodata.date_of_birth)).toLocaleDateString(),
  // }));

  return (
    <div className="flex">
      <section
        className=""
        style={{
          width: `${showSelect ? `${width / 15}vw` : 0}`,
          backgroundColor: `${isNeumorphism ? "var(--card-2)" : "var(--body)"}`,
          borderLeft: "1px solid var(--accent-dark)",
          padding: `${showSelect ? "1.5rem 1.25rem" : 0}`,
          // marginRight: "2px",
          overflowY: "auto",
          position: "sticky",
          top: 0,
          height: "100vh",
          // zIndex: 20,
          transition: "width 0.1s ease",
        }}
      >
        {showSelect && (
          <>
            <h3 className="text-xs font-bold uppercase text-[var(--text-accent)] mb-3 flex-shrink-0">
              CHAT USERS
            </h3>
            <div className="relative mb-6 flex-shrink-0">
              <input
                type="text"
                placeholder="Search for a user"
                className={`${
                  isNeumorphism ? "neumorphic-pressed" : ""
                } w-full bg-[var(--card)] rounded-md py-2 pl-10 pr-12 text-xs text-[var(--text-accent)] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              />
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-accent)] text-xs"
                aria-hidden="true"
              />
              <FiArrowRight
                className="absolute cursor-pointer hover:text-lg transition-all duration-300 ease-in-out right-3 top-1/2 -translate-y-1/2 text-[var(--text-accent)] text-xs"
                aria-hidden="true"
              />
            </div>
            <ul className="space-y-3 flex-1 overflow-y-auto max-h-60 mb-8 scrollbar-thin">
              {/* {users.map((user: User, i: number) => (
                <li
                  key={user.biodata_id}
                  className={`${
                    isNeumorphism ? "neumorphic-flat mr-3" : ""
                  } flex items-center justify-between text-xs text-[var(--accent)] cursor-pointer rounded-md p-2 hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all duration-200 ${
                    user.status === "Online"
                      ? "bg-green-100 bg-opacity-50"
                      : user.status === "Offline"
                      ? "bg-gray-100 bg-opacity-40"
                      : "bg-yellow-100 bg-opacity-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={user.img}
                      alt={`Avatar of user ${user.name}`}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-[var(--text)] font-semibold">
                          {user.name}
                        </span>
                        {user.role && (
                          <span className="bg-[var(--card)] text-[var(--text)] text-[9px] font-bold rounded px-1.5 py-0.5">
                            {user.role}
                          </span>
                        )}
                      </div>
                      {user.status && (
                        <div className="text-[8px] uppercase tracking-widest text-[var(--text-accent)]">
                          {user.status}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    aria-label={`Chat with ${user.name}`}
                    className="ml-3 text-[var(--text-accent)] hover:text-[var(--text-accent)]"
                  >
                    <MdOutlineMarkUnreadChatAlt className="w-4 h-4" />
                  </button>
                </li>
              ))} */}
            </ul>

            <ul className="space-y-3 flex-1 overflow-y-auto scrollbar-thin">
              {/* {users.map((user: User, i: number) => (
                <li
                  key={i}
                  className={`flex items-center space-x-3 text-xs text-[var(--accent)] cursor-pointer rounded-md p-2 hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all duration-200 ${
                    user.status === "Online"
                      ? "bg-green-100 bg-opacity-50"
                      : user.status === "Offline"
                      ? "bg-gray-100 bg-opacity-40"
                      : "bg-yellow-100 bg-opacity-50"
                  }`}
                >
                  <Image
                    src={user.img}
                    alt={`Avatar of user ${user.name}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-[var(--text)] font-semibold">
                        {user.name}
                      </span>
                      {user.role && (
                        <span className="bg-[var(--card)] text-[var(--text)] text-[9px] font-bold rounded px-1.5 py-0.5">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-[8px] uppercase tracking-widest ${
                        user.status === "Online"
                          ? "text-green-500"
                          : user.status === "Offline"
                          ? "text-gray-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {user.status}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {user.actions.includes("chat") && (
                      <button
                        aria-label={`Chat with ${user.name}`}
                        className="text-[var(--text-accent)] hover:text-[var(--text-accent)] transition-transform hover:scale-110"
                      >
                        <MdOutlineChat className="text-xl" />
                      </button>
                    )}
                    {user.actions.includes("approve") && (
                      <button
                        aria-label={`Approve ${user.name}`}
                        className="text-green-500 hover:text-green-600 transition-transform hover:scale-110"
                      >
                        <FiCheckCircle className="text-xl" />
                      </button>
                    )}
                    {user.actions.includes("pending") && (
                      <button
                        aria-label={`Mark ${user.name} as Pending`}
                        className="text-yellow-500 hover:text-yellow-600 transition-transform hover:scale-110"
                      >
                        <FiClock className="text-xl" />
                      </button>
                    )}
                    {user.actions.includes("remove") && (
                      <button
                        aria-label={`Remove ${user.name}`}
                        className="text-red-500 hover:text-red-600 transition-transform hover:scale-110"
                      >
                        <FiXCircle className="text-xl" />
                      </button>
                    )}
                  </div>
                </li>
              ))} */}
            </ul>
            <div className="flex space-x-2 mt-4 flex-shrink-0">
              <button
                className={`${
                  isNeumorphism ? "neumorphic-convex neumorphic-box" : "border"
                } flex flex-1 justify-center items-center border-[var(--text-accent)] rounded-md py-2 text-[10px] text-[var(--text-accent)] uppercase font-semibold tracking-widest hover:border-[var(--accent-dark)] hover:text-[var(--accent-dark)] hover:bg-[var(--accent-dark)] hover:bg-opacity-5 transition-all duration-300`}
              >
                <FiUserPlus className="mr-2 w-4 h-4" />
                Add User
              </button>
              <button
                className={`${
                  isNeumorphism
                    ? "neumorphic-pressed opacity-50 rounded-md neumorphic-box"
                    : ""
                } flex flex-1 justify-center items-center text-[var(--text-accent)] font-semibold text-[10px] uppercase tracking-widest hover:text-[var(--accent-dark)] transition-all duration-300`}
              >
                Invite
              </button>
            </div>
          </>
        )}
      </section>
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          handleTouchStart(e as any);
        }}
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
          className={`absolute hover:text-[var(--accent)] active:text-[var(--text-accent)] text-3xl text-[var(--accent)] ${
            isResizingActive
              ? "text-[var(--accent)]"
              : "text-[var(--accent-dark)]"
          }`}
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
}
