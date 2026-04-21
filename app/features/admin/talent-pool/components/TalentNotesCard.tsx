import { User } from "lucide-react";

interface TalentNotesCardProps {
  name: string;
  notes: string;
}

export function TalentNotesCard({ name, notes }: TalentNotesCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <div className="size-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
          <User className="size-5 text-secondary" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Additional Notes
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{notes}</p>
    </div>
  );
}
