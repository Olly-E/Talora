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
      title: "Executive Search",
      description:
        "Find C-suite and senior leadership talent through our extensive network and rigorous assessment process.",
      features: [
        "Confidential searches",
        "Leadership assessment",
        "Cultural fit analysis",
      ],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Volume Recruitment",
      description:
        "Scale your team rapidly with our proven high-volume hiring strategies and dedicated recruitment teams.",
      features: ["Bulk hiring", "Fast turnaround", "Quality candidates"],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Briefcase,
      title: "Specialized Hiring",
      description:
        "Access niche talent pools for technical, creative, and specialized roles across all industries.",
      features: ["Tech recruitment", "Creative roles", "Industry experts"],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: TrendingUp,
      title: "Talent Pipeline",
      description:
        "Build a continuous pipeline of qualified candidates ready to join when opportunities arise.",
      features: ["Proactive sourcing", "Talent mapping", "Market insights"],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: UserCheck,
      title: "Contract Staffing",
      description:
        "Flexible staffing solutions for temporary, contract-to-hire, and project-based positions.",
      features: ["Flexible terms", "Quick deployment", "Compliance handled"],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Globe,
      title: "Global Recruitment",
      description:
        "Expand your talent search internationally with our global recruitment network and expertise.",
      features: ["International reach", "Visa support", "Cultural integration"],
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Target,
      title: "Campus Hiring",
      description:
        "Connect with fresh graduates and early-career professionals through our campus recruitment programs.",
      features: ["University partnerships", "Graduate programs", "Internships"],
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Award,
      title: "RPO Services",
      description:
        "Outsource your entire recruitment function or specific hiring needs to our dedicated team.",
      features: [
        "End-to-end recruitment",
        "Scalable solutions",
        "Cost effective",
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
            From executives to entry-level, from permanent to contract - we
            cover all your hiring needs
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
