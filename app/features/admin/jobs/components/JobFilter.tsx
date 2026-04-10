"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { X, Filter, ChevronDown } from "lucide-react";

import { Button } from "@/app/components/elements/Button";
import { JobFilters, JobFilterProps } from "../types";
import { jobCategories } from "@/app/data/jobsData";
import { JOB_TYPES } from "../utils/validation";

export type { JobFilters };

export const JobFilter: React.FC<JobFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ ...filters, search: e.target.value });
    },
    [filters, onFilterChange],
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const newCategories = filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category];
      onFilterChange({ ...filters, category: newCategories });
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
    filters.category.length > 0 ||
    filters.type !== "" ||
    filters.isUrgent !== null;

  const filterContent = useMemo(
    () => (
      <>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Filter Jobs</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                size="sm"
                onClick={onClearFilters}
                variant="outline"
                className="text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <X className="size-3" />
                Clear Filters
              </Button>
            )}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Job title, industry..."
              value={filters.search}
              onChange={handleSearchChange}
              className="h-9.5 rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black placeholder:text-gray-400"
            />
          </div>

          <div className="w-full" ref={categoryDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                className="h-9.5 rounded-[5px] w-full border border-[#444444]/20 bg-white px-4 outline-none text-sm text-black text-left flex items-center justify-between hover:border-[#444444]/40 transition-colors"
              >
                <span
                  className={
                    filters.category.length === 0
                      ? "text-gray-400"
                      : "text-black"
                  }
                >
                  {filters.category.length === 0
                    ? "All Categories"
                    : `${filters.category.length} selected`}
                </span>
                <ChevronDown
                  className={`size-4 text-gray-500 transition-transform ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-[#444444]/20 rounded-[5px] shadow-lg max-h-60 overflow-auto">
                  <div className="p-2 space-y-1">
                    {jobCategories
                      .filter((cat) => cat !== "All Positions")
                      .map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={filters.category.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                          <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                  </div>
                </div>
              )}

              {filters.category.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filters.category.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-secondary text-xs font-medium rounded-full border border-primary/30"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(cat)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className="h-9.5 rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black"
            >
              <option value="">All Types</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="h-9.5 rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black"
            >
              <option value="">All</option>
              <option value="urgent">Urgent Only</option>
              <option value="normal">Normal Only</option>
            </select>
          </div>
        </div>
      </>
    ),
    [
      filters,
      hasActiveFilters,
      handleSearchChange,
      handleCategoryToggle,
      handleTypeChange,
      handleUrgentChange,
      onClearFilters,
      isCategoryDropdownOpen,
      setIsCategoryDropdownOpen,
    ],
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 flex items-center justify-center gap-2"
        >
          <Filter className="size-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 bg-primary text-secondary text-xs font-semibold rounded-full">
              {
                [
                  filters.search !== "",
                  filters.category.length > 0,
                  filters.type !== "",
                  filters.isUrgent !== null,
                ].filter(Boolean).length
              }
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block sticky top-0 z-10 bg-white rounded-2xl p-6 border border-gray-200 mb-6 shadow-sm">
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
};
