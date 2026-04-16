"use client";

import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { InputField } from "@/app/components/form/InputField";
import { WysiwygInput } from "@/app/components/form/WysiwygInput";
import { SelectFieldWithInput } from "@/app/components/form/SelectFieldWithInput";
import { Button } from "@/app/components/elements/Button";
import { Label } from "@/app/components/elements/Label";
import { jobCategories } from "@/app/data/jobsData";
import {
  JOB_TYPES,
  MODE_OF_WORK,
  CURRENCIES,
  COMMON_JOB_TAGS,
} from "../utils/validation";
import { JobFormData, JobFormProps } from "../types";
import { Option } from "@/app/types";

export const JobForm: React.FC<JobFormProps> = ({
  editingJob,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<JobFormData>();

  const descriptionValue = watch("description") || "";

  // Convert categories to Option format
  const categoryOptions: Option[] = jobCategories
    .filter((cat) => cat !== "All Positions")
    .map((cat) => ({
      id: cat.toLowerCase().replace(/\s+/g, "-"),
      name: cat,
    }));

  // Convert tags to Option format
  const tagOptions: Option[] = COMMON_JOB_TAGS.map((tag) => ({
    id: tag.toLowerCase().replace(/\s+/g, "-"),
    name: tag,
  }));

  useEffect(() => {
    if (editingJob) {
      setValue("title", editingJob.title);
      setValue("company", editingJob.company);
      setValue("location", editingJob.location);
      setValue("type", editingJob.type);
      setValue("modeOfWork", editingJob.modeOfWork);
      setValue("salary", editingJob.salary);
      setValue("currency", editingJob.currency || "USD");

      // Convert category array to Option[]
      const categoryValues: Option[] = editingJob.category.map((cat) => ({
        id: cat.toLowerCase().replace(/\s+/g, "-"),
        name: cat,
      }));
      setValue("category", categoryValues);

      setValue("openings", editingJob.openings);
      setValue("description", editingJob.description);

      // Convert tags array to Option[]
      const tagValues: Option[] = editingJob.tags.map((tag) => ({
        id: tag.toLowerCase().replace(/\s+/g, "-"),
        name: tag,
      }));
      setValue("tags", tagValues);

      setValue("isUrgent", editingJob.isUrgent);
      setValue("applicationLink", editingJob.applicationLink || "");
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
            label="Industry"
            placeholder="e.g. Technology, Healthcare, Finance"
            registration={register("company", {
              required: "Industry is required",
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
          <div className="w-full">
            <Label htmlFor="modeOfWork" isRequired>
              Mode of Work
            </Label>
            <select
              {...register("modeOfWork", {
                required: "Mode of work is required",
              })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select mode of work</option>
              {MODE_OF_WORK.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            {errors.modeOfWork && (
              <p className="text-red-500 text-xs mt-1">
                {errors.modeOfWork.message}
              </p>
            )}
          </div>
          <InputField
            label="Salary Range"
            placeholder="e.g. 120k - 150k"
            registration={register("salary", {
              required: "Salary is required",
            })}
            hasError={errors.salary}
            isRequired
          />
          <div className="w-full">
            <Label htmlFor="currency" isRequired>
              Currency
            </Label>
            <select
              {...register("currency", {
                required: "Currency is required",
              })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select currency</option>
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
            {errors.currency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currency.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Label isRequired>Category</Label>
            <SelectFieldWithInput
              name="category"
              control={control as unknown as Control}
              arr={categoryOptions}
              placeholder="Select categories"
              isMultiple={true}
              hasError={errors.category}
              rules={{ required: "At least one category is required" }}
            />
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
          <div className="w-full">
            <Label>Tags/Skills</Label>
            <SelectFieldWithInput
              name="tags"
              control={control as unknown as Control}
              arr={tagOptions}
              placeholder="Select or type to add tags"
              isMultiple={true}
              hasError={errors.tags}
              onCreateNew={(query) => {
                const currentTags = watch("tags") || [];
                const newTag: Option = {
                  id: query.toLowerCase().replace(/\s+/g, "-"),
                  name: query,
                };
                setValue("tags", [...currentTags, newTag]);
              }}
              isNewChecker={(query) => {
                const currentOptions = [
                  ...tagOptions,
                  ...(watch("tags") || []),
                ];
                return !currentOptions.some(
                  (opt) => opt.name.toLowerCase() === query.toLowerCase(),
                );
              }}
            />
          </div>
        </div>

        <InputField
          label="Application Link (Google Form or External URL)"
          placeholder="e.g. https://forms.google.com/..."
          registration={register("applicationLink", {
            required: "Application link is required",
          })}
          hasError={errors.applicationLink}
        />

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
