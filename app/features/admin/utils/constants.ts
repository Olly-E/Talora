import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LucideIcon,
  BookOpen,
  Users,
} from "lucide-react";

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
  {
    href: "/godmode/dashboard/case-studies",
    label: "Case Studies",
    icon: BookOpen,
  },
  {
    href: "/godmode/dashboard/talent-pool",
    label: "Talent Pool",
    icon: Users,
  },
];
