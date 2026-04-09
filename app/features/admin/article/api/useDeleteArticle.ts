import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminArticleKey } from "@/app/utils/query-key-factory";
import { DeleteArticleResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteArticleResponse, AxiosErrorResponse, number>({
    mutationFn: (id) => fetchData(`/api/articles/${id}`, "DELETE"),
    onSuccess: () => {
      toast.success("Article deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: adminArticleKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
