"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Filter, X } from "lucide-react";
import ArticleCard from "./ArticleCard";

import { usePublicArticles } from "@/app/hooks/usePublicArticles";
import { getFormattedDate } from "@/app/utils/utils";
import { Button } from "../elements/Button";

import writerThumb from "../../../public/images/writer.webp";

const categories = [
  "All",
  "Recruitment Automation",
  "Recruitment Strategy",
  "Candidate Experience",
  "Hiring Systems",
];

const popularTopics = [
  "Hiring Systems",
  "Talent Sourcing",
  "Candidate Experience",
  "Recruitment Automation",
  "Team Growth",
];

const ArticleSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: articles = [], isLoading } = usePublicArticles();

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const handleCategorySelect = useCallback((category: string) => {
    setActiveCategory(category);
    setIsDrawerOpen(false);
  }, []);

  const categoryButtons = useMemo(
    () => (
      <div className="flex flex-col md:flex-row gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === category
                ? "bg-secondary text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    ),
    [activeCategory, handleCategorySelect],
  );

  return (
    <section className="py-20 bg-gray-50 container">
      <div className=" lg:mx-auto xl:px-4">
        <div className="flex-col xl:flex-row flex xl:items-end xl:justify-between gap-10 xl:gap-40 mb-8 ">
          <div className="lg:max-w-175">
            <div className="">
              <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
                <div className="size-2 rounded-full min-w-2 bg-primary" />
                Our Blog
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-8">
                Explore Insights on Hiring and Talent{" "}
              </h2>
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <Button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 flex items-center justify-center gap-2"
              >
                <Filter className="size-4" />
                Category: {activeCategory}
              </Button>
            </div>

            {/* Desktop Category Filter */}
            <div className="hidden md:block flex-1 border-2 border-gray-200 rounded-full p-2 overflow-x-auto scrollbar-hide lg:max-w-175 w-full">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-secondary text-white"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-gray-600 text-sm max-w-xs">
              Practical insights on structured hiring systems, talent sourcing,
              and building efficient recruitment processes as your team grows.{" "}
              <br />
              Stay updated with insights on hiring strategy, recruitment
              workflows, and building scalable teams.
            </p>
            <Button
              variant="secondary"
              size="md"
              className="bg-black text-white mt-4 xl:mt-10 px-6"
              as="link"
              href="/insights"
            >
              Explore Insights <span className="text-lg">→</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.slice(0, 4).map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                image={article.coverImage || "/images/article-placeholder.webp"}
                author={{
                  name: article.author,
                  avatar: writerThumb,
                }}
                date={getFormattedDate(article.publishedAt)}
                readTime={article.readTime}
                title={article.title}
                category={article.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-gray-900 font-semibold">Popular topics :</span>
          <div className="flex gap-3 flex-wrap">
            {popularTopics.map((topic) => (
              <button
                key={topic}
                className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-primary hover:text-black transition-all duration-400"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Category Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50 md:hidden max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="size-5 text-secondary" />
                <h3 className="text-lg font-bold text-gray-900">
                  Select Category
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600" />
              </button>
            </div>
            {categoryButtons}
          </div>
        </>
      )}
    </section>
  );
};

export default ArticleSection;
