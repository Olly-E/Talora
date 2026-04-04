import { Clock, DollarSign, Shield, Zap, Heart, Globe } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    stat: "70%",
    description: "Reduction in administrative tasks",
  },
  {
    icon: DollarSign,
    title: "Cut Costs",
    stat: "40%",
    description: "Lower HR operational expenses",
  },
  {
    icon: Shield,
    title: "Stay Compliant",
    stat: "100%",
    description: "Compliance with regulations",
  },
  {
    icon: Zap,
    title: "Boost Efficiency",
    stat: "3x",
    description: "Faster employee onboarding",
  },
  {
    icon: Heart,
    title: "Improve Satisfaction",
    stat: "92%",
    description: "Employee satisfaction rate",
  },
  {
    icon: Globe,
    title: "Scale Globally",
    stat: "50+",
    description: "Countries supported",
  },
];

export default function ServiceBenefitsSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="bg-white/15 border border-white/10 text-white rounded-full px-4 py-2 w-fit flex items-center gap-2 mb-6">
              <div className="size-2 rounded-full min-w-2 bg-primary" />
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Measurable Impact on Your Business
            </h2>

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Our services don&apos;t just solve problems — they transform how
              you manage people, optimize operations, and drive strategic growth
              across your entire organization.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Trusted by Industry Leaders
                  </h4>
                  <p className="text-white/80 text-sm">
                    Join hundreds of companies that have transformed their HR
                    operations with our proven solutions and expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Benefits Grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all group"
                >
                  <div className="bg-primary/20 rounded-full p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="size-6 text-primary" strokeWidth={2} />
                  </div>

                  <div className="text-3xl font-bold text-primary mb-1">
                    {benefit.stat}
                  </div>

                  <div className="text-white font-semibold mb-1">
                    {benefit.title}
                  </div>

                  <div className="text-white/70 text-xs">
                    {benefit.description}
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
