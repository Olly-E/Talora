import { UserPlus, Cog, Calendar, LucideIcon } from "lucide-react";
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
    title: "Recruitment Automation",
    description:
      "End-to-end automated hiring workflows. Automate screening, communication, and scheduling while maintaining a structured and transparent candidate experience across every stage.",
    icon: Cog,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    link: "/services/recruitment",
    features: [
      "Automated screening and candidate tracking",
      "Personalized candidate communication at every stage",
      "Clear, non-generic feedback for applicants",
      "Interview scheduling with pre-qualified candidates",
    ],
  },
  {
    title: "Recruitment Services",
    description:
      "Hands-on support to source and hire the right talent. We manage sourcing and end-to-end candidate evaluation, ensuring you engage only with well-qualified candidates while maintaining clear, professional communication throughout the hiring process.",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    link: "/services/recruitment",
    features: [
      "Proactive candidate sourcing",
      "End-to-end screening and evaluation",
      "Qualified candidate shortlisting",
      "Personalized candidate communication",
      "Clear and consistent client communication",
    ],
  },
  {
    title: "Onboarding Systems",
    description:
      "Structured onboarding for seamless integration. Ensure new hires are properly integrated with clear processes, aligned expectations, and ongoing support from day one.",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/20",
    link: "/about",
    features: [
      "Onboarding workflow design",
      "Contract and documentation setup",
      "New hire coordination",
      "Early-stage support",
    ],
  },
];

export default function ServicesOverviewSection() {
  return (
    <section className="py-20 bg-primary/50 mt-10 sm:mt-0">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full mb-6 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-primary" />
            What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Structured Hiring Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            Clear, efficient systems to help you source, evaluate, and hire the
            right talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.link}
                className="group bg-secondary rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-white/20 block"
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

                <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <span className="text-lg">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
