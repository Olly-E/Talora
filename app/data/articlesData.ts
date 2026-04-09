export interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const articleCategories = [
  "All Articles",
  "HR Automation",
  "Recruitment",
  "Industry Insights",
  "Best Practices",
  "Technology",
];
