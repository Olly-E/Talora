import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminArticleKey } from "@/app/utils/query-key-factory";
import { UpdateArticlePayload, ArticleResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<ArticleResponse, AxiosErrorResponse, UpdateArticlePayload>(
    {
      mutationFn: (payload) =>
        fetchData<Omit<UpdateArticlePayload, "id">>(
          `/api/articles/${payload.id}`,
          "PUT",
          payload,
        ),
      onSuccess: () => {
        toast.success("Article updated successfully.");
        queryClient.invalidateQueries({
          queryKey: adminArticleKey.all,
        });
      },
      onError: (error) => {
        toast.error(transformError(error));
      },
    },
  );
};
