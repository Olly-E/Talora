import { FileText, Search, UserCheck, Handshake } from "lucide-react";

export default function RecruitmentProcessSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Understand Requirements",
      description:
        "Deep dive into your hiring needs, company culture, and ideal candidate profile to ensure perfect alignment.",
      details: [
        "Detailed job analysis",
        "Culture assessment",
        "Success criteria definition",
        "Timeline planning",
      ],
    },
    {
      number: "02",
      icon: Search,
      title: "Source & Screen",
      description:
        "Leverage our extensive network, AI-powered tools, and multi-channel approach to find the best candidates.",
      details: [
        "Active candidate sourcing",
        "Passive talent outreach",
        "Initial screening calls",
        "Skills assessment",
      ],
    },
    {
      number: "03",
      icon: UserCheck,
      title: "Evaluate & Interview",
      description:
        "Rigorous evaluation process including technical assessments, behavioral interviews, and reference checks.",
      details: [
        "Technical evaluations",
        "Behavioral interviews",
        "Culture fit assessment",
        "Reference verification",
      ],
    },
    {
      number: "04",
      icon: Handshake,
      title: "Present & Onboard",
      description:
        "Present top candidates, negotiate offers, and support smooth onboarding for long-term success.",
      details: [
        "Candidate presentation",
        "Offer negotiation",
        "Onboarding support",
        "Follow-up & retention",
      ],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-semibold">Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How We{" "}
            <span className="text-secondary">Find Your Perfect Match</span>
          </h2>
          <p className="text-lg text-gray-600">
            A systematic 4-step approach ensuring the best candidates for your
            organization
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-primary opacity-20"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 h-full">
                    {/* Icon Circle */}
                    <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="size-8 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="text-center mb-4">
                      <span className="text-sm font-bold text-gray-400">
                        STEP {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-500 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
