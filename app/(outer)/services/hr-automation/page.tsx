import type { Metadata } from "next";
import {
  HRAutomationHeroSection,
  HRAutomationFeaturesSection,
  HRAutomationProcessSection,
  HRAutomationCTASection,
} from "@/app/(outer)/feature/hr-automation/components";

export const metadata: Metadata = {
  title: "HR Automation Services - Streamline Your HR Processes & Workflows",
  description:
    "Automate your HR processes with Talora's expert solutions. Streamline onboarding, payroll, time tracking, employee management, and compliance. Reduce manual work and boost efficiency with HR automation.",
  keywords: [
    "HR automation",
    "HR process automation",
    "automated HR systems",
    "HRIS implementation",
    "HR workflow automation",
    "employee onboarding automation",
    "payroll automation",
    "HR digital transformation",
    "HR technology solutions",
  ],
  openGraph: {
    title: "HR Automation Services - Streamline HR Processes & Workflows",
    description:
      "Transform your HR operations with automation. Streamline onboarding, payroll, and employee management with Talora's expert solutions.",
    url: "https://taloraagency.com/services/hr-automation",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Talora HR Automation Services",
      },
    ],
  },
};

export default function HRAutomationPage() {
  return (
    <div>
      <HRAutomationHeroSection />
      <HRAutomationFeaturesSection />
      <HRAutomationProcessSection />
      <HRAutomationCTASection />
    </div>
  );
}
