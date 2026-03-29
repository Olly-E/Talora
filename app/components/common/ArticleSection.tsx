"use client";

import React, { useState } from "react";
import ArticleCard, { ArticleCardProps } from "./ArticleCard";
import { Button } from "../elements/Button";
import article1 from "../../../public/images/article1.webp";
import article2 from "../../../public/images/article2.webp";
import article3 from "../../../public/images/article3.webp";
import article4 from "../../../public/images/article4.webp";
import writerThumb from "../../../public/images/writer.webp";

const categories = [
  "All",
  "Talent Acquisition Strategies",
  "Employee Engagement & Retention",
  "HR Law Updates",
  "Performance Management",
];

const popularTopics = ["Retention", "Automation", "Feedback", "Hiring"];

const articles: ArticleCardProps[] = [
  {
    image: article1,
    author: {
      name: "Nadia Prasetya",
      avatar: writerThumb,
    },
    date: "June 13, 2025",
    readTime: "6 Min read",
    title: "How Automation Is Reshaping the Role of HR Management",
    category: "Automation",
  },
  {
    image: article2,
    author: {
      name: "Nadia Prasetya",
      avatar: writerThumb,
    },
    date: "June 13, 2025",
    readTime: "6 Min read",
    title: "How Automation Is Reshaping the Role of HR Management",
    category: "Talent Acquisition Strategies",
  },
  {
    image: article3,
    author: {
      name: "Nadia Prasetya",
      avatar: writerThumb,
    },
    date: "June 13, 2025",
    readTime: "6 Min read",
    title: "How Automation Is Reshaping the Role of HR Management",
    category: "Employee Engagement & Retention",
  },
  {
    image: article4,
    author: {
      name: "Nadia Prasetya",
      avatar: writerThumb,
    },
    date: "June 13, 2025",
    readTime: "6 Min read",
    title: "How Automation Is Reshaping the Role of HR Management",
    category: "HR Law Updates",
  },
];

const ArticleSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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
                Explore Insights That Shape
                <br  className="hidden sm:block"/>
                Modern HR Practices
              </h2>
            </div>
            <div className="flex-1 border-2 border-gray-200 rounded-full p-2 overflow-x-auto scrollbar-hide lg:max-w-175 w-full">
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
              Stay updated with expert tips, trends, and HR technology
              innovations. Updates and analysis on the latest innovations
            </p>
            <Button
              variant="secondary"
              size="md"
              className="bg-black text-white mt-4 xl:mt-10 px-6"
            >
              See More <span className="text-lg">→</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {articles.map((article, idx) => (
            <ArticleCard key={idx} {...article} />
          ))}
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
    </section>
  );
};

export default ArticleSection;
