"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface DropdownItem {
  name: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  isActive: boolean;
  variant?: "desktop" | "mobile";
  onMobileClick?: () => void;
}

export default function NavDropdown({
  label,
  items,
  isActive,
  variant = "desktop",
  onMobileClick,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "mobile") {
    return (
      <div className="w-full">
        <div className="flex items-stretch border-b border-black">
          <Link
            href="/services"
            onClick={onMobileClick}
            className={clsx(
              "transition-all py-4 flex items-center duration-100 whitespace-nowrap px-6 flex-1",
              isActive ? "text-white font-semibold bg-black" : "text-black",
            )}
          >
            {label}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "px-4 transition-all duration-100",
              isActive ? "text-white bg-black" : "text-black",
            )}
          >
            <ChevronDown
              className={clsx(
                "size-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </div>
        {isOpen && (
          <div className="w-full">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={onMobileClick}
                className="transition-all py-4 flex items-center duration-100 whitespace-nowrap px-6 pl-12 w-full border-b border-black text-black hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/services"
        className={clsx(
          "flex items-center gap-1 py-2 text-base font-medium transition-colors",
          isActive ? "text-primary" : "text-black hover:text-primary",
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={clsx(
            "size-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </Link>

      <div
        className={clsx(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none",
        )}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[320px]">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block rounded-xl p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                {item.icon && (
                  <div className="mt-1 text-primary">{item.icon}</div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 leading-tight">
                    {item.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
