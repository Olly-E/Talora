import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
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
            {job.openings} {job.openings === 1 ? "opening" : "openings"}
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
        <span className="text-sm text-gray-500">{job.category}</span>
        <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
          View Details
          <ChevronRight className="size-5" />
        </div>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
    </Link>
  );
}
