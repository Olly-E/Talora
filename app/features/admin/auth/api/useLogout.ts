import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";
import { storage } from "@/app/utils/storage";
import { LogoutResponse } from "../types";

export const useLogout = () => {
  const router = useRouter();

  return useMutation<LogoutResponse, AxiosErrorResponse, void>({
    mutationFn: () => fetchData("/api/auth/logout", "POST"),
    onSuccess: () => {
      storage.clearAdmin();

      toast.success("Logged out successfully");
      router.push("/godmode");
      router.refresh();
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
