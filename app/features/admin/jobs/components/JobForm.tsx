"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { useAutoSave } from "@/app/hooks/useAutoSave";
import { useAutoSaveJob } from "../api";
import { Save, Upload } from "lucide-react";

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
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<JobFormData>();

  const [currentJobId, setCurrentJobId] = useState<number | undefined>(
    editingJob?.id,
  );
  const [submitType, setSubmitType] = useState<"draft" | "publish">("draft");

  const descriptionValue = watch("description") || "";
  const formData = watch();

  const { mutateAsync: autoSaveJob } = useAutoSaveJob();

  // Auto-save callback
  const handleAutoSave = useCallback(
    async (data: JobFormData) => {
      // Only auto-save if form has any meaningful data
      const hasData =
        data.title ||
        data.company ||
        data.location ||
        data.description ||
        data.type ||
        data.salary;

      if (!hasData) return;

      const jobData = {
        id: currentJobId,
        title: data.title,
        company: data.company || "",
        location: data.location || "",
        type: data.type || "",
        modeOfWork: data.modeOfWork || "",
        salary: data.salary || "",
        currency: data.currency || "USD",
        category: data.category?.map((cat) => cat.name) || [],
        openings: Number(data.openings) || 1,
        description: data.description || "",
        tags: data.tags?.map((tag) => tag.name) || [],
        isUrgent: data.isUrgent || false,
        applicationLink: data.applicationLink || "",
        status: "DRAFT",
      };

      try {
        const response = await autoSaveJob(jobData);
        // Update currentJobId if this was a new draft
        if (!currentJobId && response.data?.id) {
          setCurrentJobId(response.data.id);
        }
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    },
    [currentJobId, autoSaveJob],
  );

  // Use auto-save hook
  const { isSaving, lastSaved } = useAutoSave({
    data: formData,
    onSave: handleAutoSave,
    delay: 30000, // 30 seconds
    enabled: isDirty && !isLoading,
  });

  // Convert categories to Option format
  const categoryOptions: Option[] = useMemo(
    () =>
      jobCategories
        .filter((cat) => cat !== "All Positions")
        .map((cat, index) => ({
          id: `cat-${index}`,
          name: cat,
        })),
    [],
  );

  // Convert tags to Option format
  const tagOptions: Option[] = useMemo(
    () =>
      COMMON_JOB_TAGS.map((tag, index) => ({
        id: `tag-${index}`,
        name: tag,
      })),
    [],
  );

  useEffect(() => {
    if (editingJob) {
      setCurrentJobId(editingJob.id);
      setValue("title", editingJob.title);
      setValue("company", editingJob.company);
      setValue("location", editingJob.location);
      setValue("type", editingJob.type);
      setValue("modeOfWork", editingJob.modeOfWork);
      setValue("salary", editingJob.salary);
      setValue("currency", editingJob.currency || "USD");

      // Convert category array to Option[] - match with categoryOptions
      const categoryValues: Option[] = editingJob.category
        .map((cat) => categoryOptions.find((opt) => opt.name === cat))
        .filter((opt): opt is Option => opt !== undefined);
      setValue("category", categoryValues);

      setValue("openings", editingJob.openings);
      setValue("description", editingJob.description);

      // Convert tags array to Option[] - match with tagOptions or create new
      const tagValues: Option[] = editingJob.tags.map((tag) => {
        const existingOption = tagOptions.find((opt) => opt.name === tag);
        return existingOption || { id: `custom-${tag}`, name: tag };
      });
      setValue("tags", tagValues);

      setValue("isUrgent", editingJob.isUrgent);
      setValue("applicationLink", editingJob.applicationLink || "");
    }
  }, [editingJob, setValue, categoryOptions, tagOptions]);

  // Register description field for validation
  useEffect(() => {
    register("description", { required: "Description is required" });
  }, [register]);

  const handleFormSubmit = (data: JobFormData) => {
    onSubmit({
      ...data,
      status: submitType === "publish" ? "PUBLISHED" : "DRAFT",
    } as JobFormData);
    if (!editingJob && submitType === "publish") {
      reset();
      setCurrentJobId(undefined);
    }
  };

  const handleSaveAsDraft = () => {
    setSubmitType("draft");
    const data = getValues();
    onSubmit({ ...data, status: "DRAFT" } as JobFormData);
  };

  const isDraft = editingJob?.status === "DRAFT";

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingJob ? "Edit Job" : "Create New Job"}
              {isDraft && (
                <span className="ml-3 text-sm font-normal px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h2>
            <p className="text-gray-600 mt-1">
              {editingJob
                ? "Update the job details below"
                : "Fill in the details to create a new job posting"}
            </p>
          </div>
          {(isSaving || lastSaved) && (
            <div className="flex items-center gap-2 text-sm">
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary"></div>
                  <span className="text-gray-600">Saving...</span>
                </>
              ) : (
                lastSaved && (
                  <>
                    <Save className="size-4 text-green-600" />
                    <span className="text-gray-600">
                      Saved at {lastSaved.toLocaleTimeString()}
                    </span>
                  </>
                )
              )}
            </div>
          )}
        </div>
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
          {isDraft || !editingJob ? (
            <>
              <Button
                type="button"
                disabled={isLoading}
                onClick={handleSaveAsDraft}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                {isLoading && submitType === "draft" ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="size-4 mr-2" />
                    Save as Draft
                  </>
                )}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => setSubmitType("publish")}
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                {isLoading && submitType === "publish" ? (
                  "Publishing..."
                ) : (
                  <>
                    <Upload className="size-4 mr-2" />
                    {isDraft ? "Publish Job" : "Create & Publish"}
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => setSubmitType("publish")}
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              {isLoading ? "Updating..." : "Update Job"}
            </Button>
          )}
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
