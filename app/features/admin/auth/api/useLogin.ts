import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { LoginPayload, LoginResponse } from "../types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";
import { adminStorage } from "@/app/utils/storage";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosErrorResponse, LoginPayload>({
    mutationFn: (payload) =>
      fetchData<LoginPayload>("/api/auth/login", "POST", payload),
    onSuccess: (response) => {
      if (response.email) {
        adminStorage.setAdminEmail(response.email);
      }

      toast.success("Login successful!");
      router.push("/godmode/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
