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
      <div>
        <Link
          href={href}
          onClick={onMobileClick}
          className={clsx(
            "transition-all duration-100 block whitespace-nowrap border-b border-gray-3 px-3 rounded-full",
            isActive
              ? "text-black font-semibold py-3 bg-primary"
              : "py-3 text-black",
            index > 0 && "mt-2",
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
