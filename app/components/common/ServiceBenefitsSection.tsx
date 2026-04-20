import { Clock, DollarSign, Shield, Zap, Heart, Globe } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Faster Hiring Process",
    stat: "60%",
    description: "Reduced time spent on manual screening and coordination",
  },
  {
    icon: DollarSign,
    title: "Reduced Hiring Waste",
    stat: "60%",
    description: "Fewer unqualified candidates, better selection accuracy",
  },
  {
    icon: Shield,
    title: "Structured Communication",
    stat: "100%",
    description: "Consistent, personalized communication across every stage",
  },
  {
    icon: Zap,
    title: "Improved Efficiency",
    stat: "3x",
    description: "Streamlined workflows from application to interview",
  },
  {
    icon: Heart,
    title: "Improved Hiring Confidence",
    stat: "92%",
    description: "Clear insights and structured candidate evaluation",
  },
  {
    icon: Globe,
    title: "Countries Sourced",
    stat: "20+",
    description: "Access to qualified international professionals",
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
              Measurable Impact on Your Hiring Process
            </h2>

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              We help you reduce hiring inefficiencies, improve candidate
              quality, and build structured recruitment systems that scale with
              your business.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Trusted by Growing Companies
                  </h4>
                  <p className="text-white/80 text-sm">
                    We partner with teams to build structured hiring processes,
                    improve candidate experience, and deliver consistent,
                    high-quality hiring outcomes.
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
