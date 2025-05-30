import AuthPageWrapper from "@/components/AuthPageWrapper";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <>{children}</>;
}
