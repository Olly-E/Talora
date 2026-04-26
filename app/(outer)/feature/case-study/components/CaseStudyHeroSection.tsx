import {
  ArrowRight,
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/app/components/elements/Button";

export default function CaseStudyHeroSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "60%",
      label: "Faster Hiring Process",
      position: "top-4 right-4 lg:top-6 lg:right-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Target,
      value: "80%+",
      label: "Qualified Candidates Presented",
      position: "bottom-4 left-4 lg:bottom-6 lg:left-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Award,
      value: "3x",
      label: "Process Efficiency Improvement",
      position: "top-4 left-4 lg:top-1/2 lg:left-6 lg:-translate-y-1/2",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gray-50">
      <div className="container sm:pb-10 sm:pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8 bg-secondary rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 w-fit flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <span className="text-sm font-medium">Proven Results</span>
              </div>

              <h1 className="text-white leading-tight font-semibold!">
                Real Outcomes from{" "}
                <span className="text-primary">
                  Structured Hiring and Automation
                </span>
              </h1>

              <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                See how teams have improved hiring efficiency, candidate
                quality, and overall HR operations through structured
                recruitment and automation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/20 p-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Recruitment Services
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/20 p-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Recruitment Automation
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="md" as="link" href="#success-stories">
                View Success Stories
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="md"
                variant="outlineWhite"
                as="link"
                href="/book-call#calendly-section"
              >
                Discuss Your Hiring Needs
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="order-1 lg:order-2 relative h-full">
            <div className="relative rounded-3xl overflow-hidden bg-secondary shadow-2xl h-full min-h-100">
              <Image
                src="https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-13391.jpg"
                alt="Case Studies Success"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/20 to-transparent" />

              {/* Floating Stats Cards */}
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`absolute ${stat.position} bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg backdrop-blur-sm w-40 lg:w-52`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                      <div
                        className={`rounded-full ${stat.iconBg} p-1.5 lg:p-2`}
                      >
                        <Icon
                          className={`size-4 lg:size-5 ${stat.iconColor}`}
                        />
                      </div>
                    </div>
                    <div className="text-lg lg:text-xl font-bold text-gray-900 mb-0.5 lg:mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] lg:text-xs text-gray-600 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
