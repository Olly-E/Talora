import { CheckCircle2 } from "lucide-react";

export default function HRAutomationProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Process Assessment",
      description:
        "We assess your current recruitment process, identify bottlenecks, and understand your hiring volume, challenges, and operational gaps.",
      highlights: [
        "Recruitment process review",
        "Pain point identification",
        "Hiring volume and workflow analysis",
      ],
    },
    {
      number: "02",
      title: "Workflow Design & System Planning",
      description:
        "We design a customized recruitment workflow aligned with your process, defining how candidates are screened, communicated with, and progressed.",
      highlights: [
        "Workflow mapping",
        "Screening criteria setup",
        "Communication structure design",
      ],
    },
    {
      number: "03",
      title: "Automation Setup & Integration",
      description:
        "We implement and configure your automation system, ensuring all stages from application to interview are streamlined and connected.",
      highlights: [
        "Automation configuration",
        "Tool and system integration",
        "End-to-end workflow setup",
      ],
    },
    {
      number: "04",
      title: "Testing, Optimization & Support",
      description:
        "We test the system, refine workflows, and provide ongoing support to ensure your recruitment process runs efficiently at scale.",
      highlights: [
        "Workflow testing and refinement",
        "Performance optimization",
        "Ongoing system support",
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
            <span className="text-secondary">
              Build Your Recruitment Automation System
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            A structured approach to identifying inefficiencies, designing
            tailored workflows, and implementing automation that streamlines
            your entire recruitment process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 bg-linear-to-br from-primary to-secondary w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {step.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-primary shrink-0" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
