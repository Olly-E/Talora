"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { InputField } from "./form/InputField";
import { TextAreaField } from "./form/TextAreaField";
import { Button } from "./elements/Button";
import toast from "react-hot-toast";

interface CVUploadFormData {
  name: string;
  email: string;
  desiredJobTitle: string;
  importantInfo: string;
}

interface CVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVUploadModal({ isOpen, onClose }: CVUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedCvUrl, setUploadedCvUrl] = useState<string>("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CVUploadFormData>();

  const importantInfoValue = watch("importantInfo");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF, DOC, DOCX)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setIsUploadingFile(true);

    try {
      // Upload CV to Cloudinary immediately
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/talent-pool/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload CV");
      }

      const { url: cvUrl } = await uploadResponse.json();
      setUploadedCvUrl(cvUrl);
      toast.success("CV uploaded successfully!");
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error("Failed to upload CV. Please try again.");
      setSelectedFile(null);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const onSubmit = async (data: CVUploadFormData) => {
    if (!uploadedCvUrl) {
      toast.error("Please upload your CV");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit talent pool entry with already uploaded CV URL
      const submitResponse = await fetch("/api/talent-pool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          cvUrl: uploadedCvUrl,
        }),
      });

      if (!submitResponse.ok) {
        throw new Error("Failed to submit application");
      }

      toast.success("Your application has been submitted successfully!");
      reset();
      setSelectedFile(null);
      setUploadedCvUrl("");
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isUploadingFile && !isSubmitting) {
      reset();
      setSelectedFile(null);
      setUploadedCvUrl("");
      onClose();
    }
  };

  return (
    <Modal showDialog={isOpen} closeModal={handleClose} variant="middle">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Join Our Talent Pool
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload your CV and we&apos;ll match you with opportunities
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isUploadingFile || isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Name Field */}
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              isRequired
              registration={register("name", {
                required: "Name is required",
              })}
              hasError={errors.name}
              errorMessage={errors.name?.message}
            />

            {/* Email Field */}
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              isRequired
              registration={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              hasError={errors.email}
              errorMessage={errors.email?.message}
            />

            {/* Desired Job Title */}
            <InputField
              label="Desired Job Title"
              type="text"
              placeholder="e.g., Senior Software Engineer"
              isRequired
              registration={register("desiredJobTitle", {
                required: "Desired job title is required",
              })}
              hasError={errors.desiredJobTitle}
              errorMessage={errors.desiredJobTitle?.message}
            />

            {/* Important Info */}
            <TextAreaField
              id="importantInfo"
              label="Additional Information"
              placeholder="Share any important details about your experience, skills, or what you're looking for..."
              rows={4}
              limit={500}
              value={importantInfoValue}
              registration={register("importantInfo")}
              hasError={errors.importantInfo}
            />

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CV/Resume <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={isUploadingFile || isSubmitting}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className={`flex flex-col items-center justify-center w-full min-h-32 py-6 px-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    uploadedCvUrl
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-secondary bg-gray-50 hover:bg-gray-100"
                  } ${isUploadingFile || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isUploadingFile ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="size-8 text-secondary animate-spin mb-2" />
                      <p className="text-sm font-medium text-gray-600">
                        Uploading CV...
                      </p>
                    </div>
                  ) : uploadedCvUrl ? (
                    <div className="flex flex-col items-center w-full">
                      <Upload className="size-8 text-green-600 mb-2" />
                      <p className="text-sm font-medium text-green-600 text-center truncate max-w-full px-2">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedFile &&
                          (selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                        MB
                      </p>
                      <p className="text-xs text-green-600 mt-2 font-semibold">
                        ✓ Uploaded Successfully
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="size-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isUploadingFile || isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isUploadingFile || isSubmitting || !uploadedCvUrl}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
