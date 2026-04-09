import { useQuery } from "@tanstack/react-query";
import { Job } from "@/app/data/jobsData";

async function fetchJobs(): Promise<Job[]> {
  const response = await fetch("/api/jobs");
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export function usePublicJobs() {
  return useQuery<Job[]>({
    queryKey: ["public-jobs"],
    queryFn: fetchJobs,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 1000, // 1 hour (formerly cacheTime)
  });
}
