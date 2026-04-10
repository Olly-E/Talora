"use client";

import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@/app/data/caseStudiesData";
import { fetchData } from "@/app/utils/fetchData";

export const usePublicCaseStudies = () => {
  return useQuery<CaseStudy[]>({
    queryKey: ["public-case-studies"],
    queryFn: () => fetchData("/api/case-studies"),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
