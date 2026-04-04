import { Search } from "lucide-react";
import { Button } from "@/app/components/elements/Button";

interface JobSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function JobSearchBar({
  searchQuery,
  onSearchChange,
}: JobSearchBarProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
          <Search className="size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, company, or location..."
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          size="md"
          className="bg-secondary rounded-xl! hover:bg-secondary/90 text-white! whitespace-nowrap"
        >
          Search Jobs
          <Search className="size-4" />
        </Button>
      </div>
    </div>
  );
}
