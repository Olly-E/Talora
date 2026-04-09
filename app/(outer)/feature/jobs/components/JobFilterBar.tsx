"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { jobCategories } from "@/app/data/jobsData";
import { Button } from "@/app/components/elements/Button";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export interface JobFilters {
  search: string;
  category: string;
  type: string;
  isUrgent: boolean | null;
}

interface JobFilterBarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}

export default function JobFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}: JobFilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ ...filters, category: e.target.value });
    },
    [filters, onFilterChange],
  );

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ ...filters, type: e.target.value });
    },
    [filters, onFilterChange],
  );

  const handleUrgentChange = useCallback(
    (value: boolean | null) => {
      onFilterChange({ ...filters, isUrgent: value });
    },
    [filters, onFilterChange],
  );

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "" ||
    filters.type !== "" ||
    filters.isUrgent !== null;

  const activeFilterCount = [
    filters.category !== "",
    filters.type !== "",
    filters.isUrgent !== null,
  ].filter(Boolean).length;

  const filterContent = useMemo(
    () => (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-gray-900">Filter Jobs</h3>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-secondary transition-colors"
              >
                <X className="size-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 bg-white outline-none text-sm text-gray-900 focus:border-secondary transition-colors"
            >
              <option value="">All Categories</option>
              {jobCategories
                .filter((cat) => cat !== "All Positions")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Job Type */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 bg-white outline-none text-sm text-gray-900 focus:border-secondary transition-colors"
            >
              <option value="">All Types</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Urgent Filter */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={
                filters.isUrgent === null
                  ? ""
                  : filters.isUrgent
                    ? "urgent"
                    : "normal"
              }
              onChange={(e) =>
                handleUrgentChange(
                  e.target.value === "" ? null : e.target.value === "urgent",
                )
              }
              className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 bg-white outline-none text-sm text-gray-900 focus:border-secondary transition-colors"
            >
              <option value="">All Jobs</option>
              <option value="urgent">Urgent Hiring</option>
              <option value="normal">Standard Hiring</option>
            </select>
          </div>
        </div>
      </>
    ),
    [
      filters,
      hasActiveFilters,
      handleCategoryChange,
      handleTypeChange,
      handleUrgentChange,
      onClearFilters,
    ],
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 flex items-center justify-center gap-2"
        >
          <Filter className="size-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-secondary text-white text-xs font-semibold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block bg-white rounded-2xl p-6 shadow-lg mb-8">
        {filterContent}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50 md:hidden max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
            {filterContent}
          </div>
        </>
      )}
    </>
  );
}
