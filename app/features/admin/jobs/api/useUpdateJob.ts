import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminJobKey } from "@/app/utils/query-key-factory";
import { UpdateJobPayload, JobResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation<JobResponse, AxiosErrorResponse, UpdateJobPayload>({
    mutationFn: (payload) =>
      fetchData<Omit<UpdateJobPayload, "id">>(
        `/api/jobs/${payload.id}`,
        "PUT",
        payload,
      ),
    onSuccess: () => {
      toast.success("Job updated successfully.");
      queryClient.invalidateQueries({
        queryKey: adminJobKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
