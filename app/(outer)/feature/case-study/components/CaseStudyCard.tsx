import { CaseStudy } from "@/app/data/caseStudiesData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Star } from "lucide-react";

const CASE_STUDY_PLACEHOLDER_IMAGE =
  "https://img.freepik.com/free-photo/business-people-working-together_23-2148388768.jpg";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const coverImage = caseStudy.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : CASE_STUDY_PLACEHOLDER_IMAGE;

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageSrc}
          alt={caseStudy.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Industry Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          {caseStudy.featured && (
            <span className=" inline-flex items-center gap-1 bg-yellow-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <Star className="size-3 fill-current" />
              Featured
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-sm text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
            {caseStudy.industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client */}
        <div className="text-sm text-primary font-semibold mb-2">
          {caseStudy.client}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {caseStudy.description}
        </p>

        {/* Key Result */}
        {caseStudy.results.length > 0 && (
          <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3 mb-4">
            <TrendingUp className="size-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 font-medium">
              {caseStudy.results[0]}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
          <span>Read Case Study</span>
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}
