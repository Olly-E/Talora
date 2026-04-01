import TeamSection from "@/app/components/common/TeamSection";
import ResourceCategoriesSection from "@/app/components/common/ResourceCategoriesSection";
import CoreCapabilitiesSection from "@/app/components/common/CoreCapabilitiesSection";
import AboutHeroSection from "@/app/components/common/AboutHeroSection";
import ContactSection from "@/app/components/common/ContactSection";

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
