"use client";

import React, { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { InputField } from "@/app/components/form/InputField";
import { TextAreaField } from "@/app/components/form/TextAreaField";
import { WysiwygInput } from "@/app/components/form/WysiwygInput";
import { SelectFieldWithInput } from "@/app/components/form/SelectFieldWithInput";
import { Button } from "@/app/components/elements/Button";
import { Label } from "@/app/components/elements/Label";
import { articleCategories } from "@/app/data/articlesData";
import { generateSlug } from "../utils/helpers";
import { useUploadImage } from "../api";
import toast from "react-hot-toast";
import { ArticleFormData, ArticleFormProps } from "../types";
import {
  ARTICLE_PLACEHOLDER_IMAGE,
  COMMON_ARTICLE_TAGS,
} from "../utils/constants";
import { Option } from "@/app/types";

import team5 from "../../../../../public/images/team5.webp";
import team6 from "../../../../../public/images/team6.jpeg";
import { StaticImageData } from "next/image";

const AUTHORS: { name: string; image: StaticImageData }[] = [
  { name: "Adlaide O.J", image: team6 },
  { name: "Victoria James", image: team5 },
];

export const ArticleForm: React.FC<ArticleFormProps> = ({
  editingArticle,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ArticleFormData>();

  const titleValue = watch("title");
  const coverImageValue = watch("coverImage");
  const contentValue = watch("content") || "";

  // Convert tags to Option format
  const tagOptions: Option[] = COMMON_ARTICLE_TAGS.map((tag) => ({
    id: tag.toLowerCase().replace(/\s+/g, "-"),
    name: tag,
  }));

  useEffect(() => {
    if (titleValue && !editingArticle) {
      const slug = generateSlug(titleValue);
      setValue("slug", slug);
    }
  }, [titleValue, editingArticle, setValue]);

  // Register content field for validation
  useEffect(() => {
    register("content", { required: "Content is required" });
  }, [register]);

  useEffect(() => {
    if (editingArticle) {
      setValue("title", editingArticle.title);
      setValue("slug", editingArticle.slug);
      setValue("author", editingArticle.author);
      setValue("category", editingArticle.category);
      setValue("excerpt", editingArticle.excerpt);
      setValue("content", editingArticle.content);
      setValue("coverImage", editingArticle.coverImage);
      setValue("readTime", editingArticle.readTime);

      // Convert tags array to Option[]
      const tagValues: Option[] = editingArticle.tags.map((tag) => ({
        id: tag.toLowerCase().replace(/\s+/g, "-"),
        name: tag,
      }));
      setValue("tags", tagValues);

      setValue("featured", editingArticle.featured);
      setUploadedImageUrl(editingArticle.coverImage);
    }
  }, [editingArticle, setValue]);

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

  const handleFormSubmit = (data: ArticleFormData) => {
    onSubmit(data);
    if (!editingArticle) {
      reset();
      setUploadedImageUrl("");
      setSelectedFile(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingArticle ? "Edit Article" : "Create New Article"}
        </h2>
        <p className="text-gray-600 mt-1">
          {editingArticle
            ? "Update the article details below"
            : "Fill in the details to create a new article"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Article Title"
            placeholder="e.g. The Future of HR Automation"
            registration={register("title", {
              required: "Title is required",
            })}
            hasError={errors.title}
            isRequired
          />
          <input
            type="hidden"
            {...register("slug", {
              required: "Slug is required",
            })}
          />
          <div className="w-full">
            <Label htmlFor="author" isRequired>
              Author
            </Label>
            <select
              {...register("author", {
                required: "Author is required",
              })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select author</option>
              {AUTHORS.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">
                {errors.author.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="category" isRequired>
              Category
            </Label>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="h-[38px] rounded-[5px] w-full border border-[#444444]/20 font-WorkSans px-4 bg-white outline-none text-sm text-black disabled:bg-gray-100"
            >
              <option value="">Select category</option>
              {articleCategories
                .filter((cat) => cat !== "All Articles")
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
            label="Cover Image URL"
            placeholder="Leave empty to use placeholder image"
            registration={register("coverImage")}
            hasError={errors.coverImage}
          />
          <InputField
            label="Read Time"
            placeholder="e.g. 5 min read"
            registration={register("readTime", {
              required: "Read time is required",
            })}
            hasError={errors.readTime}
            isRequired
          />
        </div>

        <div className="space-y-3">
          <Label>Upload Cover Image (Optional)</Label>
          <div className="flex flex-col gap-3">
            {uploadedImageUrl || coverImageValue ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={
                    uploadedImageUrl?.trim() ||
                    coverImageValue?.trim() ||
                    ARTICLE_PLACEHOLDER_IMAGE
                  }
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-secondary hover:file:bg-primary/90"
                />
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="bg-secondary hover:bg-secondary/90 text-white"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="size-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            )}
            <p className="text-xs text-gray-500">
              Upload an image or enter a URL above. Leave empty to use default
              placeholder. Max file size: 5MB
            </p>
          </div>
        </div>

        <div className="w-full">
          <Label>Tags</Label>
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
              const currentOptions = [...tagOptions, ...(watch("tags") || [])];
              return !currentOptions.some(
                (opt) => opt.name.toLowerCase() === query.toLowerCase(),
              );
            }}
          />
          {errors.tags && (
            <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
          )}
        </div>

        <TextAreaField
          id="excerpt"
          label="Excerpt"
          placeholder="Brief summary of the article..."
          rows={3}
          registration={register("excerpt", {
            required: "Excerpt is required",
          })}
          hasError={errors.excerpt}
          isRequired
        />

        <WysiwygInput
          value={contentValue}
          onChange={(value) =>
            setValue("content", value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          label="Article Content"
          placeholder="Enter full article content..."
          isRequired
          hasError={errors.content}
        />

        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="featured"
            {...register("featured")}
            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-gray-700"
          >
            Mark as Featured (Displays on homepage)
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            {isLoading
              ? "Saving..."
              : editingArticle
                ? "Update Article"
                : "Create Article"}
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
