import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  Wallet2,
  Briefcase,
  LineChart,
  ShieldCheck,
  PieChart,
} from "lucide-react";

export default function Platforms() {
  const { isNeumorphism } = useNeumorph();

  const platforms = [
    { title: "Cash Management", icon: Wallet2 },
    { title: "Trade Finance", icon: Briefcase },
    { title: "Treasury & FX", icon: LineChart },
    { title: "Compliance", icon: ShieldCheck },
    { title: "Analytics", icon: PieChart },
  ];

  return (
    <section
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } bg-[var(--card-2)] rounded-lg p-4 mb-4 flex flex-wrap gap-4 text-[10px] text-[var(--text)] scrollbar-thin`}
    >
      {platforms.map(({ title, icon: Icon }) => (
        <div
          key={title}
          className={`${
            isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          } flex items-center flex-wrap space-x-2 bg-[var(--card)] rounded px-3 py-1 cursor-pointer`}
          title={title}
        >
          <Icon
            className={`${
              isNeumorphism ? "neumorphic-convex rounded-xs" : ""
            } w-4 h-4 text-[var(--accent-dark)] flex-shrink-0`}
          />
          <span>{title}</span>
        </div>
      ))}
    </section>
  );
}
