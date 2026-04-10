"use client";

import { useState } from "react";
import CaseStudyIndustryFilter from "./CaseStudyIndustryFilter";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyEmptyState from "./CaseStudyEmptyState";
import { caseStudyIndustries } from "@/app/data/caseStudiesData";
import { usePublicCaseStudies } from "@/app/hooks/usePublicCaseStudies";

export default function CaseStudyListingsSection() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const { data: caseStudies = [], isLoading } = usePublicCaseStudies();

  const filteredCaseStudies =
    selectedIndustry === "All Industries"
      ? caseStudies
      : caseStudies.filter(
          (caseStudy) => caseStudy.industry === selectedIndustry,
        );

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container">
        <CaseStudyIndustryFilter
          industries={caseStudyIndustries}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : filteredCaseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <CaseStudyEmptyState />
        )}
      </div>
    </section>
  );
}
