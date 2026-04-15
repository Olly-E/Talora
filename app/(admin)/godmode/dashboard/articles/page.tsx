"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

import { ARTICLE_PLACEHOLDER_IMAGE } from "@/app/features/admin/article/utils/constants";
import { ArticleFormData } from "@/app/features/admin/article/types";
import { Button } from "@/app/components/elements/Button";
import { Article } from "@/app/data/articlesData";
import {
  useGetArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from "@/app/features/admin/article/api";
import {
  ArticleForm,
  ArticleCard,
  ArticleFilter,
  ArticleFilters,
} from "@/app/features/admin/article/components";

const initialFilters: ArticleFilters = {
  search: "",
  category: "",
  featured: null,
};

export default function ArticlesPage() {
  const router = useRouter();
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<ArticleFilters>(initialFilters);

  const { data: articles = [], isLoading } = useGetArticles();
  const { mutate: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle();
  const { mutate: deleteArticle } = useDeleteArticle();

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        filters.search === "" ||
        article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === "" || article.category === filters.category;

      const matchesFeatured =
        filters.featured === null || article.featured === filters.featured;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [articles, filters]);

  const handleFormSubmit = (data: ArticleFormData) => {
    const articleData = {
      ...data,
      coverImage: data.coverImage?.trim() || ARTICLE_PLACEHOLDER_IMAGE,
      tags: data.tags?.map((tag) => tag.name) || [],
    };

    if (editingArticle) {
      updateArticle(
        { ...articleData, id: editingArticle.id },
        {
          onSuccess: () => {
            setEditingArticle(null);
            setShowForm(false);
          },
        },
      );
    } else {
      createArticle(articleData, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    deleteArticle(id, {
      onSuccess: () => {
        // Ensure we stay on the articles list page after deletion
        router.push("/godmode/dashboard/articles");
      },
    });
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setShowForm(false);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const isFormLoading = isCreating || isUpdating;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl! font-semibold! text-gray-900">
          Articles Management
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl! font-semibold! text-gray-900">
            Articles Management
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage all blog posts and insights
          </p>
        </div>
        <div className="flex justify-end md:justify-start">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondary hover:bg-secondary/90 text-white flex items-center whitespace-nowrap"
          >
            {showForm ? (
              <>
                <X className="size-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="size-4 mr-2" />
                Create New Article
              </>
            )}
          </Button>
        </div>
      </div>

      {showForm && (
        <ArticleForm
          editingArticle={editingArticle}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={isFormLoading}
        />
      )}

      <ArticleFilter
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          All Articles ({filteredArticles.length})
        </h2>
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg mb-2">No articles found</p>
            <p className="text-gray-400 text-sm">
              {articles.length === 0
                ? "Create your first article to get started"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
