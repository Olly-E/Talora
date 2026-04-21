import {
  Calendar,
  Mail,
  Briefcase,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { getFormattedTimeAgoText } from "@/app/utils/utils";
import { TalentPoolEntry } from "../api";

interface TalentCardProps {
  entry: TalentPoolEntry;
  onDownloadCV: (cvUrl: string) => void;
  onDelete: (id: number) => void;
}

export function TalentCard({ entry, onDownloadCV, onDelete }: TalentCardProps) {
  return (
    <div className="relative group">
      {/* Tooltip Container */}
      {entry.importantInfo && (
        <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
          <div className="flex items-start gap-2 mb-2">
            <div className="size-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <FileText className="size-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Additional Notes
              </p>
              <p className="text-sm font-medium text-gray-900">
                {entry.name}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {entry.importantInfo}
          </p>
          {/* Arrow pointer */}
          <div className="absolute -left-2 top-4 size-4 bg-white border-l border-b border-gray-200 rotate-45"></div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-secondary/30 transition-all duration-300">
        {/* Header with gradient background */}
        <div className="bg-linear-to-r from-secondary to-secondary/80 p-6 pb-12">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar with initials */}
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <span className="text-white font-bold text-lg">
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {entry.name}
              </h3>
              <div className="flex items-center gap-1.5 text-white/90 text-xs">
                <Calendar className="size-3" />
                <span>{getFormattedTimeAgoText(entry.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-8">
        {/* Job Title Badge */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="size-4 text-secondary" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Desired Role
            </span>
          </div>
          <p className="font-semibold text-gray-900 text-base">
            {entry.desiredJobTitle}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
          <Mail className="size-4 text-gray-400 shrink-0" />
          <span className="truncate">{entry.email}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 mt-4 border-t border-gray-100">
          <Button
            variant="primary"
            onClick={() => onDownloadCV(entry.cvUrl)}
            className="flex-1 gap-2 rounded-md!"
          >
            <Download className="size-4" />
            View CV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(entry.id)}
            className="text-red-600 hover:bg-red-50 hover:border-red-300 border-gray-200 px-3 rounded-md!"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
