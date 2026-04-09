"use client";

import React from "react";
import { DashboardContent } from "@/app/features/admin/dashboard/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardContent>{children}</DashboardContent>;
}
