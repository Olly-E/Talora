"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { InputField } from "@/app/components/form/InputField";
import { TextAreaField } from "@/app/components/form/TextAreaField";
import { WysiwygInput } from "@/app/components/form/WysiwygInput";
import { SelectFieldWithInput } from "@/app/components/form/SelectFieldWithInput";
import { Button } from "@/app/components/elements/Button";
import { Label } from "@/app/components/elements/Label";
import { useUploadImage } from "../../article/api";
import toast from "react-hot-toast";
import { CaseStudyFormData, CaseStudyFormProps } from "../types";
import {
  CASE_STUDY_PLACEHOLDER_IMAGE,
  CASE_STUDY_INDUSTRIES,
  COMMON_CASE_STUDY_TAGS,
} from "../utils/constants";
import { Option } from "@/app/types";

export const CaseStudyForm: React.FC<CaseStudyFormProps> = ({
  editingCaseStudy,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<string[]>([""]);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CaseStudyFormData>();

  const coverImageValue = watch("coverImage");
  const challengeValue = watch("challenge") || "";
  const solutionValue = watch("solution") || "";

  // Convert tags to Option format
  const tagOptions: Option[] = COMMON_CASE_STUDY_TAGS.map((tag) => ({
    id: tag.toLowerCase().replace(/\s+/g, "-"),
    name: tag,
  }));

  // Register WYSIWYG fields for validation
  useEffect(() => {
    register("challenge", { required: "Challenge is required" });
    register("solution", { required: "Solution is required" });
  }, [register]);

  useEffect(() => {
    if (editingCaseStudy) {
      setValue("title", editingCaseStudy.title);
      setValue("client", editingCaseStudy.client);
      setValue("industry", editingCaseStudy.industry);
      setValue("description", editingCaseStudy.description);
      setValue("challenge", editingCaseStudy.challenge);
      setValue("solution", editingCaseStudy.solution);
      setValue("coverImage", editingCaseStudy.coverImage);
      setValue("featured", editingCaseStudy.featured);

      // Set results
      setResults(
        editingCaseStudy.results.length > 0 ? editingCaseStudy.results : [""],
      );

      // Convert tags array to Option[]
      const tagValues: Option[] = editingCaseStudy.tags.map((tag) => ({
        id: tag.toLowerCase().replace(/\s+/g, "-"),
        name: tag,
      }));
      setValue("tags", tagValues);

      setUploadedImageUrl(editingCaseStudy.coverImage);
    }
  }, [editingCaseStudy, setValue]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    uploadImage(selectedFile, {
      onSuccess: (data) => {
        setUploadedImageUrl(data.url);
        setValue("coverImage", data.url);
        setSelectedFile(null);
        toast.success("Image uploaded successfully!");
      },
    });
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl("");
    setValue("coverImage", "");
    setSelectedFile(null);
  };

  const addResult = () => {
    setResults([...results, ""]);
  };

  const removeResult = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    setResults(newResults.length > 0 ? newResults : [""]);
  };

  const updateResult = (index: number, value: string) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };

  const handleFormSubmit = (data: CaseStudyFormData) => {
    // Filter out empty results
    const filteredResults = results.filter((r) => r.trim() !== "");

    if (filteredResults.length === 0) {
      toast.error("Please add at least one result");
      return;
    }

    onSubmit({ ...data, results: filteredResults });
    if (!editingCaseStudy) {
      reset();
      setUploadedImageUrl("");
      setSelectedFile(null);
      setResults([""]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingCaseStudy ? "Edit Case Study" : "Create New Case Study"}
        </h2>
        <p className="text-gray-600 mt-1">
          {editingCaseStudy
            ? "Update the case study details below"
            : "Fill in the details to create a new case study"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title"
            placeholder="e.g., Revolutionizing Recruitment for Tech Startup"
            hasError={errors.title}
            isRequired
            registration={register("title", { required: "Title is required" })}
          />

          <InputField
            label="Client Name"
            placeholder="e.g., TechFlow Solutions"
            hasError={errors.client}
            isRequired
            registration={register("client", {
              required: "Client name is required",
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="industry" isRequired>
              Industry
            </Label>
            <select
              id="industry"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              {...register("industry", { required: "Industry is required" })}
            >
              <option value="">Select an industry</option>
              {CASE_STUDY_INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              id="featured"
              className="size-5 rounded border-gray-300 text-secondary focus:ring-secondary"
              {...register("featured")}
            />
            <Label htmlFor="featured" className="mb-0">
              Featured Case Study
            </Label>
          </div>
        </div>

        <TextAreaField
          id="description"
          label="Description"
          placeholder="Brief overview of the case study..."
          rows={3}
          hasError={errors.description}
          isRequired
          registration={register("description", {
            required: "Description is required",
          })}
        />

        {/* Cover Image */}
        <div>
          <Label isRequired>Cover Image</Label>
          <div className="mt-2 space-y-4">
            {uploadedImageUrl || coverImageValue ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={
                    uploadedImageUrl ||
                    coverImageValue ||
                    CASE_STUDY_PLACEHOLDER_IMAGE
                  }
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="size-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-secondary font-medium hover:underline"
                >
                  Choose a file
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  or drag and drop (max 5MB)
                </p>
              </div>
            )}

            {selectedFile && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 flex-1">
                  {selectedFile.name}
                </span>
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="bg-secondary hover:bg-secondary/90 text-white"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            )}
          </div>
          {errors.coverImage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.coverImage.message}
            </p>
          )}
          <input
            type="hidden"
            {...register("coverImage", { required: "Cover image is required" })}
          />
        </div>

        <WysiwygInput
          label="The Challenge"
          placeholder="Describe the challenge the client was facing..."
          value={challengeValue}
          onChange={(value) => setValue("challenge", value)}
          isRequired
          hasError={errors.challenge}
        />

        <WysiwygInput
          label="Our Solution"
          placeholder="Explain the solution you provided..."
          value={solutionValue}
          onChange={(value) => setValue("solution", value)}
          isRequired
          hasError={errors.solution}
        />

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label isRequired>Key Results</Label>
            <Button
              type="button"
              onClick={addResult}
              className="bg-primary hover:bg-primary/90 text-white text-sm px-3 py-1 flex items-center gap-1"
            >
              <Plus className="size-4" />
              Add Result
            </Button>
          </div>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={result}
                  onChange={(e) => updateResult(index, e.target.value)}
                  placeholder={`Result ${index + 1} (e.g., Reduced time-to-hire from 45 to 18 days)`}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {results.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResult(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <SelectFieldWithInput
            placeholder="Select or create tags..."
            control={control as any}
            name="tags"
            arr={tagOptions}
            isMultiple
            onCreateNew={(value) => {
              const newTag: Option = {
                id: value.toLowerCase().replace(/\s+/g, "-"),
                name: value,
              };
              return newTag;
            }}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            {isLoading
              ? editingCaseStudy
                ? "Updating..."
                : "Creating..."
              : editingCaseStudy
                ? "Update Case Study"
                : "Create Case Study"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
