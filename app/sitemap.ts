import { Job } from "./data/jobsData";
import { MetadataRoute } from "next";
import { readFileSync } from "fs";
import { join } from "path";

import { CaseStudy } from "./data/caseStudiesData";
import { Article } from "./data/articlesData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://talora-psi.vercel.app";

  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/recruitment`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/hr-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-call`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic routes - Jobs
  try {
    const jobsPath = join(process.cwd(), "data", "jobs.json");
    const jobsData = readFileSync(jobsPath, "utf-8");
    const jobs: Job[] = JSON.parse(jobsData);
    const jobRoutes = jobs.map((job) => {
      // job.posted is a relative string like "5 days ago", not a valid date
      const lastModified = new Date();
      return {
        url: `${baseUrl}/jobs/${job.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
    routes.push(...jobRoutes);
  } catch (error) {
    console.error("Error loading jobs for sitemap:", error);
  }

  // Dynamic routes - Articles
  try {
    const articlesPath = join(process.cwd(), "data", "articles.json");
    const articlesData = readFileSync(articlesPath, "utf-8");
    const articles: Article[] = JSON.parse(articlesData);
    const articleRoutes = articles.map((article) => {
      // Safely create date, fallback to now if invalid
      const dateStr = article.publishedAt;
      const lastModified =
        dateStr && !isNaN(Date.parse(dateStr)) ? new Date(dateStr) : new Date();
      return {
        url: `${baseUrl}/insights/${article.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
    routes.push(...articleRoutes);
  } catch (error) {
    console.error("Error loading articles for sitemap:", error);
  }

  // Dynamic routes - Case Studies
  try {
    const caseStudiesPath = join(process.cwd(), "data", "caseStudies.json");
    const caseStudiesData = readFileSync(caseStudiesPath, "utf-8");
    const caseStudies: CaseStudy[] = JSON.parse(caseStudiesData);
    const caseStudyRoutes = caseStudies.map((caseStudy) => {
      // Safely create date, fallback to now if invalid
      const dateStr = caseStudy.publishedAt;
      const lastModified =
        dateStr && !isNaN(Date.parse(dateStr)) ? new Date(dateStr) : new Date();
      return {
        url: `${baseUrl}/case-studies/${caseStudy.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });
    routes.push(...caseStudyRoutes);
  } catch (error) {
    console.error("Error loading case studies for sitemap:", error);
  }

  return routes;
}
