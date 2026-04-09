"use client";

import { useState, useMemo } from "react";
import JobSearchBar from "./JobSearchBar";
import JobCategoryFilter from "./JobCategoryFilter";
import JobFilterBar, { JobFilters } from "./JobFilterBar";
import JobCard from "./JobCard";
import JobEmptyState from "./JobEmptyState";
import JobResumeSubmitCTA from "./JobResumeSubmitCTA";
import { usePublicJobs } from "@/app/hooks/usePublicJobs";

const initialFilters: JobFilters = {
  search: "",
  category: "",
  type: "",
  isUrgent: null,
};

export default function JobListingsSection() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const { data: jobs = [], isLoading } = usePublicJobs();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        filters.search === "" ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === "" || job.category === filters.category;

      const matchesType = filters.type === "" || job.type === filters.type;

      const matchesUrgent =
        filters.isUrgent === null || job.isUrgent === filters.isUrgent;

      return matchesSearch && matchesCategory && matchesType && matchesUrgent;
    });
  }, [filters, jobs]);

  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <JobSearchBar
          searchQuery={filters.search}
          onSearchChange={handleSearchChange}
        />

        <JobFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Results Count */}
        <div className="mb-8 text-center">
          {isLoading ? (
            <p className="text-gray-600">Loading positions...</p>
          ) : (
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-secondary">
                {filteredJobs.length}
              </span>{" "}
              {filteredJobs.length === 1 ? "position" : "positions"}
            </p>
          )}
        </div>

        {/* Job Cards Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
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
