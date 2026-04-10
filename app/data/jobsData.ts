export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  modeOfWork: string;
  salary: string;
  category: string[];
  openings: number;
  posted?: string;
  description: string;
  tags: string[];
  isUrgent: boolean;
  applicationLink?: string;
}

export const jobCategories = [
  "All Positions",
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Design",
];
