"use client";

import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface NavLinkProps {
  name: string;
  href: string;
  isActive: boolean;

  variant?: "desktop" | "mobile";
  onMobileClick?: () => void;
  index?: number;
  isSideNavOpen?: boolean;
  currentPath?: string;
}

export function NavLink({
  name,
  href,
  isActive,
  variant = "desktop",
  onMobileClick,
  isSideNavOpen = false,
}: NavLinkProps) {
  if (variant === "mobile") {
    return (
      <div className="w-full">
        <Link
          href={href}
          onClick={onMobileClick}
          className={clsx(
            "transition-all py-4 flex items-center duration-100 whitespace-nowrap px-6 w-full border-b border-black",
            isActive ? "text-white font-semibold bg-black" : "text-black",
            isSideNavOpen ? "opacity-100" : "opacity-0",
          )}
        >
          {name}
        </Link>
      </div>
    );
  }

  // Desktop variant
  return (
    <Link
      href={href}
      className={clsx(
        "transition-colors duration-300 py-2 text-base font-medium",
        isActive ? "text-primary" : "text-black hover:text-primary",
      )}
    >
      {name}
    </Link>
  );
}
