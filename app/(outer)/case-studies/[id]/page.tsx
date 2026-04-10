"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import {
  Building2,
  TrendingUp,
  CheckCircle,
  Tag,
  Star,
  AlertCircle,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { usePublicCaseStudies } from "@/app/hooks/usePublicCaseStudies";
import { getFormattedDate } from "@/app/utils/utils";

const CASE_STUDY_PLACEHOLDER_IMAGE =
  "https://img.freepik.com/free-photo/business-people-working-together_23-2148388768.jpg";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const caseStudySlug = params.id as string;

  const { data: caseStudies = [], isLoading } = usePublicCaseStudies();

  const caseStudy = useMemo(() => {
    return caseStudies.find((cs) => cs.slug === caseStudySlug) || null;
  }, [caseStudies, caseStudySlug]);

  const coverImage = caseStudy?.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : CASE_STUDY_PLACEHOLDER_IMAGE;

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-5xl">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-5xl">
        <div className="text-center min-h-96 flex flex-col items-center justify-center">
          <AlertCircle className="size-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Case Study Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The case study you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Button as="link" href="/case-studies" variant="secondary">
            Browse All Case Studies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto py-12 px-6 max-w-6xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            as="link"
            href="/case-studies"
            variant="back"
            className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Case Studies</span>
          </Button>
        </div>

        {/* Hero Section with Cover Image */}
        <div className="relative bg-linear-to-br from-primary/10 via-white to-tertiary/10 rounded-3xl overflow-hidden border-2 border-primary/20 mb-12">
          <div className="relative h-100 md:h-125">
            <Image
              src={imageSrc}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
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

            {/* Title and Client Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="size-5 md:size-6 text-white" />
                <span className="text-white/90 text-lg md:text-xl font-semibold">
                  {caseStudy.client}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                {caseStudy.title}
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                Published {getFormattedDate(caseStudy.publishedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 border-l-4 border-primary shadow-sm">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Challenge */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="size-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                The Challenge
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="size-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Solution</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-linear-to-br from-primary/5 to-tertiary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="size-6 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Key Results
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary/20 text-secondary text-sm font-semibold rounded-xl border border-primary/30 hover:bg-primary/30 transition-colors"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-linear-to-r from-secondary/5 to-tertiary/5 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Found this case study helpful?
                </h3>
                <p className="text-gray-600 text-sm">
                  Share it with your network
                </p>
              </div>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2 w-full sm:w-auto"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: caseStudy.title,
                      text: caseStudy.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <Share2 className="size-4" />
                Share Case Study
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Similar Results?
            </h2>
            <p className="text-gray-600 mb-6">
              Let&apos;s discuss how we can help transform your HR operations
              and achieve outstanding results like {caseStudy.client}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="link"
                href="/contact"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get In Touch
              </Button>
              <Button
                as="link"
                href="/case-studies"
                variant="outline"
                className="w-full sm:w-auto"
              >
                View More Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
