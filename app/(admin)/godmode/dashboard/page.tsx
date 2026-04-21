"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, FileText, BookOpen, Users } from "lucide-react";
import { useGetJobs } from "@/app/features/admin/jobs/api";
import { useGetArticles } from "@/app/features/admin/article/api";
import { useGetCaseStudies } from "@/app/features/admin/case-study/api";
import { useGetTalentPool } from "@/app/features/admin/talent-pool/api";

export default function DashboardPage() {
  const { data: jobs = [], isLoading: jobsLoading } = useGetJobs();
  const { data: articles = [], isLoading: articlesLoading } = useGetArticles();
  const { data: caseStudies = [], isLoading: caseStudiesLoading } =
    useGetCaseStudies();
  const { data: talentPoolData, isLoading: talentPoolLoading } =
    useGetTalentPool({ page: 1, limit: 1 });

  const stats = {
    totalJobs: jobs.length,
    totalArticles: articles.length,
    totalCaseStudies: caseStudies.length,
    totalCandidates: talentPoolData?.pagination?.total || 0,
  };

  const cards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      href: "/godmode/dashboard/jobs",
      color: "bg-blue-500",
    },
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: FileText,
      href: "/godmode/dashboard/articles",
      color: "bg-green-500",
    },
    {
      title: "Total Case Studies",
      value: stats.totalCaseStudies,
      icon: BookOpen,
      href: "/godmode/dashboard/case-studies",
      color: "bg-purple-500",
    },
    {
      title: "Talent Pool",
      value: stats.totalCandidates,
      icon: Users,
      href: "/godmode/dashboard/talent-pool",
      color: "bg-orange-500",
    },
  ];

  if (
    jobsLoading ||
    articlesLoading ||
    caseStudiesLoading ||
    talentPoolLoading
  ) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl! font-semibold! text-gray-900">Dashboard</h1>
          <p className="text-base text-gray-600 mt-1">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl! font-semibold! text-gray-900">Dashboard</h1>
        <p className="text-base text-gray-600 mt-1">
          Welcome to your admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/godmode/dashboard/jobs"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Briefcase className="text-blue-500" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Manage Jobs</h3>
              <p className="text-sm text-gray-600">
                Create, edit, or delete job listings
              </p>
            </div>
          </Link>
          <Link
            href="/godmode/dashboard/articles"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <FileText className="text-green-500" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Manage Articles</h3>
              <p className="text-sm text-gray-600">
                Write and publish new articles
              </p>
            </div>
          </Link>
          <Link
            href="/godmode/dashboard/case-studies"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <BookOpen className="text-purple-500" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">
                Manage Case Studies
              </h3>
              <p className="text-sm text-gray-600">
                Showcase client success stories
              </p>
            </div>
          </Link>
          <Link
            href="/godmode/dashboard/talent-pool"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
          >
            <Users className="text-orange-500" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Talent Pool</h3>
              <p className="text-sm text-gray-600">
                View and manage CV submissions
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
