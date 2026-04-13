import type { Metadata } from "next";
import {
  RecruitmentHeroSection,
  RecruitmentServicesSection,
  RecruitmentProcessSection,
  RecruitmentCTASection,
} from "@/app/(outer)/feature/recruitment/components";

export const metadata: Metadata = {
  title: "Recruitment Services - Expert Talent Acquisition & Hiring Solutions",
  description:
    "Transform your hiring process with Talora's recruitment services. Expert talent acquisition, candidate sourcing, interview optimization, and recruitment process outsourcing (RPO) to build exceptional teams.",
  keywords: [
    "recruitment services",
    "talent acquisition",
    "hiring solutions",
    "recruitment process outsourcing",
    "RPO services",
    "candidate sourcing",
    "executive search",
    "recruitment consulting",
    "talent sourcing",
  ],
  openGraph: {
    title: "Recruitment Services - Expert Talent Acquisition & Hiring",
    description:
      "Expert recruitment services to help you find, attract, and hire top talent. Transform your hiring process with Talora's proven strategies.",
    url: "https://taloraagency.com/services/recruitment",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776082741/talora/articles/cisie0aj9kualyqkpvxc.png",
        width: 1200,
        height: 630,
        alt: "Talora Recruitment Services",
      },
    ],
  },
};

export default function RecruitmentPage() {
  return (
    <div>
      <RecruitmentHeroSection />
      <RecruitmentServicesSection />
      <RecruitmentProcessSection />
      <RecruitmentCTASection />
    </div>
  );
}
