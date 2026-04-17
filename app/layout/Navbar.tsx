"use client";

import { usePathname } from "next/navigation";
import { Zap, Users } from "lucide-react";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import NavDropdown from "../components/common/NavDropdown";
import taloraLogo from "@/public/images/taloraLogo.png";
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

  const servicesDropdownItems = [
    {
      name: "Recruitment Automation",
      href: "/services/hr-automation",
      description: "Structured workflows to streamline your hiring process",
      icon: <Zap className="size-5" />,
    },
    {
      name: "Recruitment Services",
      href: "/services/recruitment",
      description: "End-to-end support to source and hire top talent",
      icon: <Users className="size-5" />,
    },
  ];

  const NAV_LINKS = [
    { name: "Jobs", href: "/jobs", id: "3" },
    { name: "Case Studies", href: "/case-studies", id: "4" },
    { name: "Insights", href: "/insights", id: "5" },
    { name: "About", href: "/about", id: "6" },
    { name: "Contact", href: "/contact#contact-form", id: "7" },
  ];

  const pathIsActive = (href: string) => {
    // Strip hash from href for comparison
    const pathWithoutHash = href.split("#")[0];
    return (
      pathname === pathWithoutHash || pathname.startsWith(pathWithoutHash + "/")
    );
  };

  const servicesIsActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <nav className="w-full relative z-50">
      <div className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={taloraLogo}
              alt="Talora logo"
              width={70}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavDropdown
              label="Services"
              items={servicesDropdownItems}
              isActive={servicesIsActive}
              variant="desktop"
            />
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
            <Button
              href="/book-call"
              as="link"
              variant="secondary"
              className="bg-secondary!"
              size="md"
            >
              Book a Call
            </Button>
          </div>
          <button
            aria-label={openSideNav ? "close navigation" : "open navigation"}
            className="lg:hidden pl-2 py-2 rounded-md z-50"
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

      <div
        ref={ref}
        className={clsx(
          "fixed z-40 pb-10 right-0 top-0 text-base flex flex-col justify-between box-border transition-all overflow-y-auto overflow-x-hidden bg-white border-l border-gray-2 h-screen lg:hidden items-start pt-20",
          openSideNav ? "w-70 opacity-100 shadow-xl" : "w-0 px-0 opacity-0",
        )}
      >
        <div className="w-full flex flex-col items-start">
          <NavDropdown
            label="Services"
            items={servicesDropdownItems}
            isActive={servicesIsActive}
            variant="mobile"
            onMobileClick={() => setOpenSideNav(false)}
          />
          {NAV_LINKS.map((link, index) => (
            <NavLink
              key={link.id}
              name={link.name}
              href={link.href}
              isActive={pathIsActive(link.href)}
              variant="mobile"
              onMobileClick={() => setOpenSideNav(false)}
              index={index}
              isSideNavOpen={openSideNav}
              currentPath={pathname}
            />
          ))}
        </div>

        <div className="w-full space-y-3 px-4">
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
