"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LogOut, X } from "lucide-react";
import { NAV_ITEMS, NavItem } from "../../utils/constants";
import { Button } from "@/app/components/elements/Button";
import { SidebarProps } from "../types";

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-30 h-full w-64 bg-secondary transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary/20">
          <h1 className="text-[24px]! font-semibold! text-white">Talora</h1>
          <Button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white bg-transparent hover:bg-transparent p-0"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {NAV_ITEMS.map((item: NavItem) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary/20">
          <Button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors bg-transparent"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
