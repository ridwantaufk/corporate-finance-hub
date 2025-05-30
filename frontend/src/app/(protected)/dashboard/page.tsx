"use client";

import ProfileHeader from "@/components/Navigations/ProfileHeader";
import Statsbar from "@/components/Navigations/Statsbar";
import HomeSection from "@/components/HomeSection";
import Platforms from "@/components/Platforms";
import FinanceModule from "@/components/FinanceModule";
import FinanceDashboard from "@/components/FinanceDashboard";

export default function DashboardPage() {
  return (
    <>
      <ProfileHeader />
      <Statsbar />
      <HomeSection />
      <Platforms />
      <FinanceModule />
      <FinanceDashboard />
    </>
  );
}
