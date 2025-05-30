"use client";

import React, { useState } from "react";
import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  FaUserTie,
  FaComments,
  FaCogs,
  FaFileContract,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { PiCurrencyDollar } from "react-icons/pi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { usePathname, useRouter } from "next/navigation";
import ProjectButton from "@/components/Buttons/ProjectButton";
import { useAuthContext } from "@/contexts/AuthContext";
import { TriangleAlertIcon } from "lucide-react";

export const Sidebar = () => {
  const { isNeumorphism } = useNeumorph();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const enableNeumorphism = isHovered && isNeumorphism;
  const { userBiodata, isMeLoading, logout } = useAuthContext();

  const role = userBiodata?.role;
  const user_id = userBiodata?.user_id;

  const menuItems: {
    label: string;
    path: string;
    icon: React.ReactNode;
    roles: string[];
    badge?: string;
  }[] = [
    {
      label: "DASHBOARD",
      path: "/dashboard",
      icon: <AiOutlineHome className="text-xl" />,
      roles: ["client", "rm", "admin", "finance_controller"],
    },
    {
      label: "CHAT",
      path: "/chat",
      icon: <FaComments className="text-xl" />,
      roles: ["client", "rm", "admin", "finance_controller"],
      badge: "3",
    },
    {
      label: "VIRTUAL ACCOUNTS",
      path: "/virtual-accounts",
      icon: <PiCurrencyDollar className="text-xl" />,
      roles: ["client", "admin"],
    },
    {
      label: "CASH POSITIONS",
      path: "/cash-positions",
      icon: <PiCurrencyDollar className="text-xl" />,
      roles: ["finance_controller"],
    },
    {
      label: "PAYMENTS",
      path: "/payments",
      icon: <LiaFileInvoiceDollarSolid className="text-xl" />,
      roles: ["client", "rm"],
    },
    {
      label: "INVOICES",
      path: "/invoices",
      icon: <LiaFileInvoiceDollarSolid className="text-xl" />,
      roles: ["client", "admin"],
    },
    {
      label: "TRADE FINANCE",
      path: "/trade-finance",
      icon: <FaFileContract className="text-xl" />,
      roles: ["client", "rm"],
    },
    {
      label: "FX TRANSACTIONS",
      path: "/fx-transactions",
      icon: <PiCurrencyDollar className="text-xl" />,
      roles: ["client", "admin"],
    },
    {
      label: "TAX COMPLIANCE",
      path: "/tax-compliance",
      icon: <FaFileContract className="text-xl" />,
      roles: ["finance_controller"],
    },
    {
      label: "RISK MONITORING",
      path: "/risk-monitoring",
      icon: <FaShieldAlt className="text-xl" />,
      roles: ["finance_controller"],
    },
    {
      label: "CLIENTS",
      path: "/clients",
      icon: <FaUserTie className="text-xl" />,
      roles: ["admin", "rm"],
    },
    {
      label: "SETTINGS",
      path: `/settings/${user_id}`,
      icon: <FaCogs className="text-xl" />,
      roles: ["client", "admin", "rm", "finance_controller"],
    },
  ];

  return (
    <aside
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } bg-[var(--body)] w-16 sm:w-20 md:w-24 lg:w-28 2xl:w-32 sticky top-0 h-screen z-30 overflow-y-auto overflow-x-hidden flex flex-col max-w-full text-[9px] md:text-xs`}
    >
      <div className="flex flex-col items-center py-4 space-y-4">
        <img
          alt="Corporate Finance Hub logo placeholder"
          className="rounded w-10 h-10 object-cover"
          src="https://storage.googleapis.com/a1aa/image/6820fb8d-818a-4458-afe9-5883d0730133.jpg"
        />
        <div className="text-[var(--text-accent)] font-semibold tracking-widest uppercase text-center">
          236 QUEUING
        </div>
        <div className="text-[var(--text-accent)] font-bold text-sm tracking-widest">
          0:45
        </div>
      </div>

      <nav className="flex flex-col space-y-4 mt-6 items-center text-[var(--text-accent)] text-[6px] sm:text-[8px] md:text-[9px] lg:text-xs px-1 md:px-2 font-semibold tracking-widest">
        {menuItems
          .filter((item) => role && item.roles.includes(role))
          .map(({ label, path, icon, badge }) => {
            const isActive = pathname.startsWith(path);
            return (
              <SidebarButton
                key={label}
                icon={icon}
                label={label}
                active={isActive}
                badge={badge}
                onClick={() => router.push(path)}
              />
            );
          })}
      </nav>

      <div
        className="fixed left-10 bottom-1/12 z-50 rounded-full hover:left-0 hover:bottom-0 transition-[left] duration-1000 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="socialButtons-wrapper group flex hover:p-10 flex-col gap-4 transition-[width] duration-1000 ease-in-out rounded-full">
          <ProjectButton enableNeumorphism={enableNeumorphism} />
        </div>
      </div>
    </aside>
  );
};

const SidebarButton = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}) => {
  const { isNeumorphism } = useNeumorph();

  const baseClasses =
    "flex flex-col items-center space-y-1 transition-colors px-3 py-1.5 md:py-2 w-full justify-center max-w-full cursor-pointer";
  const activeClass = active
    ? isNeumorphism
      ? "bg-[var(--accent-dark)] text-[var(--text)] hover:text-[var(--accent-dark)] rounded-2xl neumorphic-pressed neumorphic-box"
      : "bg-[var(--accent-dark)] text-[var(--text)] rounded-md"
    : "hover:text-[var(--accent-dark)]";

  return (
    <button
      aria-label={label}
      className={`${baseClasses} ${activeClass} ${
        isNeumorphism ? "rounded-xl neumorphic-box" : ""
      } relative`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <div className="absolute -top-1 -right-1 bg-[var(--accent-dark)] text-black font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
    </button>
  );
};
