import { Briefcase, FileText, LayoutDashboard, LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/godmode/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/godmode/dashboard/jobs",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    href: "/godmode/dashboard/articles",
    label: "Articles",
    icon: FileText,
  },
];
