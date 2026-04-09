"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Building2,
  AlertCircle,
  ArrowLeft,
  Edit,
} from "lucide-react";
import { useGetJobs, useUpdateJob } from "@/app/features/admin/jobs/api";
import { Button } from "@/app/components/elements/Button";
import { JobForm } from "@/app/features/admin/jobs/components";
import { JobFormData } from "@/app/features/admin/jobs/types";
import { getFormattedDate } from "@/app/utils/utils";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: jobs = [], isLoading } = useGetJobs();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const job = jobs.find((j) => j.id === jobId);

  const handleFormSubmit = (data: JobFormData) => {
    const jobData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      openings: Number(data.openings),
    };

    updateJob(
      { ...jobData, id: jobId },
      {
        onSuccess: () => {
          setShowEditForm(false);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The job you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors bg-transparent hover:bg-transparent"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Jobs</span>
        </Button>
        <Button
          onClick={() => setShowEditForm(!showEditForm)}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
        >
          <Edit className="size-4" />
          {showEditForm ? "Cancel Edit" : "Edit Job"}
        </Button>
      </div>

      {showEditForm && (
        <JobForm
          editingJob={job}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowEditForm(false)}
          isLoading={isUpdating}
        />
      )}

      <div className="relative bg-gradient-to-br from-primary/10 via-white to-tertiary/10 rounded-3xl p-8 border-2 border-primary/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary/10 rounded-full -ml-24 -mb-24" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-secondary rounded-2xl">
                <Building2 className="size-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {job.isUrgent && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      <AlertCircle className="size-3" />
                      Urgent Hiring
                    </span>
                  )}
                  <span className="px-3 py-1 bg-primary text-secondary text-xs font-semibold rounded-full">
                    {job.category}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-base text-gray-700 font-medium">
                  {job.company}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="size-5 text-tertiary" />
                <span className="text-xs text-gray-500 font-medium">
                  Location
                </span>
              </div>
              <p className="text-gray-900 font-semibold">{job.location}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="size-5 text-tertiary" />
                <span className="text-xs text-gray-500 font-medium">
                  Job Type
                </span>
              </div>
              <p className="text-gray-900 font-semibold">{job.type}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-5 text-secondary" />
                <span className="text-xs text-gray-500 font-medium">
                  Salary Range
                </span>
              </div>
              <p className="text-gray-900 font-semibold">{job.salary}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="size-5 text-secondary" />
                <span className="text-xs text-gray-500 font-medium">
                  Openings
                </span>
              </div>
              <p className="text-gray-900 font-semibold">
                {job.openings} {job.openings === 1 ? "Position" : "Positions"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Job Description
        </h2>
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Required Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-primary/20 to-tertiary/20 text-secondary text-sm font-semibold rounded-xl border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-secondary/5 to-tertiary/5 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Posted on</p>
            <p className="text-gray-900 font-semibold">
              {job?.posted ? getFormattedDate(job.posted) : "N/A"}
            </p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
