import {
  ArrowRight,
  Users,
  CheckCircle2,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

import recruitmentHeroImg from "@/public/images/recruitmentHero.webp";
import { Button } from "@/app/components/elements/Button";

export default function RecruitmentHeroSection() {
  const stats = [
    {
      icon: Target,
      value: "95%",
      label: "Match Rate",
      position: "top-4 left-4 lg:top-6 lg:left-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: TrendingUp,
      value: "18 Days",
      label: "Avg Time to Hire",
      position: "bottom-4 right-4 lg:bottom-6 lg:right-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Award,
      value: "2500+",
      label: "Placements/Year",
      position: "bottom-4 left-4 lg:bottom-1/4 lg:left-6",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gray-50">
      <div className="container sm:pt-5 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8 bg-secondary rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 w-fit flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span className="text-sm font-medium">Expert Recruitment</span>
              </div>

              <h1 className="text-white leading-tight font-semibold!">
                Find Top Talent,{" "}
                <span className="text-primary">Build Great Teams</span>
              </h1>

              <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                Connect with the best candidates who don&apos;t just meet your
                requirements, but align with your culture and drive your
                business forward.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Executive Search
                    </h3>
                    <p className="text-xs text-white/70">Leadership roles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Volume Hiring
                    </h3>
                    <p className="text-xs text-white/70">Scale quickly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Specialized Roles
                    </h3>
                    <p className="text-xs text-white/70">Niche expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Talent Pipeline
                    </h3>
                    <p className="text-xs text-white/70">Future-ready</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="md" as="link" href="/book-call">
                Start Hiring
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="md"
                variant="outlineWhite"
                as="link"
                href="/case-studies"
              >
                View Success Stories
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="order-1 lg:order-2 relative h-full">
            <div className="relative rounded-3xl overflow-hidden bg-secondary shadow-2xl h-full min-h-100">
              <Image
                src={recruitmentHeroImg}
                alt="Recruitment Services"
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
                    className={`absolute ${stat.position} bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg backdrop-blur-sm w-32 lg:w-40`}
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
                    <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-0.5 lg:mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 leading-tight">
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
