import { Job } from "@/app/data/jobsData";
import { Option } from "@/app/types";

export interface JobFormPayload {
  title: string;
  company: string;
  location: string;
  type: string;
  modeOfWork: string;
  salary: string;
  currency: string;
  category: string[];
  openings: number;
  description: string;
  tags: string[];
  isUrgent: boolean;
  applicationLink?: string;
  status?: string;
}

export type CreateJobPayload = JobFormPayload;

export interface UpdateJobPayload extends JobFormPayload {
  id: number;
}

export interface JobResponse {
  data: Job;
  message?: string;
}

export interface JobsListResponse {
  data: Job[];
  message?: string;
}

export interface DeleteJobResponse {
  success: boolean;
  message?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  modeOfWork: string;
  salary: string;
  currency: string;
  category: Option[];
  openings: number;
  description: string;
  tags?: Option[];
  isUrgent: boolean;
  applicationLink?: string;
  status?: string;
}

export interface JobFormProps {
  editingJob: Job | null;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

export interface JobFilters {
  search: string;
  category: string[];
  type: string;
  isUrgent: boolean | null;
}

export interface JobFilterProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}
