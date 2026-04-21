import { useQuery } from "@tanstack/react-query";
import { talentPoolKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";

export interface TalentPoolEntry {
  id: number;
  name: string;
  email: string;
  desiredJobTitle: string;
  importantInfo: string | null;
  cvUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TalentPoolResponse {
  entries: TalentPoolEntry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseGetTalentPoolParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetTalentPool = (params?: UseGetTalentPoolParams) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.search) queryParams.set("search", params.search);

  return useQuery<TalentPoolResponse>({
    queryKey: talentPoolKey.list(params),
    queryFn: () =>
      fetchData(`/api/talent-pool?${queryParams.toString()}`, "GET"),
  });
};
