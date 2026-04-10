import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  modeOfWork: z.string().min(1, "Mode of work is required"),
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
  "Freelance",
] as const;

export const MODE_OF_WORK = [
  "On-site",
  "Remote",
  "Hybrid",
  "Shift-based",
  "Flexible",
] as const;

// Common job tags/skills
export const COMMON_JOB_TAGS = [
  "React",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Kubernetes",
  "SQL",
  "MongoDB",
  "Leadership",
  "Communication",
  "Problem Solving",
  "Team Player",
  "Project Management",
  "Agile",
  "Scrum",
  "UI/UX",
  "Figma",
  "Adobe Creative Suite",
  "Marketing",
  "SEO",
  "Content Writing",
  "Social Media",
  "Sales",
  "CRM",
  "Recruiting",
  "HR Compliance",
  "Data Analysis",
];
