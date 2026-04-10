import type { Metadata } from "next";
import ServicesHeroSection from "@/app/components/common/ServicesHeroSection";
import ServicesOverviewSection from "@/app/components/common/ServicesOverviewSection";
import ServiceProcessSection from "@/app/components/common/ServiceProcessSection";
import ServiceBenefitsSection from "@/app/components/common/ServiceBenefitsSection";
import ServiceIndustriesSection from "@/app/components/common/ServiceIndustriesSection";
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
