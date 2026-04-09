import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminJobKey } from "@/app/utils/query-key-factory";
import { CreateJobPayload, JobResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation<JobResponse, AxiosErrorResponse, CreateJobPayload>({
    mutationFn: (payload) =>
      fetchData<CreateJobPayload>("/api/jobs", "POST", payload),
    onSuccess: () => {
      toast.success("Job created successfully.");
      queryClient.invalidateQueries({
        queryKey: adminJobKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
