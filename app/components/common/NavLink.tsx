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
  index = 0,
  isSideNavOpen = false,
  currentPath,
}: NavLinkProps) {
  if (variant === "mobile") {
    return (
      <div className="w-full">
        <Link
          href={href}
          onClick={onMobileClick}
          className={clsx(
            "transition-all duration-100 block whitespace-nowrap px-3 py-3 w-full border-b border-black",
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
        "transition-color duration-300 px-4 whitespace-nowrap py-1 rounded-full hover:bg-black hover:text-white text-sm",
        isActive ? "text-white bg-black" : "text-black",
      )}
    >
      {name}
    </Link>
  );
}
