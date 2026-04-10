import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/app/lib/axios";
import { CaseStudy } from "@/app/data/caseStudiesData";
import { CreateCaseStudyPayload, UpdateCaseStudyPayload } from "../types";
import { CASE_STUDY_QUERY_KEYS } from "./query-keys";

export const useGetCaseStudies = () => {
  return useQuery<CaseStudy[]>({
    queryKey: CASE_STUDY_QUERY_KEYS.all,
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/case-studies");
      return data;
    },
  });
};

export const useCreateCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCaseStudyPayload) => {
      const { data } = await axiosInstance.post("/api/case-studies", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_QUERY_KEYS.all });
    },
  });
};

export const useUpdateCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCaseStudyPayload) => {
      const { data } = await axiosInstance.put(
        `/api/case-studies/${payload.id}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_QUERY_KEYS.all });
    },
  });
};

export const useDeleteCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/api/case-studies/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_QUERY_KEYS.all });
    },
  });
};
