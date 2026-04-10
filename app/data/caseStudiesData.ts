export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  coverImage: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

export const caseStudyIndustries = [
  "All Industries",
  "Technology",
  "Manufacturing",
  "Retail",
  "Healthcare",
  "Financial Services",
];
