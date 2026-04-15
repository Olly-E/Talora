"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { CaseStudyForm } from "@/app/features/admin/case-study/components";
import {
  useGetCaseStudies,
  useCreateCaseStudy,
} from "@/app/features/admin/case-study/api";
import { CaseStudyFormData } from "@/app/features/admin/case-study/types";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDY_PLACEHOLDER_IMAGE } from "@/app/features/admin/case-study/utils/constants";

export default function CaseStudiesPage() {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const { data: caseStudies = [], isLoading } = useGetCaseStudies();
  const { mutate: createCaseStudy, isPending: isCreating } =
    useCreateCaseStudy();

  const filteredCaseStudies = caseStudies.filter((cs) => {
    const matchesSearch =
      cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || cs.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const industries = ["All", ...new Set(caseStudies.map((cs) => cs.industry))];

  const handleCreateCaseStudy = (data: CaseStudyFormData) => {
    const payload = {
      ...data,
      tags: data.tags?.map((tag) => tag.name) || [],
    };

    createCaseStudy(payload, {
      onSuccess: () => {
        toast.success("Case study created successfully!");
        setShowCreateForm(false);
        router.push("/godmode/dashboard/case-studies");
      },
      onError: () => {
        toast.error("Failed to create case study");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl! font-semibold! text-gray-900">
            Case Studies
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage your client success stories
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2"
        >
          <Plus className="size-4" />
          {showCreateForm ? "Cancel" : "Create Case Study"}
        </Button>
      </div>

      {showCreateForm && (
        <CaseStudyForm
          onSubmit={handleCreateCaseStudy}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isCreating}
        />
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by title or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.map((caseStudy) => {
          const coverImage = caseStudy.coverImage?.trim();
          const isValidUrl =
            coverImage &&
            (coverImage.startsWith("http://") ||
              coverImage.startsWith("https://"));
          const imageSrc = isValidUrl
            ? coverImage
            : CASE_STUDY_PLACEHOLDER_IMAGE;

          return (
            <Link
              key={caseStudy.id}
              href={`/godmode/dashboard/case-studies/${caseStudy.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="relative h-48">
                <Image
                  src={imageSrc}
                  alt={caseStudy.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {caseStudy.featured && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-secondary">
                    {caseStudy.client}
                  </span>
                  <span className="text-xs bg-primary/20 text-secondary px-2 py-1 rounded-full">
                    {caseStudy.industry}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {caseStudy.description}
                </p>
                <div className="text-sm text-gray-500">
                  {caseStudy.results.length} key results
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredCaseStudies.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No case studies found</p>
        </div>
      )}
    </div>
  );
}
