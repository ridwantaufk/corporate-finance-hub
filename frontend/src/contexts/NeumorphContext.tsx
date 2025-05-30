"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NeumorphContextType = {
  isNeumorphism: boolean;
  toggleNeumorphism: () => void;
};

const NeumorphContext = createContext<NeumorphContextType | undefined>(
  undefined
);

export const NeumorphProvider = ({ children }: { children: ReactNode }) => {
  const [isNeumorphism, setIsNeumorphism] = useState(true);

  const toggleNeumorphism = () => {
    setIsNeumorphism((prev) => !prev);
  };

  return (
    <NeumorphContext.Provider value={{ isNeumorphism, toggleNeumorphism }}>
      {children}
    </NeumorphContext.Provider>
  );
};

export const useNeumorph = () => {
  const context = useContext(NeumorphContext);
  if (!context) {
    throw new Error("useNeumorph must be used within a NeumorphProvider");
  }
  return context;
};
