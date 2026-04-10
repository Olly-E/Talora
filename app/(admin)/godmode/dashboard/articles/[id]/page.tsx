"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Star,
  Share2,
  Edit,
} from "lucide-react";

import { ARTICLE_PLACEHOLDER_IMAGE } from "@/app/features/admin/article/utils/constants";
import {
  useGetArticles,
  useUpdateArticle,
} from "@/app/features/admin/article/api";
import { Button } from "@/app/components/elements/Button";
import { ArticleForm } from "@/app/features/admin/article/components";
import { ArticleFormData } from "@/app/features/admin/article/types";
import { getFormattedDate } from "@/app/utils/utils";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = Number(params.id);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: articles = [], isLoading } = useGetArticles();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle();
  const article = articles.find((a) => a.id === articleId);

  const handleFormSubmit = (data: ArticleFormData) => {
    const articleData = {
      ...data,
      coverImage: data.coverImage?.trim() || ARTICLE_PLACEHOLDER_IMAGE,
      tags: data.tags.map((tag) => tag.name),
    };

    updateArticle(
      { ...articleData, id: articleId },
      {
        onSuccess: () => {
          setShowEditForm(false);
        },
      },
    );
  };

  const coverImage = article?.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : ARTICLE_PLACEHOLDER_IMAGE;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors bg-transparent hover:bg-transparent"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Articles</span>
        </Button>
        <Button
          onClick={() => setShowEditForm(!showEditForm)}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
        >
          <Edit className="size-4" />
          {showEditForm ? "Cancel Edit" : "Edit Article"}
        </Button>
      </div>

      {showEditForm && (
        <ArticleForm
          editingArticle={article}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowEditForm(false)}
          isLoading={isUpdating}
        />
      )}

      <div className="relative bg-linear-to-br from-primary/10 via-white to-tertiary/10 rounded-3xl overflow-hidden border-2 border-primary/20">
        <div className="relative h-96 bg-linear-to-br from-primary/30 via-tertiary/30 to-secondary/30">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute top-6 left-6 flex gap-2">
            {article.featured && (
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                <Star className="size-4 fill-current" />
                Featured Article
              </span>
            )}
            <span className="px-4 py-2 bg-white/90 backdrop-blur text-secondary text-sm font-semibold rounded-full shadow-lg">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-2xl font-bold mb-4 drop-shadow-lg">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{getFormattedDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-base text-gray-700 leading-relaxed italic border-l-4 border-primary pl-6">
              {article.excerpt}
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary/20 text-secondary text-sm font-semibold rounded-xl border border-primary/30"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Enjoyed this article?
                </h3>
                <p className="text-gray-600 text-sm">
                  Share it with your network
                </p>
              </div>
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                <Share2 className="size-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          More from {article.category}
        </h2>
        <p className="text-gray-600">
          Explore more articles in this category...
        </p>
      </div>
    </div>
  );
}
