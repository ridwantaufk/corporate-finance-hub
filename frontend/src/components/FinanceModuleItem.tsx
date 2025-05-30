interface FinanceModuleItemProps {
  title: string;
  status: string;
  description: string;
  imageUrl: string;
  users: number;
  winRatio: string;
  eloRating: string;
  isNeumorphism: boolean;
}

export const FinanceModuleItem = ({
  title,
  status,
  description,
  imageUrl,
  users,
  winRatio,
  eloRating,
  isNeumorphism,
}: FinanceModuleItemProps) => (
  <li
    className={`${
      isNeumorphism ? "neumorphic-convex" : ""
    } flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between bg-[var(--card)] rounded-lg p-4 w-full overflow-hidden`}
  >
    <div className="flex items-center space-x-4 mb-3 md:mb-0 md:flex-1 min-w-0">
      <img
        alt={`${title} icon`}
        className="w-16 h-8 object-contain flex-shrink-0"
        height="32"
        src={imageUrl}
        width="64"
      />
      <div className="min-w-0 break-words">
        <div className="text-[var(--text)] font-bold text-sm truncate">
          {title}
        </div>
        <div className="text-[var(--accent-dark)] text-[9px] font-bold uppercase whitespace-nowrap">
          {status}
        </div>
        <div className="text-[var(--text-accent)] text-[8px] truncate">
          {description}
        </div>
      </div>
    </div>
    <div
      className="flex items-center space-x-1 text-[var(--accent-dark)] text-[10px] font-bold mb-3 md:mb-0 md:flex-1 min-w-[120px]"
      title="Users involved"
    >
      {Array.from({ length: Math.min(users, 3) }).map((_, idx) => (
        <i key={idx} className="fas fa-user-circle flex-shrink-0">
          {" "}
        </i>
      ))}
      <span> {users}+ </span>
    </div>
    <div className="flex flex-col text-[8px] text-[var(--text-accent)] font-bold space-y-1 md:space-y-0 md:flex-row md:space-x-6 md:items-center md:justify-center md:flex-1 min-w-[140px]">
      <div className="whitespace-nowrap">
        <div>WIN RATIO</div>
        <div className="text-[var(--text)]">{winRatio}</div>
      </div>
      <div className="whitespace-nowrap">
        <div>ELO RATING</div>
        <div className="text-[var(--text)]">{eloRating}</div>
      </div>
    </div>
    <button
      className={`${
        isNeumorphism
          ? "neumorphic-convex neumorphic-box rounded-xl p-1"
          : "hover:underline"
      } text-[var(--text-accent)] font-bold uppercase tracking-widest text-[10px] mt-2 md:mt-0 md:ml-4 whitespace-nowrap break-all flex-shrink-0`}
    >
      VIEW DETAILS →
    </button>
  </li>
);
