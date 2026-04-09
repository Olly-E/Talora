import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  salary: z.string().min(1, "Salary is required"),
  category: z.string().min(1, "Category is required"),
  openings: z.number().min(1, "At least 1 opening is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  isUrgent: z.boolean().default(false),
});

export type JobFormData = z.infer<typeof jobFormSchema>;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;
