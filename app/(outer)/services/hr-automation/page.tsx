import {
  HRAutomationHeroSection,
  HRAutomationFeaturesSection,
  HRAutomationProcessSection,
  HRAutomationCTASection,
} from "@/app/(outer)/feature/hr-automation/components";

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
