"use client";

import { ReactNode } from "react";
import RootLayoutWrapper from "@/components/Layouts/RootLayoutWrapper";
import ChatUserSidebar from "@/components/Navigations/ChatUserSidebar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayoutWrapper>
      <ChatUserSidebar />
      {children}
    </RootLayoutWrapper>
  );
}
