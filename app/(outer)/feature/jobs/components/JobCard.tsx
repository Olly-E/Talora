"use client";

import {
  Briefcase,
  MapPin,
  Banknote,
  Users,
  Building2,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Job } from "../types";
import { formatSalaryWithCurrency } from "@/app/utils/currency";

interface JobCardProps {
  job: Job;
}

// Helper function to strip HTML tags from WYSIWYG content
const stripHtml = (html: string): string => {
  if (typeof window === "undefined") return html;
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group bg-white rounded-3xl p-4 md:p-8 hover:shadow-2xl transition-all duration-300 border border-primary/50 hover:border-primary/20 relative overflow-hidden"
    >
      {/* Company & Openings */}
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 rounded-2xl p-2 md:p-3">
          <Building2 className="size-5 md:size-6 text-primary" />
        </div>
        <div className="text-right">
          <div className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
            <Users className="size-4" />
            {job.openings} {job.openings === 1 ? "opening" : "openings"}
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
        {job.title}
      </h3>

      <p className="text-sm md:text-base text-gray-600 font-medium mb-3">
        {job.company}
      </p>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <div className="min-w-4">
            <MapPin className="size-4 text-primary" />
          </div>
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <div className="min-w-4">
            <Briefcase className="size-4 text-primary" />
          </div>
          {job.type}
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <div className="min-w-4">
            <Banknote className="size-4 text-primary" />
          </div>
          {formatSalaryWithCurrency(job.salary, job.currency)}
        </div>
        {job.posted && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <div className="min-w-4">
              <Calendar className="size-4 text-primary" />
            </div>
            {job.posted}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {job.tags.length > 3 && (
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            +{job.tags.length - 3} more
          </span>
        )}
      </div>

      {/* View Details */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs md:text-sm text-gray-500">
          {job.category.join(", ")}
        </span>
        <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all text-xs md:text-base">
          View Details
          <ChevronRight className="size-5" />
        </div>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
    </Link>
  );
}
