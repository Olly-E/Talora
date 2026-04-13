import type { Metadata } from "next";
import { Play } from "lucide-react";
import { Button } from "../components/elements/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home - HR Solutions & Workforce Management Consulting",
  description:
    "Optimize your workforce management with Talora's all-in-one HR solutions. Expert consulting in recruitment, HR automation, employee engagement, and talent management to drive business success.",
  keywords: [
    "HR solutions",
    "workforce management",
    "HR consulting",
    "recruitment",
    "HR automation",
    "talent management",
    "employee engagement",
    "workforce optimization",
  ],
  openGraph: {
    title: "Talora - Optimize Workforce Management with HR Solutions",
    description:
      "Transform your HR operations with expert consulting and automation. Streamline recruitment, enhance employee engagement, and optimize workforce management.",
    url: "https://taloraagency.com",
    type: "website",
  },
};

import SmarterHRSection from "../components/common/SmarterHRSection";
import AboutTaloraGrid from "../components/common/AboutTaloraGrid";
import AutomateSection from "../components/common/AutomateSection";
import ContactSection from "../components/common/ContactSection";
import ArticleSection from "../components/common/ArticleSection";
import ClientsSection from "../components/common/ClientsSection";
import FutureReady from "../components/common/FutureReady";
import TeamSection from "../components/common/TeamSection";

import heroImg from "../../public/images/heroImg.jpg";

export default function Home() {
  return (
    <div className="">
      <section className="container sm:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <div className="rounded-3xl py-24 bg-secondary px-6 sm:px-10">
              <div className="bg-white/15 border border-white/10 text-white rounded-full px-4 py-1 w-fit mx-auto flex items-center gap-2">
                <div className="size-2 rounded-full min-w-2 bg-primary" />
                <p className=" text-sm">Structured Hiring for Growth</p>
              </div>
              <h1 className="text-center font-semibold! leading-1 mt-4 text-white">
                Build a Hiring System That{" "}
                <span className="text-primary">Scales</span> With Your Business
              </h1>
              <p className="text-center text-white/90 mt-4 text-sm ">
                Talora helps you source high quality global talent, streamline
                your recruitment process, and implement structured hiring
                systems so you can scale your team without operational
                bottlenecks.
              </p>
              <div className="flex items-center gap-4 mt-10 justify-center">
                <Button size="md" as="link" href="/book-call">
                  Book a Strategy Call
                </Button>
                <Button
                  size="md"
                  variant="outlineWhite"
                  as="link"
                  href="/services"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <ClientsSection className="hidden sm:block mt-4" />
          </div>

          <div className="rounded-3xl overflow-hidden bg-gray-2 min-h-150 relative">
            <Image
              src={heroImg}
              alt="HR Solutions - Professional team collaboration"
              fill
              className="object-cover"
              priority
            />
            <div className="bg-black/20 flex justify-between gap-6 backdrop-blur-lg rounded-2xl w-full border border-white/20 bottom-6 left-6 absolute p-6">
              <div className="">
                <div className="text-xs text-white/80 font-semibold tracking-widest">
                  END-TO-END HIRING
                </div>
                <div className="mt-1 text-xl text-white font-bold">
                  Talent Sourcing & Selection
                </div>
              </div>
              <div
                className="rounded-full size-12 min-w-12 bg-white centered mr-6
              "
              >
                <Play
                  color="var(--color-secondary)"
                  fill="var(--color-secondary)"
                  size={12}
                />
              </div>
            </div>
          </div>
          <ClientsSection className="block sm:hidden" />
        </div>
      </section>
      <section className="border-t border-gray-2 my-20 py-20">
        <div className="container flex-col sm:flex-row flex gap-10 items-start justify-between">
          <div className="bg-secondary whitespace-nowrap flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full">
            <div className="size-2  rounded-full min-w-2 bg-primary" />
            About Talora
          </div>
          <h2 className=" max-w-5xl text-[28px] sm:text-end">
            At Talora, we believe hiring should be structured, efficient, and
            built for growth.{" "}
            <span className="text-secondary/60">
              We help companies move away from reactive recruitment by designing
              clear hiring systems, sourcing high quality global talent, and
              streamlining the entire recruitment process from sourcing to
              onboarding.
            </span>
          </h2>
        </div>
        <AboutTaloraGrid />
      </section>
      <section>
        <FutureReady />
      </section>
      <section className="container bg-secondary sm:bg-transparent">
        <AutomateSection />
      </section>
      <section>
        <SmarterHRSection />
      </section>
      <section>
        <TeamSection />
      </section>
      <section>
        <ContactSection />
      </section>
      <section>
        <ArticleSection />
      </section>
    </div>
  );
}
