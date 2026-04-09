"use client";

import { useState } from "react";
import CaseStudyIndustryFilter from "./CaseStudyIndustryFilter";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyEmptyState from "./CaseStudyEmptyState";
import { caseStudies, industries } from "../utils/caseStudyData";

export default function CaseStudyListingsSection() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

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
          industries={industries}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
        />

        {filteredCaseStudies.length > 0 ? (
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
