"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  AlertCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { usePublicJobs } from "@/app/hooks/usePublicJobs";
import { formatSalaryWithCurrency } from "@/app/utils/currency";

export default function JobPostPage() {
  const params = useParams();
  const jobSlug = params.id as string;

  const { data: jobs = [], isLoading } = usePublicJobs();

  const job = useMemo(() => {
    // Only return published jobs on public page
    return (
      jobs.find((j) => j.slug === jobSlug && j.status === "PUBLISHED") || null
    );
  }, [jobs, jobSlug]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-4xl">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-4xl">
        <div className="text-center min-h-96 flex flex-col items-center justify-center">
          <AlertCircle className="size-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The job posting you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Button as="link" href="/jobs" variant="secondary">
            Browse All Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <Building2 className="size-5" />
              <span>{job.company}</span>
            </div>
          </div>
          {job.isUrgent && (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Urgent
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="size-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="size-5" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="size-5" />
            <span>{formatSalaryWithCurrency(job.salary, job.currency)}</span>
          </div>
          {job.posted && (
            <div className="flex items-center gap-2">
              <Calendar className="size-5" />
              <span>Posted {job.posted}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {job.applicationLink ? (
            <Button
              as="link"
              href={job.applicationLink}
              target="_blank"
              className="bg-secondary hover:bg-secondary/90 text-white"
              size="lg"
            >
              Apply Now
            </Button>
          ) : (
            <Button
              className=" text-black! cursor-not-allowed"
              size="lg"
              disabled
            >
              Application Link Not Available
            </Button>
          )}
          <Button as="link" href="/jobs" variant="outline" size="lg">
            Back to Jobs
          </Button>
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-8 bg-white rounded-2xl p-8 border border-gray-200">
        <style jsx global>{`
          .job-description ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin: 1rem 0 !important;
          }
          .job-description ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin: 1rem 0 !important;
          }
          .job-description ul li,
          .job-description ol li {
            margin: 0.5rem 0 !important;
            padding-left: 0.25rem !important;
            display: list-item !important;
          }
          .job-description ul ul {
            list-style-type: circle !important;
            margin: 0.5rem 0 !important;
          }
          .job-description ol ol {
            list-style-type: lower-alpha !important;
            margin: 0.5rem 0 !important;
          }
          .job-description h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 1.5rem 0 1rem 0;
          }
          .job-description h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 1.25rem 0 0.75rem 0;
          }
          .job-description p {
            margin: 0.75rem 0;
            line-height: 1.75;
          }
          .job-description strong {
            font-weight: 700;
          }
        `}</style>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Job Description
          </h2>
          <div
            className="job-description text-gray-600"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </section>

        <div className="pt-8 border-t border-gray-200">
          <div className="bg-secondary/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Number of Openings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {job.openings}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="text-lg font-semibold text-gray-900">
                  {job.category}
                </p>
              </div>
            </div>

            {job.applicationLink && (
              <Button
                as="link"
                href={job.applicationLink}
                target="_blank"
                className="bg-secondary hover:bg-secondary/90 text-white w-full"
                size="lg"
              >
                Apply for this Position
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
