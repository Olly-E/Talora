import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/app/lib/axios";

interface ContactFormData {
  helpNeeded: string[];
  urgency: string;
  rolesCount: string;
  hiringLocation: string[];
  company: string;
  name: string;
  email: string;
  additionalInfo?: string;
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
