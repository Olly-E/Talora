import type { Metadata } from "next";
import TeamSection from "@/app/components/common/TeamSection";
import ResourceCategoriesSection from "@/app/components/common/ResourceCategoriesSection";
import CoreCapabilitiesSection from "@/app/components/common/CoreCapabilitiesSection";
import AboutHeroSection from "@/app/components/common/AboutHeroSection";
import ContactSection from "@/app/components/common/ContactSection";

export const metadata: Metadata = {
  title: "About Us - HR Consulting Experts & Workforce Management Leaders",
  description:
    "Meet the Talora team - HR consulting experts dedicated to transforming workforce management. Learn about our mission, values, core capabilities, and commitment to delivering exceptional HR solutions.",
  keywords: [
    "about Talora",
    "HR consulting team",
    "workforce management experts",
    "HR consultants",
    "talent management professionals",
    "HR solutions company",
  ],
  openGraph: {
    title: "About Talora - HR Consulting Experts & Workforce Leaders",
    description:
      "Meet our expert team dedicated to transforming HR operations and workforce management for modern businesses.",
    url: "https://taloraagency.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="">
      <div className="">
        <AboutHeroSection />
        <CoreCapabilitiesSection />
        <ResourceCategoriesSection />
        <section className="bg-black">
          <TeamSection />
        </section>
        <section>
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
