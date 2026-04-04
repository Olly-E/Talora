import ServicesHeroSection from "@/app/components/common/ServicesHeroSection";
import ServicesOverviewSection from "@/app/components/common/ServicesOverviewSection";
import ServiceProcessSection from "@/app/components/common/ServiceProcessSection";
import ServiceBenefitsSection from "@/app/components/common/ServiceBenefitsSection";
import ServiceIndustriesSection from "@/app/components/common/ServiceIndustriesSection";
import ContactSection from "@/app/components/common/ContactSection";

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
