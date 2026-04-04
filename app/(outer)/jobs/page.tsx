import JobHeroSection from "@/app/components/feature/jobs/components/JobHeroSection";
import JobListingsSection from "@/app/components/feature/jobs/components/JobListingsSection";

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <JobHeroSection />
      <JobListingsSection />
    </div>
  );
}
