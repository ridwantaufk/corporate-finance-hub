import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  CalendarCheck2,
  AlarmClock,
  Briefcase,
  PartyPopper,
  Coffee,
  FileBarChart,
  Plane,
  ShieldCheck,
  MessageCircle,
  Handshake,
  SmilePlus,
} from "lucide-react";

const events = [
  {
    icon: CalendarCheck2,
    color: "text-green-500",
    label: "18 April - Meeting Internal",
  },
  {
    icon: AlarmClock,
    color: "text-yellow-500",
    label: "19 April - Deadline Report",
  },
  {
    icon: Briefcase,
    color: "text-blue-500",
    label: "25 April - Client Presentation",
  },
  {
    icon: PartyPopper,
    color: "text-pink-500",
    label: "30 April - Company Gathering",
  },
  {
    icon: Coffee,
    color: "text-amber-500",
    label: "1 May - Morning Coffee with Team",
  },
  {
    icon: FileBarChart,
    color: "text-purple-500",
    label: "2 May - Monthly KPI Review",
  },
  {
    icon: Plane,
    color: "text-sky-500",
    label: "3 May - Business Trip to Jakarta",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600",
    label: "5 May - Security Audit",
  },
  {
    icon: MessageCircle,
    color: "text-cyan-500",
    label: "7 May - Team Feedback Session",
  },
  {
    icon: Handshake,
    color: "text-orange-500",
    label: "9 May - Partnership Agreement",
  },
  {
    icon: SmilePlus,
    color: "text-lime-500",
    label: "10 May - Team Wellness Activity",
  },
];

export default function MiniCalendar() {
  const { isNeumorphism } = useNeumorph();

  return (
    <div
      className={`${
        isNeumorphism ? "neumorphic-flat" : ""
      } bg-[var(--card)] rounded-lg p-4 text-center text-[12px] text-[var(--accent-dark)] overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          aria-label="Previous month"
          className="text-[var(--text)] font-bold"
        >
          &lt;
        </button>
        <div className="font-bold text-[var(--text)] truncate">April</div>
        <button
          aria-label="Next month"
          className="text-[var(--text)] font-bold"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-[var(--accent-dark)] mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-[var(--text)]">
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const isHighlighted = [18, 19].includes(day);
          return (
            <div
              key={day}
              className={`${
                isHighlighted
                  ? isNeumorphism
                    ? "text-[var(--accent-dark)] font-bold bg-[var(--text-accent)] rounded-full neumorphic-convex neumorphic-box"
                    : "text-[var(--accent-dark)] font-bold bg-[var(--text-accent)] rounded-full"
                  : "text-[var(--text)]"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-1 border"></div>
      <div className="mt-2 pt-1 text-left max-h-12 overflow-auto space-y-1 text-[10px] text-[var(--text)]">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-2">
            <event.icon className={`w-4 h-4 flex-shrink-0 ${event.color}`} />
            <span>{event.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
