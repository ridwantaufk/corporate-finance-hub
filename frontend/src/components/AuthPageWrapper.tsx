"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useNeumorph } from "@/contexts/NeumorphContext";

export default function AuthPageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isNeumorphism } = useNeumorph();

  return (
    <div
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } flex items-center h-[100vh] overflow-hidden justify-center min-h-screen`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`z-10 ${
            isNeumorphism ? "" : "card"
          } w-full mx-2 max-w-md rounded-2xl`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
