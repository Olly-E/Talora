import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { talentPoolKey } from "@/app/utils/query-key-factory";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export interface DeleteTalentPoolResponse {
  message: string;
}

export const useDeleteTalentPool = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteTalentPoolResponse, AxiosErrorResponse, number>({
    mutationFn: (id) => fetchData(`/api/talent-pool/${id}`, "DELETE"),
    onSuccess: () => {
      toast.success("Entry deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: talentPoolKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
