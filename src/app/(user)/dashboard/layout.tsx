import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/features/user-dashboard/components/AppSidebar";
import { DashboardContent, MobileDashboardContent } from "@/features/user-dashboard/components/DashboardContent";
import Navbar from "@/features/user-dashboard/components/NavbarUserDashboard";
import UserDashboardContainer from "@/features/user-dashboard/containers/UserDashboardContainer";
import { ReactNode } from "react";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <AppSidebar />
      
      <UserDashboardContainer>
        <DashboardContent>{children}</DashboardContent>
        <MobileDashboardContent>{children}</MobileDashboardContent>
      </UserDashboardContainer>
    </SidebarProvider>
  )
};

export default UserDashboardLayout;
