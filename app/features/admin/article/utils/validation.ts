import { z } from "zod";

export const articleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  readTime: z.string().min(1, "Read time is required"),
  tags: z.string().min(1, "At least one tag is required"),
  featured: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleFormSchema>;
