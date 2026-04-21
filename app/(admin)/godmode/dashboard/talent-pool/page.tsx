"use client";

import { useState } from "react";
import { Search, User } from "lucide-react";
import {
  useGetTalentPool,
  useDeleteTalentPool,
} from "@/app/features/admin/talent-pool/api";
import { TalentCard } from "@/app/features/admin/talent-pool/components";
import { Button } from "@/app/components/elements/Button";

export default function TalentPoolPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetTalentPool({ page, limit, search });
  const { mutate: deleteEntry } = useDeleteTalentPool();

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    deleteEntry(id);
  };

  const handleDownloadCV = (cvUrl: string) => {
    window.open(cvUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl! font-semibold! text-gray-900">Talent Pool</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading talent pool...</p>
          </div>
        </div>
      </div>
    );
  }

  const entries = data?.entries || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl! font-semibold! text-gray-900">
            Talent Pool
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage CV submissions from potential candidates
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
        <input
          type="text"
          placeholder="Search by name, email, or job title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      {/* Stats */}
      {pagination && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
            <p className="text-sm text-gray-600 font-medium mb-1">
              Total Candidates
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {pagination.total}
            </p>
          </div>
          <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
            <p className="text-sm text-gray-600 font-medium mb-1">
              Current Page
            </p>
            <p className="text-3xl font-bold text-gray-900">{entries.length}</p>
          </div>
          <div className="bg-linear-to-br from-tertiary/10 to-tertiary/5 rounded-2xl p-6 border border-tertiary/20">
            <p className="text-sm text-gray-600 font-medium mb-1">
              Total Pages
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {pagination.totalPages}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div>
        {entries.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <User className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No candidates yet
            </h3>
            <p className="text-gray-600">
              Candidate submissions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {entries.map((entry) => (
                <TalentCard
                  key={entry.id}
                  entry={entry}
                  onDownloadCV={handleDownloadCV}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
