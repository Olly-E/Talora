import { Search, Users, Rocket, BarChart } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    description:
      "We begin by understanding your unique business needs, challenges, and goals through comprehensive consultation and analysis",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description:
      "Our experts develop a customized HR strategy aligned with your objectives, complete with timelines and measurable outcomes",
    icon: Users,
  },
  {
    number: "03",
    title: "Implementation & Integration",
    description:
      "Seamlessly deploy solutions with minimal disruption, ensuring smooth integration with your existing systems and workflows",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Optimization & Support",
    description:
      "Continuous monitoring, refinement, and dedicated support to ensure sustained success and maximum ROI from your HR investments",
    icon: BarChart,
  },
];

export default function ServiceProcessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="bg-primary flex items-center gap-2 text-secondary text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full mb-6 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-secondary" />
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How We Work With You
          </h2>
          <p className="text-gray-600 text-lg">
            A proven, systematic approach that ensures successful outcomes at
            every stage of your HR transformation journey
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Step number badge */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="size-24 rounded-full bg-secondary flex items-center justify-center relative z-10">
                        <Icon className="size-10 text-white" strokeWidth={2} />
                      </div>
                      <div className="absolute -top-2 -right-2 size-10 rounded-full bg-primary flex items-center justify-center text-secondary font-bold text-sm z-20">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile/tablet */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                      <div className="text-primary text-3xl">↓</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
