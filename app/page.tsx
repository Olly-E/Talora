import { Play } from "lucide-react";
import { Button } from "./components/elements/Button";
import Image from "next/image";

import heroImg from "../public/images/heroImg.jpg";
import AboutTaloraGrid from "./components/common/AboutTaloraGrid";
import FutureReady from "./components/common/FutureReady";
import AutomateSection from "./components/common/AutomateSection";
import SmarterHRSection from "./components/common/SmarterHRSection";
import TeamSection from "./components/common/TeamSection";
import ContactSection from "./components/common/ContactSection";
import ArticleSection from "./components/common/ArticleSection";

export default function Home() {
  return (
    <div className="">
      <section className="container pt-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <div className="rounded-3xl py-24 bg-secondary px-10">
              <div className="bg-white/15 border border-white/10 text-white rounded-full px-4 py-1 w-fit mx-auto flex items-center gap-2">
                <div className="size-2 rounded-full min-w-2 bg-primary" />
                <p className=" text-sm">All in one Efficiency</p>
              </div>
              <h1 className="text-center font-semibold! leading-1 mt-4 text-white">
                <span className="text-primary">Optimize </span>Workforce
                Management with <br /> HR solutions
              </h1>
              <p className="text-center text-white/90 mt-4 text-sm ">
                Simplify every aspect of HR — from recruitment and onboarding to
                payroll, performance reviews, and employee analytics — with a
                secure, <br /> scalable, and user-friendly platform built for
                modern businesses
              </p>
              <div className="flex items-center gap-4 mt-10 justify-center">
                <Button size="md">Get Started Now</Button>
                <Button size="md" variant="outlineWhite">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-4 rounded-3xl bg-primary p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Clients across industries
                  </h3>
                  <p className="text-black/90 text-sm">
                    Many of our clients report better hiring processes and
                    better employee engagement after switching to our system
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-white"></div>
                  </div>
                  <span className="text-black font-bold text-sm ml-2">80+</span>
                </div>
              </div>
            </div>
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
                  TOTAL MANAGEMENT
                </div>
                <div className="mt-1 text-xl text-white font-bold">
                  Smart Onboarding
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
        </div>
      </section>
      <section className="border-t border-gray-2 my-20 py-20">
        <div className="container flex items-start justify-between">
          <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full">
            <div className="size-2 rounded-full min-w-2 bg-primary" />
            About Talora
          </div>
          <h2 className=" max-w-5xl text-[28px] text-end">
            At our core, we believe that great companies are built by empowered
            people. That&apos;s why we created a powerful, intuitive HRM SaaS
            platform{" "}
            <span className="text-secondary/60">
              designed to simplify every stage of the employee lifecycle — from
              recruitment and onboarding to performance tracking and payroll.
            </span>
          </h2>
        </div>
        <AboutTaloraGrid />
      </section>
      <section>
        <FutureReady />
      </section>
      <section className="container">
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
