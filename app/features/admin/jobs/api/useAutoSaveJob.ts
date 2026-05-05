import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminJobKey } from "@/app/utils/query-key-factory";
import { JobResponse } from "../types";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

interface AutoSaveJobPayload {
  id?: number;
  [key: string]: unknown;
}

export const useAutoSaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation<JobResponse, AxiosErrorResponse, AutoSaveJobPayload>({
    mutationFn: (payload) => {
      const { id, ...data } = payload;
      if (id) {
        // Update existing draft
        return fetchData<AutoSaveJobPayload>(
          `/api/jobs/${id}`,
          "PATCH",
          data,
        );
      } else {
        // Create new draft
        return fetchData<AutoSaveJobPayload>(
          `/api/jobs`,
          "POST",
          { ...data, status: "DRAFT" },
        );
      }
    },
    onSuccess: () => {
      // Silently invalidate queries without showing toast
      queryClient.invalidateQueries({
        queryKey: adminJobKey.all,
      });
    },
    // No error toast for auto-save - fail silently
    onError: (error) => {
      console.error("Auto-save failed:", error);
    },
  });
};
