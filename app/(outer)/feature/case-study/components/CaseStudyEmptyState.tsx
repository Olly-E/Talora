import { FolderSearch } from "lucide-react";

export default function CaseStudyEmptyState() {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-6">
          <FolderSearch className="size-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Case Studies Found
      </h3>
      <p className="text-gray-500">
        No case studies found for this industry. Try selecting a different
        category.
      </p>
    </div>
  );
}
