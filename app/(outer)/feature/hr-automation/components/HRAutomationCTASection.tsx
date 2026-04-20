import { Button } from "@/app/components/elements/Button";
import { ArrowRight, Rocket, Users, TrendingUp, Clock } from "lucide-react";

export default function HRAutomationCTASection() {
  const benefits = [
    {
      icon: Clock,
      value: "70%",
      label: "Less Manual Work",
      description: "Reduced time spent on screening and coordination",
    },
    {
      icon: Rocket,
      value: "End-to-End",
      label: "Automated Workflow",
      description: "From application to interview, fully streamlined",
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Faster Candidate Progression",
      description: "Quicker movement through each hiring stage",
    },
    {
      icon: Users,
      value: "Consistent",
      label: "Structured Communication",
      description: "Personalized updates across every stage",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="bg-linear-to-br from-secondary via-secondary to-secondary/90 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <Icon className="size-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                      {benefit.value}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">
                      {benefit.label}
                    </div>
                    <div className="text-xs text-white/70">
                      {benefit.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Content */}
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                A Recruitment System That Works Without Constant Oversight
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Once implemented, your recruitment automation system runs with
                structure and consistency, reducing manual effort while ensuring
                every candidate is properly screened and communicated with.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="primary" as="link" href="/book-call">
                  Speak With Our Team
                  <ArrowRight className="size-5" />
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
