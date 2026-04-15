import { Article } from "@/app/data/articlesData";
import { Option } from "@/app/types";

export interface ArticleFormPayload {
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export type CreateArticlePayload = ArticleFormPayload;

export interface UpdateArticlePayload extends ArticleFormPayload {
  id: number;
}

export interface ArticleResponse {
  data: Article;
  message?: string;
}

export interface ArticlesListResponse {
  data: Article[];
  message?: string;
}

export interface DeleteArticleResponse {
  success: boolean;
  message?: string;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  tags?: Option[];
  featured: boolean;
}

export interface ArticleFormProps {
  editingArticle: Article | null;
  onSubmit: (data: ArticleFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface ArticleCardProps {
  article: Article;
  onEdit?: (article: Article) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

export interface ArticleFilters {
  search: string;
  category: string;
  featured: boolean | null;
}

export interface ArticleFilterProps {
  filters: ArticleFilters;
  onFilterChange: (filters: ArticleFilters) => void;
  onClearFilters: () => void;
}

export interface UploadResponse {
  url: string;
  publicId: string;
}
