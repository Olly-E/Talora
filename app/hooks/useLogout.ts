"use client";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { storage } from "../utils/storage";

export const useHandleLogout = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    storage.clear();
    queryClient.removeQueries();
    window.localStorage.removeItem("userData");
    route.push("/auth/login");
  };

  return {
    handleLogout,
  };
};
