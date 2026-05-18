import type { Metadata } from "next";
import HeroSection from "../components/common/HeroSection";

import TestimonialsSection from "../components/common/TestimonialsSection";
import SmarterHRSection from "../components/common/SmarterHRSection";
import AboutTaloraGrid from "../components/common/AboutTaloraGrid";
import AutomateSection from "../components/common/AutomateSection";
import ContactSection from "../components/common/ContactSection";
import ArticleSection from "../components/common/ArticleSection";
import TeamSection from "../components/common/TeamSection";
import FutureReady from "../components/common/FutureReady";

export const metadata: Metadata = {
  title: "Home - HR Solutions & Workforce Management Consulting",
  description:
    "Optimize your workforce management with Talora's all-in-one HR solutions. Expert consulting in recruitment, HR automation, employee engagement, and talent management to drive business success.",
  keywords: [
    "HR solutions",
    "workforce management",
    "HR consulting",
    "recruitment",
    "HR automation",
    "talent management",
    "employee engagement",
    "workforce optimization",
  ],
  openGraph: {
    title: "Talora - Optimize Workforce Management with HR Solutions",
    description:
      "Transform your HR operations with expert consulting and automation. Streamline recruitment, enhance employee engagement, and optimize workforce management.",
    url: "https://taloraagency.com",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
        width: 1200,
        height: 630,
        alt: "Talora - Workforce Management Solutions",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <section className="border-t border-gray-2 my-20 py-20">
        <AboutTaloraGrid />
      </section>
      <section>
        <FutureReady />
      </section>
      <section className="container bg-secondary sm:bg-transparent">
        <AutomateSection />
      </section>
      <section>
        <SmarterHRSection />
      </section>
      <section>
        <TeamSection />
      </section>
      <section>
        <TestimonialsSection />
      </section>
      <section>
        <ContactSection />
      </section>
      <section>
        <ArticleSection />
      </section>
    </div>
  );
}
