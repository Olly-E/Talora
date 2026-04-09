import { Button } from "@/app/components/elements/Button";
import { ArrowRight, Rocket, Users, TrendingUp, Clock } from "lucide-react";

export default function HRAutomationCTASection() {
  const benefits = [
    {
      icon: Clock,
      value: "70%",
      label: "Reduction in admin time",
    },
    {
      icon: Users,
      value: "500+",
      label: "Companies automated",
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "ROI within 12 months",
    },
    {
      icon: Rocket,
      value: "24/7",
      label: "System uptime",
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
                    <div className="text-sm text-white/80">{benefit.label}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA Content */}
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Automate Your HR?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join hundreds of companies that have transformed their HR
                operations with our automation solutions
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="primary" as="link" href="/book-call">
                  Start Free Trial
                  <ArrowRight className="size-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outlineWhite"
                  className="border-2"
                  as="link"
                  href="/contact#contact-form"
                >
                  Schedule a Demo
                </Button>
              </div>

              <p className="text-sm text-white/70 mt-6">
                No credit card required • Free 14-day trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
