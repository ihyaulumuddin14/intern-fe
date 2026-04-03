import { SearchProvider } from "@/components/providers/SearchProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/features/user-dashboard/components/AppSidebar";
import {
  DashboardContent,
  MobileDashboardContent,
} from "@/features/user-dashboard/components/DashboardContent";
import Navbar from "@/features/user-dashboard/components/NavbarUserDashboard";
import UserDashboardContainer from "@/features/user-dashboard/containers/UserDashboardContainer";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pengguna | SkillGap",
  description:
    "Kelola sesi karier, pantau perkembangan kompetensi, dan lihat rekomendasi pengembangan diri Anda di dashboard SkillGap.",
};

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SearchProvider>
        <Navbar />
        <AppSidebar />

        <UserDashboardContainer>
          <DashboardContent>{children}</DashboardContent>
          <MobileDashboardContent>{children}</MobileDashboardContent>
        </UserDashboardContainer>
      </SearchProvider>
    </SidebarProvider>
  );
};

export default UserDashboardLayout;
