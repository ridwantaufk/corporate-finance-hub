import { useNeumorph } from "@/contexts/NeumorphContext";

const activity = [
  {
    time: "05:23",
    icon: "fas fa-arrow-up-right",
    iconColor: "#6b21a8",
    title: "Payment received from Client A",
    category: "Cash Management",
  },
  {
    time: "05:23",
    icon: "fas fa-arrow-down-left",
    iconColor: "#f43f5e",
    title: "Invoice #12345 overdue",
    category: "Payments & Collections",
  },
  {
    time: "05:23",
    icon: "fas fa-user-friends",
    iconColor: "#a855f7",
    title: "New user registered: Jane Smith",
    category: "",
  },
  {
    time: "05:23",
    icon: "fas fa-shield-alt",
    iconColor: "#f97316",
    title: "AML check flagged for Client B",
    category: "",
  },
  {
    time: "05:23",
    icon: "fas fa-shield-alt",
    iconColor: "#f97316",
    title: "AML check flagged for Client B",
    category: "",
  },
  {
    time: "05:23",
    icon: "fas fa-shield-alt",
    iconColor: "#f97316",
    title: "AML check flagged for Client B",
    category: "",
  },
  {
    time: "05:23",
    icon: "fas fa-shield-alt",
    iconColor: "#f97316",
    title: "AML check flagged for Client B",
    category: "",
  },
];

export default function ActivityFeed() {
  const { isNeumorphism } = useNeumorph();

  return (
    <div className="space-y-4 max-h-56 text-[10px] text-[var(--text-accent)] overflow-y-auto p-3">
      {activity.map((item, idx) => (
        <div
          key={idx}
          className={`${
            isNeumorphism ? "neumorphic-flat p-1 rounded-lg" : ""
          } flex items-center justify-between truncate`}
        >
          <span className="flex-shrink-0">{item.time}</span>
          <i
            className={`${item.icon} text-[${item.iconColor}] flex-shrink-0`}
          />
          <div className="flex-1 ml-2 truncate">
            <span className="font-bold text-[var(--text)] truncate">
              {item.title}
            </span>
            {item.category && (
              <>
                <br />
                <span className="text-[var(--text-accent)] truncate">
                  {item.category}
                </span>
              </>
            )}
          </div>
          <i className="fas fa-arrow-right ml-2 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
