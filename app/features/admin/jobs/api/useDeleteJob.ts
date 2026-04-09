import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminJobKey } from "@/app/utils/query-key-factory";
import { DeleteJobResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteJobResponse, AxiosErrorResponse, number>({
    mutationFn: (id) => fetchData(`/api/jobs/${id}`, "DELETE"),
    onSuccess: () => {
      toast.success("Job deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: adminJobKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
