"use client";

import { usePathname } from "next/navigation";
import Hamburger from "hamburger-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import { Button } from "../components/elements/Button";
import { NavLink } from "../components/common/NavLink";

export default function Navbar() {
  const pathname = usePathname();
  const {
    dropDownButtonRef,
    isComponentVisible: openSideNav,
    setIsComponentVisible: setOpenSideNav,
    ref,
  } = useComponentVisible();

  const NAV_LINKS = [
    {
      name: "Services",
      href: "/services",
      id: "2",
    },
    { name: "Jobs", href: "/jobs", id: "3" },
    { name: "Case Studies", href: "/case-studies", id: "4" },
    { name: "Insights", href: "/insights", id: "5" },
    { name: "About", href: "/about", id: "6" },
    { name: "Contact", href: "/contact", id: "7" },
  ];

  const pathIsActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="w-full relative z-50">
      <div className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-400 rounded-lg"></div>
            <span className="text-xl font-bold text-black">Talora</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                name={link.name}
                href={link.href}
                isActive={pathIsActive(link.href)}
                variant="desktop"
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button href="/book-call" as="link" variant="secondary" className="bg-secondary!" size="md">
              Book a Call
            </Button>
          </div>
          <button
            aria-label={openSideNav ? "close navigation" : "open navigation"}
            className="lg:hidden pl-2 py-2 rounded-md z-100"
            ref={dropDownButtonRef}
          >
            <Hamburger
              toggled={openSideNav}
              toggle={setOpenSideNav}
              label="Show menu"
              easing="ease-in"
              rounded
              size={24}
              color="#000000"
              duration={0.3}
            />
          </button>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      <div
        ref={ref}
        className={clsx(
          "fixed z-90 pb-10 right-0 top-0 text-base flex flex-col justify-between box-border transition-all overflow-y-auto overflow-x-hidden bg-white border-l border-gray-2 h-screen lg:hidden items-start pt-20",
          openSideNav
            ? "w-70 px-6 opacity-100 shadow-xl"
            : "w-0 px-0 opacity-0",
        )}
      >
        <div className="w-full flex items-center gap-20">
          {NAV_LINKS.map((link, index) => (
            <NavLink
              key={link.id}
              name={link.name}
              href={link.href}
              isActive={link.href === pathname}
              variant="mobile"
              onMobileClick={() => setOpenSideNav(false)}
              index={index}
              isSideNavOpen={openSideNav}
              currentPath={pathname}
            />
          ))}
        </div>

        <div className="w-full space-y-3">
          <Button
            href="/book-call"
            as="link"
            variant="secondary"
            className="w-full"
          >
            Book a Call
          </Button>
        </div>
      </div>
    </nav>
  );
}
