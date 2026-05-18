"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { blurFadeIn, slideInFromLeft, slideInFromRight } from "../../utils/animation";
import { Button } from "../elements/Button";
import ClientsSection from "./ClientsSection";
import heroImg from "../../../public/images/heroImg.jpg";
import { HeroSplitTextStagger } from "../animation/SplitTextAnimation";

export default function HeroSection() {
  return (
    <section className="container sm:pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <motion.div
            className="rounded-3xl py-24 bg-secondary px-6 sm:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="bg-white/15 border border-white/10 text-white rounded-full px-4 py-1 w-fit mx-auto flex items-center gap-2"
              initial="initial"
              animate="animate"
              variants={slideInFromLeft}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="size-2 rounded-full min-w-2 bg-primary" />
              <p className=" text-sm">Structured Hiring for Growth</p>
            </motion.div>
            <h1 className="text-center font-semibold! leading-1 mt-4 text-white">
              <HeroSplitTextStagger
                direction="none"
                delayPerWord={0.05}
                initialDelay={0}
                type="tween"
                tweenDuration={0.5}
              >
                Build a Hiring System That{" "}
                <span className="text-primary">Scales</span> With Your Business
              </HeroSplitTextStagger>
            </h1>
            <p className="text-center text-white/90 mt-4 text-sm ">
              <HeroSplitTextStagger
                direction="right"
                delayPerWord={0.01}
                initialDelay={0.4}
                type="tween"
                tweenDuration={0.5}
              >
                Talora helps you source high quality global talent, streamline
                your recruitment process, and implement structured hiring
                systems so you can scale your team without operational
                bottlenecks.
              </HeroSplitTextStagger>
            </p>
            <motion.div
              className="flex items-center gap-4 mt-10 justify-center"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div
                variants={blurFadeIn}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button
                  size="md"
                  as="link"
                  href="/book-call#calendly-section"
                  className=""
                >
                  Book a Strategy Call
                </Button>
              </motion.div>
              <motion.div
                variants={blurFadeIn}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Button
                  size="md"
                  variant="outlineWhite"
                  as="link"
                  href="/services"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <ClientsSection className="hidden sm:block mt-4" />
        </div>

        <div className="overflow-hidden min-h-150">
          <motion.div
            className="rounded-3xl overflow-hidden bg-gray-2 h-full relative"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: [1, 0.2, 0.4, 1], delay: 0.4 }}
          >
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
              <div className="rounded-full size-12 min-w-12 bg-white centered mr-6">
                <Play
                  color="var(--color-secondary)"
                  fill="var(--color-secondary)"
                  size={12}
                />
              </div>
            </div>
          </motion.div>
        </div>
        <ClientsSection className="block sm:hidden" />
      </div>
    </section>
  );
}
