import { useQuery } from "@tanstack/react-query";
import { adminArticleKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { Article } from "@/app/data/articlesData";

export const useGetArticles = () => {
  return useQuery<Article[]>({
    queryKey: adminArticleKey.all,
    queryFn: () => fetchData("/api/articles", "GET"),
  });
};
