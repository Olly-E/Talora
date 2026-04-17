import { FileText, Search, UserCheck, Handshake } from "lucide-react";

export default function RecruitmentProcessSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Define Your Hiring Needs",
      description:
        "We work closely with you to understand the role, expectations, and the type of candidate that will succeed in your team.",
      details: [
        "Role and requirement alignment",
        "Candidate profile definition",
        "Success criteria clarity",
        "Hiring timeline planning",
      ],
    },
    {
      number: "02",
      icon: Search,
      title: "Source and Shortlist Candidates",
      description:
        "We identify and engage strong candidates, ensuring you receive only qualified profiles aligned with your requirements.",
      details: [
        "Targeted talent sourcing",
        "Access to passive candidates",
        "Initial screening and filtering",
        "Qualified candidate shortlisting",
      ],
    },
    {
      number: "03",
      icon: UserCheck,
      title: "Evaluate with Structure and Clarity",
      description:
        "Candidates are assessed through a consistent process so you can make confident and informed hiring decisions.",
      details: [
        "Structured candidate evaluation",
        "Role-based assessments",
        "Fit and alignment checks",
        "Clear candidate insights",
      ],
    },
    {
      number: "04",
      icon: Handshake,
      title: "Select and Secure the Right Hire",
      description:
        "We support you through final selection and ensure a smooth transition from offer to onboarding.",
      details: [
        "Candidate presentation",
        "Offer coordination",
        "Candidate communication",
        "Smooth onboarding support",
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
            <span className="text-secondary">Deliver the Right Candidates for Your Team</span>
          </h2>
          <p className="text-lg text-gray-600">
            A structured hiring approach designed to help you identify, evaluate, and secure the right talent with clarity and confidence.
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
