import type { Metadata } from "next";

import ServiceIndustriesSection from "@/app/components/common/ServiceIndustriesSection";
import ServicesOverviewSection from "@/app/components/common/ServicesOverviewSection";
import ServiceBenefitsSection from "@/app/components/common/ServiceBenefitsSection";
import ServiceProcessSection from "@/app/components/common/ServiceProcessSection";
import ServicesHeroSection from "@/app/components/common/ServicesHeroSection";
import ContactSection from "@/app/components/common/ContactSection";

export const metadata: Metadata = {
  title: "HR Services - Recruitment, Automation & Workforce Solutions",
  description:
    "Comprehensive HR services including talent acquisition, recruitment process optimization, HR automation, workforce planning, employee engagement programs, and performance management consulting.",
  keywords: [
    "HR services",
    "recruitment services",
    "HR automation",
    "talent acquisition",
    "workforce planning",
    "employee engagement",
    "performance management",
    "HR consulting services",
    "workforce solutions",
  ],
  openGraph: {
    title: "HR Services - Recruitment, Automation & Workforce Solutions",
    description:
      "Comprehensive HR services to streamline your recruitment, automate processes, and optimize workforce management.",
    url: "https://taloraagency.com/services",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Talora HR Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="">
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <ServiceProcessSection />
      <ServiceBenefitsSection />
      <ServiceIndustriesSection />
      <section>
        <ContactSection />
      </section>
    </div>
  );
}
