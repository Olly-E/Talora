"use client";

import React from "react";
import { Menu } from "lucide-react";
import NextTopLoader from "nextjs-toploader";
import { useLogout } from "@/app/features/admin/auth/api";
import { useAuthProtection } from "@/app/features/admin/dashboard/hooks";
import { Sidebar } from "./Sidebar";
import { LoadingState } from "./LoadingState";

interface DashboardContentProps {
  children: React.ReactNode;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { mutate: logout } = useLogout();
  const { isLoading, isAuthenticated } = useAuthProtection();

  const handleLogout = () => {
    logout();
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NextTopLoader showSpinner={false} color="#000000" />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        onLogout={handleLogout}
      />

      <div className="lg:pl-64">
        <button
          onClick={handleOpenSidebar}
          className="lg:hidden fixed top-4 right-4 z-10 p-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
