import type { Metadata } from "next";
import {
  CaseStudyHeroSection,
  CaseStudyListingsSection,
} from "@/app/(outer)/feature/case-study/components";

export const metadata: Metadata = {
  title: "Case Studies - Proven HR Solutions & Success Stories",
  description:
    "Discover how Talora's HR solutions have transformed businesses. Read real-world case studies on successful recruitment optimization, HR automation implementations, and workforce management improvements.",
  keywords: [
    "HR case studies",
    "recruitment success stories",
    "HR automation examples",
    "workforce optimization results",
    "talent management case studies",
    "HR consulting results",
    "employee engagement success",
  ],
  openGraph: {
    title: "Case Studies - Proven HR Solutions & Success Stories",
    description:
      "Real-world success stories showcasing how Talora's HR solutions have transformed recruitment, automation, and workforce management for businesses.",
    url: "https://taloraagency.com/case-studies",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Talora Case Studies & Success Stories",
      },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <div>
      <CaseStudyHeroSection />
      <CaseStudyListingsSection />
    </div>
  );
}
