import type { Metadata } from "next";
import JobHeroSection from "@/app/(outer)/feature/jobs/components/JobHeroSection";
import JobListingsSection from "@/app/(outer)/feature/jobs/components/JobListingsSection";

export const metadata: Metadata = {
  title: "Careers - Join Our HR Consulting Team | Current Job Openings",
  description:
    "Explore career opportunities at Talora. Join our team of HR professionals and make an impact in workforce management, recruitment, and HR consulting. View current job openings and apply today.",
  keywords: [
    "HR jobs",
    "careers at Talora",
    "HR consultant jobs",
    "recruitment jobs",
    "HR careers",
    "talent acquisition jobs",
    "workforce management careers",
    "HR technology jobs",
  ],
  openGraph: {
    title: "Careers at Talora - Join Our HR Consulting Team",
    description:
      "Explore exciting career opportunities at Talora. Join our team of HR experts and shape the future of workforce management.",
    url: "https://taloraagency.com/jobs",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Talora",
      },
    ],
  },
};

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <JobHeroSection />
      <JobListingsSection />
    </div>
  );
}
