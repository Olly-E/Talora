import { CaseStudy } from "@/app/data/caseStudiesData";
import { Option } from "@/app/types";

export interface CaseStudyFormPayload {
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  coverImage: string;
  tags: string[];
  featured: boolean;
}

export type CreateCaseStudyPayload = CaseStudyFormPayload;

export interface UpdateCaseStudyPayload extends CaseStudyFormPayload {
  id: number;
}

export interface CaseStudyResponse {
  data: CaseStudy;
  message?: string;
}

export interface CaseStudiesListResponse {
  data: CaseStudy[];
  message?: string;
}

export interface DeleteCaseStudyResponse {
  success: boolean;
  message?: string;
}

export interface CaseStudyFormData {
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  coverImage: string;
  tags?: Option[];
  featured: boolean;
}

export interface CaseStudyFormProps {
  editingCaseStudy?: CaseStudy | null;
  onSubmit: (data: CaseStudyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CaseStudyFilters {
  search: string;
  industry: string;
  featured: boolean | null;
}

export interface CaseStudyFilterProps {
  filters: CaseStudyFilters;
  onFilterChange: (filters: CaseStudyFilters) => void;
}
