"use client";

import { useState } from "react";
import { jobs, jobCategories } from "../utils/jobsData";
import JobSearchBar from "./JobSearchBar";
import JobCategoryFilter from "./JobCategoryFilter";
import JobCard from "./JobCard";
import JobEmptyState from "./JobEmptyState";
import JobResumeSubmitCTA from "./JobResumeSubmitCTA";

export default function JobListingsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Positions");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All Positions" || job.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSelectedCategory("All Positions");
    setSearchQuery("");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <JobSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <JobCategoryFilter
          categories={jobCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-secondary">
              {filteredJobs.length}
            </span>{" "}
            {filteredJobs.length === 1 ? "position" : "positions"}
          </p>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <JobEmptyState onClearFilters={handleClearFilters} />
        )}

        <JobResumeSubmitCTA />
      </div>
    </section>
  );
}
