import { useQuery } from "@tanstack/react-query";
import { Article } from "@/app/data/articlesData";

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch("/api/articles");
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

export function usePublicArticles() {
  return useQuery<Article[]>({
    queryKey: ["public-articles"],
    queryFn: fetchArticles,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 1000, // 1 hour (formerly cacheTime)
  });
}
