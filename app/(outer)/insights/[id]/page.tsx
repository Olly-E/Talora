"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Star,
  Share2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { usePublicArticles } from "@/app/hooks/usePublicArticles";
import { ARTICLE_PLACEHOLDER_IMAGE } from "@/app/features/admin/article/utils/constants";
import { getFormattedDate } from "@/app/utils/utils";

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id;

  const { data: articles = [], isLoading } = usePublicArticles();

  const article = useMemo(() => {
    return articles.find((a) => a.id === Number(articleId)) || null;
  }, [articles, articleId]);

  const coverImage = article?.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));
  const imageSrc = isValidUrl ? coverImage : ARTICLE_PLACEHOLDER_IMAGE;

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-5xl">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-16 px-6 max-w-5xl">
        <div className="text-center min-h-96 flex flex-col items-center justify-center">
          <AlertCircle className="size-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button as="link" href="/insights" variant="secondary">
            Browse All Articles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto py-12 px-6 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            as="link"
            href="/insights"
            variant="back"
            className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Insights</span>
          </Button>
        </div>

        {/* Hero Section with Cover Image */}
        <div className="relative bg-linear-to-br from-primary/10 via-white to-tertiary/10 rounded-3xl overflow-hidden border-2 border-primary/20 mb-12">
          <div className="relative h-100 md:h-125">
            <Image
              src={imageSrc}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
              {article.featured && (
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  <Star className="size-4 fill-current" />
                  Featured
                </span>
              )}
              <span className="px-4 py-2 bg-white/90 backdrop-blur text-secondary text-sm font-semibold rounded-full shadow-lg">
                {article.category}
              </span>
            </div>

            {/* Title and Meta Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <User className="size-4 md:size-5" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 md:size-5" />
                  <span>{getFormattedDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 md:size-5" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 border-l-4 border-primary shadow-sm">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
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

        {/* Article Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                prose-li:mb-2
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {/* Share Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-linear-to-r from-secondary/5 to-tertiary/5 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Enjoyed this article?
                </h3>
                <p className="text-gray-600 text-sm">
                  Share it with your network
                </p>
              </div>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <Share2 className="size-4" />
                Share Article
              </Button>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              More from {article.category}
            </h2>
            <p className="text-gray-600 mb-6">
              Explore more articles in this category to deepen your knowledge.
            </p>
            <Button as="link" href="/insights" variant="secondary">
              Browse All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
