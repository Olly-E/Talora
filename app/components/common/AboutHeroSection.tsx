import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "../elements/Button";

import aboutUsBig from "../../../public/images/aboutUsBig.webp";

const customerAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
];

export default function AboutHeroSection() {
  return (
    <section className="relative w-full sm:h-150 md:h-175 sm:px-6 ">
      <div className="relative sm:rounded-3xl overflow-hidden sm:mt-5 py-24">
        <div className="absolute inset-0">
          <Image
            src={aboutUsBig}
            alt="About us hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container h-full flex items-center px-6 md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 pl-2 pr-5 py-2 w-fit mb-8">
              <div className="flex -space-x-2">
                {customerAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                  >
                    <Image
                      src={avatar}
                      alt="Customer"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-white relative z-2 text-black -ml-4.5 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold whitespace-nowrap text-black">
                  Built for scaling teams
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold! text-white mb-6 leading-tight">
              Build a Structured Hiring System That Scales With Your Business
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed lg:w-125">
              Talora helps growing companies source global talent, automate
              recruitment processes, and hire efficiently without operational
              bottlenecks.
            </p>
            <Button
              variant="secondary"
              className="bg-secondary!"
              as="link"
              href="/case-studies"
            >
              Discover Our Story{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
