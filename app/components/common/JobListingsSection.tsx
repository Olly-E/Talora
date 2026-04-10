"use client";

import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Search,
  ArrowRight,
  Building2,
  Calendar,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { Button } from "../elements/Button";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { jobCategories } from "@/app/data/jobsData";
import { usePublicJobs } from "@/app/hooks/usePublicJobs";

export default function JobListingsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Positions");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: jobs = [], isLoading } = usePublicJobs();

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All Positions" ||
      job.category.includes(selectedCategory);
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsDrawerOpen(false);
  }, []);

  const categoryButtons = useMemo(
    () => (
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        {jobCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? "bg-secondary text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    ),
    [selectedCategory, handleCategorySelect],
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <Search className="size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, company, or location..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              size="md"
              className="bg-secondary rounded-xl! hover:bg-secondary/90 text-white! px-3 sm:px-8"
            >
              <span className="hidden sm:inline">Search Jobs</span>
              <Search className="size-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Category Filter Button */}
        <div className="md:hidden mb-8">
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            <Filter className="size-4" />
            Category: {selectedCategory}
          </Button>
        </div>

        {/* Desktop Category Filter */}
        <div className="hidden md:flex flex-wrap gap-3 mb-12 justify-center">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-secondary text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 relative overflow-hidden"
              >
                {/* Company & Openings */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 rounded-2xl p-3">
                    <Building2 className="size-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Users className="size-4" />
                      {job.openings}{" "}
                      {job.openings === 1 ? "opening" : "openings"}
                    </div>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                  {job.title}
                </h3>

                <p className="text-gray-600 font-medium mb-3">{job.company}</p>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="size-4 text-primary" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="size-4 text-primary" />
                    {job.salary}
                  </div>
                  {job.posted && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="size-4 text-primary" />
                      {job.posted}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {job.category.join(", ")}
                  </span>
                  <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                    View Details
                    <ChevronRight className="size-5" />
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-200 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("All Positions");
                setSearchQuery("");
              }}
              variant="secondary"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-linear-to-r from-secondary to-secondary/90 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Don&apos;t See the Right Fit?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Send us your resume and we&apos;ll notify you when new positions
              matching your profile become available.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-gray-100"
              >
                Submit Your Resume
                <ArrowRight className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50 md:hidden max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="size-5 text-secondary" />
                <h3 className="text-lg font-bold text-gray-900">
                  Select Category
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600" />
              </button>
            </div>
            {categoryButtons}
          </div>
        </>
      )}
    </section>
  );
}
