"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { JobCardProps } from "../types";
import { formatSalaryWithCurrency } from "@/app/utils/currency";

// Helper function to strip HTML tags from WYSIWYG content
const stripHtml = (html: string): string => {
  if (typeof window === "undefined") return html;
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on edit/delete buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/godmode/dashboard/jobs/${job.id}`);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {job.isUrgent && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                <AlertCircle className="size-3" />
                Urgent
              </span>
            )}
            {job.category.map((cat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-secondary text-xs font-semibold rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-secondary transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>

        {isAdmin && onEdit && onDelete && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(job)}
              className="p-2 text-gray-400 hover:text-secondary hover:bg-primary/10 rounded-lg transition-colors"
              title="Edit job"
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete job"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
        {stripHtml(job.description)}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-tertiary/10 rounded-lg">
            <MapPin className="size-4 text-tertiary" />
          </div>
          <span className="text-gray-700">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-tertiary/10 rounded-lg">
            <Briefcase className="size-4 text-tertiary" />
          </div>
          <span className="text-gray-700">{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <DollarSign className="size-4 text-secondary" />
          </div>
          <span className="text-gray-700">
            {formatSalaryWithCurrency(job.salary, job.currency)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Users className="size-4 text-secondary" />
          </div>
          <span className="text-gray-700">{job.openings} openings</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
          {job.modeOfWork}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
        {job.tags.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            +{job.tags.length - 3} more
          </span>
        )}
      </div>

      {!isAdmin && (
        <div className="pt-4 border-t border-gray-100">
          <Link href={`/godmode/dashboard/jobs/${job.id}`}>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
              View Details
            </Button>
          </Link>
        </div>
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
    </div>
  );
};
