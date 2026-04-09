import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import { transformError } from "@/app/utils/utils";
import { AxiosErrorResponse } from "@/app/types";
import { UploadResponse } from "../types";

export const useUploadImage = () => {
  return useMutation<UploadResponse, AxiosErrorResponse, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
