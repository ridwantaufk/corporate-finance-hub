import { useNeumorph } from "@/contexts/NeumorphContext";

export default function AboutPanel() {
  const { isNeumorphism } = useNeumorph();

  return (
    <div
      className={`${
        isNeumorphism ? "neumorphic-flat p-3 rounded-xl" : ""
      } space-y-3 overflow-hidden`}
    >
      <h4 className="font-bold uppercase text-[var(--text-accent)]">ABOUT</h4>
      <p className="text-[var(--text)] ">
        Corporate Finance Hub is your centralized platform for managing all
        corporate finance activities including cash management, trade finance,
        treasury, compliance, and analytics. Collaborate with your team and
        clients seamlessly.
      </p>
      <button
        className={`${
          isNeumorphism ? "neumorphic-convex neumorphic-box" : "border"
        } border-[var(--text-accent)] rounded px-2 py-1 text-[var(--text-accent)] font-semibold whitespace-nowrap`}
      >
        + Add description
      </button>
      <ul className="space-y-2 mt-4 text-[var(--text)]">
        <li className="flex items-center space-x-2 truncate">
          <i className="fas fa-map-marker-alt text-[var(--text)] flex-shrink-0" />
          <span className="truncate">Headquarters: Bandung, IDN</span>
        </li>
        <li className="flex items-center space-x-2 truncate">
          <i className="fas fa-clock text-[var(--text)] flex-shrink-0" />
          <span className="truncate">Operating since 2025</span>
        </li>
        <li className="flex items-center space-x-2 truncate">
          <i className="fas fa-phone-alt text-[var(--text)] flex-shrink-0" />
          <span className="truncate">Contact: +62 813 120 252 17</span>
        </li>
        <li className="flex items-center space-x-2 truncate">
          <i className="fas fa-envelope text-[var(--text)] flex-shrink-0" />
          <span className="truncate">support@corporatefinancehub.com</span>
        </li>
      </ul>
    </div>
  );
}
