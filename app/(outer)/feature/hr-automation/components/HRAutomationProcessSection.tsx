import { CheckCircle2 } from "lucide-react";

export default function HRAutomationProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Assess & Plan",
      description:
        "We analyze your current HR processes, identify bottlenecks, and create a customized automation roadmap.",
      highlights: ["Process audit", "Requirement analysis", "Custom roadmap"],
    },
    {
      number: "02",
      title: "Configure & Customize",
      description:
        "Our team configures the automation system to match your workflows, policies, and organizational structure.",
      highlights: ["System setup", "Workflow design", "Integration setup"],
    },
    {
      number: "03",
      title: "Train & Launch",
      description:
        "Comprehensive training for your team, followed by a phased rollout to ensure smooth adoption.",
      highlights: ["User training", "Phased rollout", "Go-live support"],
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description:
        "Continuous monitoring, optimization, and scaling as your organization grows and evolves.",
      highlights: [
        "Performance tracking",
        "Ongoing support",
        "Feature updates",
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
            How We <span className="text-secondary">Transform Your HR</span>
          </h2>
          <p className="text-lg text-gray-600">
            A proven 4-step process to automate your HR operations seamlessly
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
