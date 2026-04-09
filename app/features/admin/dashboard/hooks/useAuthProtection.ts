import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyAuth } from "../../auth/api";

export const useAuthProtection = () => {
  const router = useRouter();
  const { data: authStatus, isLoading, isError } = useVerifyAuth();

  useEffect(() => {
    if (!isLoading && (isError || !authStatus?.authenticated)) {
      router.push("/godmode");
    }
  }, [isLoading, isError, authStatus, router]);

  return {
    isLoading,
    isAuthenticated: authStatus?.authenticated,
  };
};
