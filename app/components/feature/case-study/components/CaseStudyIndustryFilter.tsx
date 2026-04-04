interface CaseStudyIndustryFilterProps {
  industries: string[];
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
}

export default function CaseStudyIndustryFilter({
  industries,
  selectedIndustry,
  onIndustryChange,
}: CaseStudyIndustryFilterProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
        Explore Our Success Stories
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {industries.map((industry) => (
          <button
            key={industry}
            onClick={() => onIndustryChange(industry)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedIndustry === industry
                ? "bg-secondary text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>
    </div>
  );
}
