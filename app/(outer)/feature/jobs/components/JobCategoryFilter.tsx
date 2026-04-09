import { JobCategory } from "../types";

interface JobCategoryFilterProps {
  categories: JobCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function JobCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: JobCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-medium transition-all ${
            selectedCategory === category
              ? "bg-secondary text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
