"use client";

import { ReactNode } from "react";
import RootLayoutWrapper from "@/components/Layouts/RootLayoutWrapper";
import ChatUserSidebar from "@/components/Navigations/ChatUserSidebar";
import SessionManager from "@/components/Notifications/SessionManager";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayoutWrapper>
      <SessionManager />
      {children}
    </RootLayoutWrapper>
  );
}
