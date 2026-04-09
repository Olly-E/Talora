import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { AuthVerifyResponse } from "../types";

export const useVerifyAuth = () => {
  return useQuery<AuthVerifyResponse>({
    queryKey: ["auth", "verify"],
    queryFn: () => fetchData("/api/auth/verify", "GET"),
    retry: false,
    staleTime: 60 * 60 * 1000, // 5 minutes
  });
};
