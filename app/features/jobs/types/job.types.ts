export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  openings: number;
  posted: string;
  description: string;
  tags: string[];
  isUrgent: boolean;
}

export type JobCategory =
  | "All Positions"
  | "Technology & Engineering"
  | "Product Management"
  | "Data & Analytics"
  | "Design & Creative"
  | "Marketing"
  | "Sales"
  | "Business Development"
  | "Operations"
  | "Human Resources"
  | "Finance & Accounting"
  | "Customer Support & Success"
  | "Legal & Compliance"
  | "Supply Chain & Logistics"
  | "Education & Training";
