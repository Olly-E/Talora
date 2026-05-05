"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Star,
  Edit,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { ArticleCardProps } from "../types";
import { ARTICLE_PLACEHOLDER_IMAGE } from "../utils/constants";
import { getFormattedDate } from "@/app/utils/utils";

// Helper function to strip HTML tags from WYSIWYG content
const stripHtml = (html: string): string => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  const router = useRouter();

  const coverImage = article.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : ARTICLE_PLACEHOLDER_IMAGE;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on edit/delete buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/godmode/dashboard/articles/${article.id}`);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 bg-linear-to-br from-primary/20 via-tertiary/20 to-secondary/20 overflow-hidden">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {article.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
              <Star className="size-3 fill-current" />
              Featured
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur text-secondary text-xs font-semibold rounded-full shadow-lg">
            {article.category}
          </span>
        </div>
        {isAdmin && onEdit && onDelete && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onEdit(article)}
              className="p-2 bg-white/90 backdrop-blur text-secondary hover:bg-white rounded-lg transition-colors shadow-lg"
              title="Edit article"
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={() => onDelete(article.id)}
              className="p-2 bg-white/90 backdrop-blur text-red-600 hover:bg-white rounded-lg transition-colors shadow-lg"
              title="Delete article"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <User className="size-3" />
            <span>{article.author}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>{getFormattedDate(article.publishedAt)}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {stripHtml(article.excerpt)}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-secondary text-xs font-medium rounded-full"
            >
              <Tag className="size-3" />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        {!isAdmin && (
          <div className="pt-4 border-t border-gray-100">
            <Link href={`/godmode/dashboard/articles/${article.id}`}>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white group/btn">
                <span>Read Article</span>
                <ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-tertiary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
