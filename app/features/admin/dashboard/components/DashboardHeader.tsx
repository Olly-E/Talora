"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { DashboardHeaderProps } from "../types";

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuClick,
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 bg-transparent hover:bg-transparent p-0"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </Button>
        <div className="flex-1" />
      </div>
    </header>
  );
};
