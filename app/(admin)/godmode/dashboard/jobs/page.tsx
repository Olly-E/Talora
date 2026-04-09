"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { Job } from "@/app/data/jobsData";
import {
  useGetJobs,
  useCreateJob,
  useUpdateJob,
  useDeleteJob,
} from "@/app/features/admin/jobs/api";
import {
  JobForm,
  JobCard,
  JobFilter,
  JobFilters,
} from "@/app/features/admin/jobs/components";
import { JobFormData } from "@/app/features/admin/jobs/types";

const initialFilters: JobFilters = {
  search: "",
  category: "",
  type: "",
  isUrgent: null,
};

export default function JobsPage() {
  const router = useRouter();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const { data: jobs = [], isLoading } = useGetJobs();
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob } = useDeleteJob();

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
  }, [jobs, filters]);

  const handleFormSubmit = (data: JobFormData) => {
    const jobData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      openings: Number(data.openings),
    };

    if (editingJob) {
      updateJob(
        { ...jobData, id: editingJob.id },
        {
          onSuccess: () => {
            setEditingJob(null);
            setShowForm(false);
          },
        },
      );
    } else {
      createJob(jobData, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    deleteJob(id, {
      onSuccess: () => {
        // Ensure we stay on the jobs list page after deletion
        router.push("/godmode/dashboard/jobs");
      },
    });
  };

  const handleCancel = () => {
    setEditingJob(null);
    setShowForm(false);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const isFormLoading = isCreating || isUpdating;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl! font-semibold! text-gray-900">
          Jobs Management
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl! font-semibold! text-gray-900">
            Jobs Management
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage all job postings and openings
          </p>
        </div>
        <div className="flex justify-end md:justify-start">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondary hover:bg-secondary/90 text-white flex items-center whitespace-nowrap"
          >
            {showForm ? (
              <>
                <X className="size-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="size-4 mr-2" />
                Create New Job
              </>
            )}
          </Button>
        </div>
      </div>

      {showForm && (
        <JobForm
          editingJob={editingJob}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={isFormLoading}
        />
      )}

      <JobFilter
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <p className="text-sm text-gray-600 font-medium mb-1">Total Jobs</p>
          <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
        </div>
        <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
          <p className="text-sm text-gray-600 font-medium mb-1">
            Filtered Results
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {filteredJobs.length}
          </p>
        </div>
        <div className="bg-linear-to-br from-tertiary/10 to-tertiary/5 rounded-2xl p-6 border border-tertiary/20">
          <p className="text-sm text-gray-600 font-medium mb-1">
            Urgent Positions
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {jobs.filter((j) => j.isUrgent).length}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          All Jobs ({filteredJobs.length})
        </h2>
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg mb-2">No jobs found</p>
            <p className="text-gray-400 text-sm">
              {jobs.length === 0
                ? "Create your first job posting to get started"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
