import {
  Boxes,
  Target,
  Zap,
  MessageSquare,
  FileSearch,
  Award,
  TrendingUp,
  Handshake,
  LucideIcon,
} from "lucide-react";

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  {
    title: "Structured Over Reactive",
    description:
      "We replace ad hoc hiring with clear, repeatable systems that improve consistency and decision making.",
    icon: Boxes,
  },
  {
    title: "Proactive, Not Passive",
    description:
      "We actively source and engage talent rather than waiting for applications, ensuring access to stronger candidates.",
    icon: Target,
  },
  {
    title: "Efficiency Through Automation",
    description:
      "We design workflows that reduce manual work, speed up hiring, and eliminate operational bottlenecks.",
    icon: Zap,
  },
  {
    title: "Clear Candidate Communication",
    description:
      "We ensure candidates are informed, respected, and guided throughout the hiring process.",
    icon: MessageSquare,
  },
  {
    title: "Role Clarity First",
    description:
      "We help define roles properly before hiring begins, reducing mismatches and improving long term success.",
    icon: FileSearch,
  },
  {
    title: "Quality Over Volume",
    description:
      "We focus on presenting well evaluated candidates rather than overwhelming you with options.",
    icon: Award,
  },
  {
    title: "Built for Scaling Teams",
    description:
      "Our systems are designed to grow with your company, not break as hiring demand increases.",
    icon: TrendingUp,
  },
  {
    title: "Partnership Approach",
    description:
      "We work closely with your team, aligning hiring decisions with your business goals and growth plans.",
    icon: Handshake,
  },
];

export default function ResourceCategoriesSection() {
  return (
    <section className="py-20 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
          <div className="size-2 rounded-full min-w-2 bg-black" />
          What You Can Expect Working With Us
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight max-w-2xl">
            How We Approach Hiring
          </h2>
          <p className="text-white/80 max-w-md md:text-right text-sm sm:text-base">
            Our work is built on structured systems, clear communication, and a
            commitment to helping companies hire efficiently without unnecessary
            complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
