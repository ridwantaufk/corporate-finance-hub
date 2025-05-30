import AboutPanel from "./AboutPanel";
import MiniCalendar from "./MiniCalendar";
import ActivityFeed from "./ActivityFeed";
import { useNeumorph } from "@/contexts/NeumorphContext";

export default function HomeSection() {
  // const isNeumorphism = useNeumorph().isNeumorphism;
  const { isNeumorphism } = useNeumorph();

  return (
    <section
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 bg-[var(--card)] rounded-lg p-6 text-[10px] place-items-center`}
    >
      <div className="w-full">
        <AboutPanel />
      </div>
      <div className="w-full">
        <MiniCalendar />
      </div>
      <div className="w-full">
        <ActivityFeed />
      </div>
    </section>
  );
}
