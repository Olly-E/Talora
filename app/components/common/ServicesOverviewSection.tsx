import {
  UserPlus,
  Cog,
  TrendingUp,
  Award,
  FileText,
  Calendar,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  link: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "Recruitment & Talent Acquisition",
    description:
      "Find, attract, and hire the best talent with our comprehensive recruitment solutions tailored to your industry needs",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    link: "/services/recruitment",
    features: [
      "Job Posting",
      "Applicant Tracking",
      "Interview Scheduling",
      "Candidate Assessment",
    ],
  },
  {
    title: "HR Process Automation",
    description:
      "Streamline repetitive HR tasks and boost efficiency with intelligent automation that saves time and reduces errors",
    icon: Cog,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    link: "/services/hr-automation",
    features: [
      "Automated Workflows",
      "Digital Onboarding",
      "Leave Management",
      "Document Processing",
    ],
  },
  {
    title: "Performance Management",
    description:
      "Drive employee growth and organizational success with robust performance tracking and review systems",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/20",
    link: "#",
    features: [
      "Goal Setting",
      "360° Feedback",
      "Performance Reviews",
      "Development Plans",
    ],
  },
  {
    title: "Payroll & Benefits Administration",
    description:
      "Ensure accurate, compliant payroll processing and comprehensive benefits management for your entire workforce",
    icon: Award,
    color: "text-tertiary",
    bgColor: "bg-tertiary/10",
    link: "#",
    features: [
      "Salary Processing",
      "Tax Compliance",
      "Benefits Enrollment",
      "Expense Management",
    ],
  },
  {
    title: "Compliance & Risk Management",
    description:
      "Stay compliant with ever-changing regulations and minimize HR-related risks with expert guidance and tools",
    icon: FileText,
    color: "text-orange-state",
    bgColor: "bg-orange-state/10",
    link: "#",
    features: [
      "Legal Compliance",
      "Policy Management",
      "Audit Support",
      "Risk Assessment",
    ],
  },
  {
    title: "Training & Development",
    description:
      "Empower your workforce with continuous learning opportunities and structured development programs",
    icon: Calendar,
    color: "text-purple-2",
    bgColor: "bg-purple-light/50",
    link: "#",
    features: [
      "Learning Management",
      "Skill Development",
      "Career Pathing",
      "Certification Tracking",
    ],
  },
];

export default function ServicesOverviewSection() {
  return (
    <section className="py-20 bg-primary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full mb-6 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-primary" />
            What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Complete HR Solutions for Every Need
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive suite of services covers every aspect of human
            resource management, designed to scale with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-secondary rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-white/20"
              >
                <div className="bg-white rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="size-8 text-secondary" strokeWidth={2} />
                </div>

                <h3 className="font-bold text-2xl mb-3 text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-white/80 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <div className="size-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all"
                >
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
