import {
  Calendar,
  CheckCircle2,
  Clock,
  Video,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "../elements/Button";
import Image from "next/image";
import contactHeroImg from "@/public/images/contactHero.webp";

export default function BookCallHeroSection() {
  const stats = [
    {
      icon: Clock,
      value: "30 Min",
      label: "Free Consultation",
      position: "top-4 right-4 lg:top-6 lg:right-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      value: "500+",
      label: "Happy Clients",
      position: "bottom-4 left-4 lg:bottom-6 lg:left-6",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Video,
      value: "24/7",
      label: "Flexible Scheduling",
      position: "top-4 left-4 lg:top-1/2 lg:left-6 lg:-translate-y-1/2",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gray-50">
      <div className="sm:pt-5 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8 bg-secondary rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 w-fit flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-medium">
                  Free Strategy Session
                </span>
              </div>

              <h1 className="text-white leading-tight font-semibold!">
                Let&apos;s Discuss Your{" "}
                <span className="text-primary">HR Challenges</span>
              </h1>

              <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                Schedule a complimentary 30-minute consultation with our HR
                experts. We&apos;ll explore your unique challenges and provide
                tailored recommendations to transform your workforce operations.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Personalized Advice
                    </h3>
                    <p className="text-xs text-white/70">Custom HR solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      No Commitment
                    </h3>
                    <p className="text-xs text-white/70">
                      Zero pressure approach
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Expert Guidance
                    </h3>
                    <p className="text-xs text-white/70">
                      Seasoned HR professionals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/20 p-1 mt-1">
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      Quick Response
                    </h3>
                    <p className="text-xs text-white/70">
                      Instant confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="md" className="" as="link" href="#calendly-section">
                Schedule Now
                <Calendar className="w-5 h-5" />
              </Button>
              <Button
                size="md"
                variant="outlineWhite"
                as="link"
                href="/contact"
              >
                Send Message Instead
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="order-1 lg:order-2 relative h-full">
            <div className="relative rounded-3xl overflow-hidden bg-secondary shadow-2xl h-full min-h-[400px]">
              <Image
                src={contactHeroImg}
                alt="Book a Consultation with Talora HR Experts"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />

              {/* Floating Stats Cards */}
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className={`absolute ${stat.position} bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${stat.iconBg} p-2 rounded-xl`}>
                        <IconComponent className={`size-5 ${stat.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 whitespace-nowrap">
                          {stat.label}
                        </p>
                      </div>
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
