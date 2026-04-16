export interface Job {
  id: number;
  title: string;
  slug: string;
  company: string;
  location: string;
  type: string;
  modeOfWork: string;
  salary: string;
  currency?: string;
  category: string[];
  openings: number;
  posted?: string;
  description: string;
  tags: string[];
  isUrgent: boolean;
  applicationLink?: string;
}

export type JobCategory =
  | "All Positions"
  | "Engineering"
  | "Human Resources"
  | "Marketing"
  | "Sales"
  | "Design";
