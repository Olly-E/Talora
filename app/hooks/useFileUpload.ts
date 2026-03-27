import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { transformError, AxiosErrorResponse } from "@/app/utils/utils";
import { tokenStorage } from "../utils/storage";
export const useFileUpload = ({
  onSuccess,
}: {
  onSuccess: (url: string) => void;
}) => {
  return useMutation<string, AxiosErrorResponse, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
      const endpoint =
        process.env.NEXT_PUBLIC_API_BASE_URL +
        "/manage-dashboard/upload/upload/";

      const token = tokenStorage.getToken();

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result.url;
    },
    onSuccess: (url) => {
      toast.success("File uploaded successfully.");
      onSuccess(url);
      console.log("File uploaded:", url);
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
