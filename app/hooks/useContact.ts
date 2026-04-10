import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/app/lib/axios";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ContactResponse {
  message: string;
}

const submitContactForm = async (
  data: ContactFormData,
): Promise<ContactResponse> => {
  const response = await axiosInstance.post<ContactResponse>(
    "/api/contact",
    data,
  );
  return response.data;
};

export const useContact = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};
