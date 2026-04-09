"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/app/components/form/InputField";
import { WysiwygInput } from "@/app/components/form/WysiwygInput";
import { Button } from "@/app/components/elements/Button";
import { Label } from "@/app/components/elements/Label";
import { jobCategories } from "@/app/data/jobsData";
import { JOB_TYPES } from "../utils/validation";
import { JobFormData, JobFormProps } from "../types";

export const JobForm: React.FC<JobFormProps> = ({
  editingJob,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<JobFormData>();

  const descriptionValue = watch("description") || "";

  useEffect(() => {
    if (editingJob) {
      setValue("title", editingJob.title);
      setValue("company", editingJob.company);
      setValue("location", editingJob.location);
      setValue("type", editingJob.type);
      setValue("salary", editingJob.salary);
      setValue("category", editingJob.category);
      setValue("openings", editingJob.openings);
      setValue("description", editingJob.description);
      setValue("tags", editingJob.tags.join(", "));
      setValue("isUrgent", editingJob.isUrgent);
    }
  }, [editingJob, setValue]);

  // Register description field for validation
  useEffect(() => {
    register("description", { required: "Description is required" });
  }, [register]);

  const handleFormSubmit = (data: JobFormData) => {
    onSubmit(data);
    if (!editingJob) {
      reset();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingJob ? "Edit Job" : "Create New Job"}
        </h2>
        <p className="text-gray-600 mt-1">
          {editingJob
            ? "Update the job details below"
            : "Fill in the details to create a new job posting"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Job Title"
            placeholder="e.g. Senior Software Engineer"
            registration={register("title", {
              required: "Title is required",
            })}
            hasError={errors.title}
            isRequired
          />
          <InputField
            label="Company"
            placeholder="e.g. Tech Innovations Inc."
            registration={register("company", {
              required: "Company is required",
            })}
            hasError={errors.company}
            isRequired
          />
          <InputField
            label="Location"
            placeholder="e.g. Remote, New York, NY"
            registration={register("location", {
              required: "Location is required",
            })}
            hasError={errors.location}
            isRequired
          />
          <div className="w-full">
            <Label htmlFor="type" isRequired>
              Job Type
            </Label>
            <select
              {...register("type", { required: "Type is required" })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select type</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>
          <InputField
            label="Salary Range"
            placeholder="e.g. $120k - $150k"
            registration={register("salary", {
              required: "Salary is required",
            })}
            hasError={errors.salary}
            isRequired
          />
          <div className="w-full">
            <Label htmlFor="category" isRequired>
              Category
            </Label>
            <select
              {...register("category", { required: "Category is required" })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select category</option>
              {jobCategories
                .filter((cat) => cat !== "All Positions")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <InputField
            label="Number of Openings"
            type="number"
            placeholder="e.g. 3"
            registration={register("openings", {
              required: "Openings is required",
              min: 1,
              valueAsNumber: true,
            })}
            hasError={errors.openings}
            isRequired
          />
          <InputField
            label="Tags (comma-separated)"
            placeholder="e.g. React, Node.js, TypeScript"
            registration={register("tags", {
              required: "Tags are required",
            })}
            hasError={errors.tags}
            isRequired
          />
        </div>

        <WysiwygInput
          value={descriptionValue}
          onChange={(value) =>
            setValue("description", value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          label="Job Description"
          placeholder="Enter job description..."
          isRequired
          hasError={errors.description}
        />

        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="isUrgent"
            {...register("isUrgent")}
            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
          />
          <label
            htmlFor="isUrgent"
            className="text-sm font-medium text-gray-700"
          >
            Mark as Urgent (Displays priority badge)
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            {isLoading ? "Saving..." : editingJob ? "Update Job" : "Create Job"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
