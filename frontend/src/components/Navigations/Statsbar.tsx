import { useNeumorph } from "@/contexts/NeumorphContext";
import React, { use } from "react";

import { Wallet, LineChart, FileText, Users, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Wallet,
    value: "678",
    label: "TOTAL ACCOUNTS",
  },
  {
    icon: LineChart,
    value: "68%",
    label: "CASH FLOW ACCURACY",
  },
  {
    icon: FileText,
    value: "43",
    label: "INVOICES PROCESSED",
  },
  {
    icon: Users,
    value: "22",
    label: "ACTIVE CLIENTS",
  },
  {
    icon: ShieldCheck,
    value: "22",
    label: "COMPLIANCE CHECKS",
  },
];

const Statsbar = () => {
  const { isNeumorphism } = useNeumorph();

  return (
    <section
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } bg-[var(--body)] rounded-lg flex gap-3 flex-wrap justify-between text-[12px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--text-accent)] px-6 py-4 mb-2`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 w-1/2 md:w-auto mb-3 md:mb-0 min-w-[120px]"
        >
          <stat.icon className="w-5 h-5 text-[var(--text-accent)]" />
          <div>
            <div className="text-2xl md:text-[14px] font-extrabold leading-none">
              {stat.value}
            </div>
            <div className="text-[8px] md:text-[6px] font-normal">
              {stat.label}
            </div>
          </div>
        </div>
      ))}

      <button
        className={`${
          isNeumorphism
            ? "neumorphic-convex neumorphic-box rounded-full p-2"
            : "hover:underline"
        } ml-auto text-[10px] md:text-[8px] font-bold uppercase tracking-widest whitespace-nowrap flex-shrink-0 w-full md:w-auto mt-3 md:mt-0`}
      >
        ALL STATS →
      </button>
    </section>
  );
};

export default Statsbar;
