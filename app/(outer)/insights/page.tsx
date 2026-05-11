import type { Metadata } from "next";
import { InsightsHeroSection } from "@/app/(outer)/feature/insights/components";
import ArticleSection from "@/app/components/common/ArticleSection";

export const metadata: Metadata = {
  title: "HR Insights & Articles - Expert Tips on Workforce Management",
  description:
    "Stay informed with Talora's HR insights, articles, and expert advice on recruitment best practices, HR automation, workforce trends, talent management, and employee engagement strategies.",
  keywords: [
    "HR insights",
    "HR articles",
    "recruitment tips",
    "workforce management blog",
    "HR best practices",
    "talent management articles",
    "employee engagement tips",
    "HR trends",
    "HR automation guides",
  ],
  openGraph: {
    title: "HR Insights & Articles - Expert Workforce Management Tips",
    description:
      "Expert insights, articles, and best practices for recruitment, HR automation, and workforce management from Talora's consulting team.",
    url: "https://taloraagency.com/insights",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Talora HR Insights & Articles",
      },
    ],
  },
};

export default function InsightsPage() {
  return (
    <div>
      <InsightsHeroSection />
      <ArticleSection />
    </div>
  );
}
