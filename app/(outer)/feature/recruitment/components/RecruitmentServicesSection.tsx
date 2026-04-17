import {
  Search,
  UserCheck,
  Briefcase,
  Users,
  Target,
  TrendingUp,
  Globe,
  Award,
} from "lucide-react";

export default function RecruitmentServicesSection() {
  const services = [
    {
      icon: Search,
      title: "Role-Based Hiring",
      description:
        "Hire across all levels, from entry-level roles to senior leadership and C-level positions.",
      features: [
        "Entry to executive hiring",
        "Leadership and specialist roles",
        "Role-specific candidate matching",
      ],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "High-Volume Recruitment",
      description:
        "Scale your team efficiently while maintaining quality and consistency at every stage",
      features: [
        "Structured high-volume sourcing",
        "Consistent screening process",
        "Quality-controlled shortlisting",
      ],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Target,
      title: "Specialized & Confidential Hiring",
      description:
        "Fill niche or sensitive roles through targeted and discreet search strategies.",
      features: [
        "Niche talent sourcing",
        "Confidential searches",
        "Direct market outreach",
      ],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: TrendingUp,
      title: "Talent Pipeline Building",
      description:
        "Build a ready pool of qualified candidates for current and future hiring needs.",
      features: [
        "Proactive sourcing",
        "Talent mapping",
        "Ongoing candidate pipeline",
      ],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Briefcase,
      title: "Contract & Permanent Hiring",
      description:
        "Hire full-time employees or independent contractors based on your business needs.",
      features: [
        "Full-time placements",
        "Independent contractors",
        "Flexible hiring models",
      ],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Globe,
      title: "Global Recruitment",
      description:
        "Access qualified professionals across key global talent markets.",
      features: [
        "Africa, Asia, LATAM, Eastern Europe",
        "Remote-ready candidates",
        "Cross-border hiring support",
      ],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Award,
      title: "End-to-End Recruitment Support",
      description:
        "Outsource your recruitment process or specific roles with structured execution and clear communication.",
      features: [
        "Full recruitment ownership",
        "Role-specific support",
        "Consistent client updates",
      ],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: UserCheck,
      title: "Candidate Screening & Shortlisting",
      description:
        "Receive only qualified candidates through a structured evaluation process.",
      features: [
        "CV screening and assessment",
        "Qualified shortlists only",
        "Clear candidate insights",
      ],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive{" "}
            <span className="text-primary">Recruitment Solutions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Hire across roles, regions, and hiring models with a structured
            recruitment process that delivers qualified candidates and
            consistent results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className={`${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`size-7 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-500 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
