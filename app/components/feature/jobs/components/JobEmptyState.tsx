import { Search } from "lucide-react";
import { Button } from "@/app/components/elements/Button";

interface JobEmptyStateProps {
  onClearFilters: () => void;
}

export default function JobEmptyState({ onClearFilters }: JobEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="bg-gray-200 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
        <Search className="size-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
      <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
      <Button onClick={onClearFilters} variant="secondary">
        Clear Filters
      </Button>
    </div>
  );
}
