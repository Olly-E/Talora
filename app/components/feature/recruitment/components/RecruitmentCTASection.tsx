import { Button } from "@/app/components/elements/Button";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  Clock,
  Award,
} from "lucide-react";

export default function RecruitmentCTASection() {
  const achievements = [
    {
      icon: Users,
      value: "2500+",
      label: "Successful placements annually",
    },
    {
      icon: Clock,
      value: "18 Days",
      label: "Average time to hire",
    },
    {
      icon: Target,
      value: "95%",
      label: "Candidate retention rate",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Client satisfaction score",
    },
  ];

  const guarantees = [
    "90-day replacement guarantee",
    "Dedicated account manager",
    "Regular progress updates",
    "Post-placement support",
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="bg-linear-to-br from-secondary via-secondary to-secondary/90 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Main Content */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Build Your Dream Team?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Partner with us to find exceptional talent that drives your
                business forward. Let&apos;s start building together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" variant="primary">
                  Start Hiring Now
                  <ArrowRight className="size-5" />
                </Button>
                <Button size="lg" variant="outlineWhite" className="border-2">
                  Download Our Brochure
                </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-12">
                {guarantees.map((guarantee, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-left bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span className="text-sm text-white/90">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors"
                  >
                    <Icon className="size-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                      {achievement.value}
                    </div>
                    <div className="text-sm text-white/80 leading-tight">
                      {achievement.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-white/70 mt-8">
              Join 500+ companies that trust us with their recruitment needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
