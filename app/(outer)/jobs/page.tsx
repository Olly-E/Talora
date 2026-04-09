import JobHeroSection from "@/app/(outer)/feature/jobs/components/JobHeroSection";
import JobListingsSection from "@/app/(outer)/feature/jobs/components/JobListingsSection";

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <JobHeroSection />
      <JobListingsSection />
    </div>
  );
}
