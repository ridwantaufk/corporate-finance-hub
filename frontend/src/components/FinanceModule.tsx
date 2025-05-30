import React, { useState } from "react";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { FinanceModuleItem } from "./FinanceModuleItem";

const FinanceModule: React.FC = () => {
  const { isNeumorphism } = useNeumorph();
  const [mutualChecked, setMutualChecked] = useState(true);

  return (
    <section className="text-[10px] scrollbar-thin mb-2 max-w-full">
      <div className="flex justify-between items-center mb-1 flex-wrap">
        <h3 className="font-bold uppercase text-[var(--text-accent)] whitespace-nowrap indent-3">
          FINANCE MODULES
        </h3>
        <div className="flex items-center space-x-2 text-[var(--text-accent)] whitespace-nowrap">
          <span> Mutual Clients </span>
          <label
            className="relative inline-flex items-center cursor-pointer"
            htmlFor="mutual-toggle"
          >
            <input
              checked={mutualChecked}
              onChange={() => setMutualChecked(!mutualChecked)}
              className="sr-only peer"
              id="mutual-toggle"
              type="checkbox"
            />
            <div className="w-9 h-5 bg-[var(--accent-dark)] rounded-full transition-all peer-focus:ring-[var(--accent-dark)] peer-checked:bg-[var(--accent)] relative"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[var(--text)] rounded-full shadow transform peer-checked:translate-x-4 transition-transform"></div>
          </label>
        </div>
      </div>
      <ul className="space-y-1 w-full overflow-hidden">
        <FinanceModuleItem
          title="Cash Management"
          status="ACTIVE"
          description="Managing virtual accounts & cash positions"
          imageUrl="https://storage.googleapis.com/a1aa/image/4e584e60-6c10-48c9-8969-fe8470ecce94.jpg"
          users={5}
          winRatio="63%"
          eloRating="2368"
          isNeumorphism={isNeumorphism}
        />
        <FinanceModuleItem
          title="Cash Management"
          status="ACTIVE"
          description="Managing virtual accounts & cash positions"
          imageUrl="https://storage.googleapis.com/a1aa/image/4e584e60-6c10-48c9-8969-fe8470ecce94.jpg"
          users={5}
          winRatio="63%"
          eloRating="2368"
          isNeumorphism={isNeumorphism}
        />
        <FinanceModuleItem
          title="Cash Management"
          status="ACTIVE"
          description="Managing virtual accounts & cash positions"
          imageUrl="https://storage.googleapis.com/a1aa/image/4e584e60-6c10-48c9-8969-fe8470ecce94.jpg"
          users={5}
          winRatio="63%"
          eloRating="2368"
          isNeumorphism={isNeumorphism}
        />
        <FinanceModuleItem
          title="Cash Management"
          status="ACTIVE"
          description="Managing virtual accounts & cash positions"
          imageUrl="https://storage.googleapis.com/a1aa/image/4e584e60-6c10-48c9-8969-fe8470ecce94.jpg"
          users={5}
          winRatio="63%"
          eloRating="2368"
          isNeumorphism={isNeumorphism}
        />
      </ul>
    </section>
  );
};

export default FinanceModule;
