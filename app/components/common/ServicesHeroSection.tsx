import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import Image from "next/image";

import serviceHeroImg from "@/public/images/serviceHero.webp";
import { Button } from "../elements/Button";

export default function ServicesHeroSection() {
  const stats = [
    {
      icon: Users,
      value: "Built for",
      label: "Growing Teams",
      position: "top-4 right-4 lg:top-6 lg:right-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: TrendingUp,
      value: "Global",
      label: "Talent Access",
      position: "bottom-4 left-4 lg:bottom-6 lg:left-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Shield,
      value: "Structured",
      label: "Hiring Systems",
      position: "top-4 left-4 lg:top-1/2 lg:left-6 lg:-translate-y-1/2",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="relative w-full container overflow-hidden bg-gray-50">
      <div className="sm:pt-5 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8 bg-secondary rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 w-fit flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-medium">
                  Structured Hiring Solutions
                </span>
              </div>

              <h1 className="text-white leading-tight font-semibold!">
                Build a Structured Hiring System That{" "}
                <span className="text-primary">Scales</span>
              </h1>

              <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                Build a structured hiring system that improves how you source,
                evaluate, and onboard talent. From initial sourcing to final
                onboarding, every stage of your recruitment process is designed
                to be clear, efficient, and scalable.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Recruitment Automation
                    </h3>
                    <p className="text-xs text-white/70">
                      Streamlined hiring workflows
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Talent Sourcing
                    </h3>
                    <p className="text-xs text-white/70">
                      High-quality candidate sourcing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Hiring Process Design
                    </h3>
                    <p className="text-xs text-white/70">
                      Structured hiring systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Onboarding Systems
                    </h3>
                    <p className="text-xs text-white/70">Seamless onboarding</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="md" className="" as="link" href="/book-call">
                Book a Strategy Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="order-1 lg:order-2 relative h-full">
            <div className="relative rounded-3xl overflow-hidden bg-secondary shadow-2xl h-full min-h-[400px]">
              <Image
                src={serviceHeroImg}
                alt="Professional HR Services Team"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />

              {/* Floating Stats Cards */}
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`absolute ${stat.position} bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg backdrop-blur-sm w-36 lg:w-44`}
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
                    <div className="text-lg lg:text-xl font-bold text-secondary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] lg:text-xs text-secondary/60">
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
