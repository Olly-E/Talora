import {
  RecruitmentHeroSection,
  RecruitmentServicesSection,
  RecruitmentProcessSection,
  RecruitmentCTASection,
} from "@/app/(outer)/feature/recruitment/components";

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
