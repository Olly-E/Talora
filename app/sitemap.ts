import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://talora.com"; // Replace with your actual domain

  // Public routes that should appear in sitemap
  const routes = [
    "",
    "/about",
    "/services",
    "/services/recruitment",
    "/services/hr-automation",
    "/case-studies",
    "/insights",
    "/jobs",
    "/contact",
    "/book-call",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
