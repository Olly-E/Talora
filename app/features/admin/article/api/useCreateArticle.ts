import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminArticleKey } from "@/app/utils/query-key-factory";
import { CreateArticlePayload, ArticleResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<ArticleResponse, AxiosErrorResponse, CreateArticlePayload>(
    {
      mutationFn: (payload) =>
        fetchData<CreateArticlePayload>("/api/articles", "POST", payload),
      onSuccess: () => {
        toast.success("Article created successfully.");
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
