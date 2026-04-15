"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  Tag,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { CaseStudyForm } from "@/app/features/admin/case-study/components";
import {
  useGetCaseStudies,
  useUpdateCaseStudy,
  useDeleteCaseStudy,
} from "@/app/features/admin/case-study/api";
import { CaseStudyFormData } from "@/app/features/admin/case-study/types";
import { CASE_STUDY_PLACEHOLDER_IMAGE } from "@/app/features/admin/case-study/utils/constants";
import toast from "react-hot-toast";
import { getFormattedDate } from "@/app/utils/utils";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseStudyId = Number(params.id);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: caseStudies = [], isLoading } = useGetCaseStudies();
  const { mutate: updateCaseStudy, isPending: isUpdating } =
    useUpdateCaseStudy();
  const { mutate: deleteCaseStudy, isPending: isDeleting } =
    useDeleteCaseStudy();

  const caseStudy = caseStudies.find((cs) => cs.id === caseStudyId);

  const handleFormSubmit = (data: CaseStudyFormData) => {
    const payload = {
      ...data,
      tags: data.tags?.map((tag) => tag.name) || [],
      id: caseStudyId,
    };

    updateCaseStudy(payload, {
      onSuccess: () => {
        toast.success("Case study updated successfully!");
        setShowEditForm(false);
      },
      onError: () => {
        toast.error("Failed to update case study");
      },
    });
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this case study? This action cannot be undone.",
      )
    ) {
      deleteCaseStudy(caseStudyId, {
        onSuccess: () => {
          toast.success("Case study deleted successfully!");
          router.push("/godmode/dashboard/case-studies");
        },
        onError: () => {
          toast.error("Failed to delete case study");
        },
      });
    }
  };

  const coverImage = caseStudy?.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : CASE_STUDY_PLACEHOLDER_IMAGE;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Case Study Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The case study you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-end gap-3">
        <div className="flex gap-3">
          <Button
            onClick={() => setShowEditForm(!showEditForm)}
            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
          >
            <Edit className="size-4" />
            {showEditForm ? "Cancel Edit" : "Edit Case Study"}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="size-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors bg-transparent hover:bg-transparent"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Case Studies</span>
        </Button>
      </div>

      {showEditForm && (
        <CaseStudyForm
          editingCaseStudy={caseStudy}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowEditForm(false)}
          isLoading={isUpdating}
        />
      )}

      <div className="relative bg-linear-to-br from-primary/10 via-white to-tertiary/10 rounded-3xl overflow-hidden border-2 border-primary/20">
        <div className="relative h-96">
          <Image
            src={imageSrc}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute top-6 left-6 flex gap-2">
            {caseStudy.featured && (
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                <Star className="size-4 fill-current" />
                Featured
              </span>
            )}
            <span className="px-4 py-2 bg-white/90 backdrop-blur text-secondary text-sm font-semibold rounded-full shadow-lg">
              {caseStudy.industry}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="size-6" />
              <span className="text-xl font-semibold">{caseStudy.client}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
              {caseStudy.title}
            </h1>
            <p className="text-sm">
              Published {getFormattedDate(caseStudy.publishedAt)}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-base text-gray-700 leading-relaxed italic border-l-4 border-primary pl-6">
              {caseStudy.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                The Challenge
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
              />
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Our Solution
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="size-6 text-green-500" />
              Key Results
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-green-50 rounded-lg p-4 border border-green-200"
                >
                  <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-800 font-medium">{result}</p>
                </div>
              ))}
            </div>
          </div>

          {caseStudy.tags.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="size-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/20 text-secondary text-sm font-semibold rounded-xl border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
