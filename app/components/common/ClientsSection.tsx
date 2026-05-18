"use client";

import { motion } from "motion/react";
import Image from "next/image";
import clsx from "clsx";

import { HeroSplitTextStagger } from "../animation/SplitTextAnimation";
import { blurFadeIn } from "../../utils/animation";

interface ClientsSectionProps {
  className?: string;
}

export default function ClientsSection({
  className = "",
}: ClientsSectionProps) {
  return (
    <motion.div
      className={clsx(className, "rounded-3xl bg-primary p-8 lg:p-10")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black mb-2">
            <HeroSplitTextStagger
              direction="top"
              delayPerWord={0.03}
              initialDelay={0}
              type="tween"
              tweenDuration={0.5}
            >
              Trusted by Growing Companies
            </HeroSplitTextStagger>
          </h3>
          <p className="text-black/90 text-sm">
            <HeroSplitTextStagger
              direction="top"
              delayPerWord={0.03}
              initialDelay={0.5}
              type="tween"
              tweenDuration={0.5}
            >
              Companies working with Talora improve hiring efficiency, candidate
              quality, and overall recruitment consistency.
            </HeroSplitTextStagger>
          </p>
        </div>

        <motion.div
          className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm"
          initial="initial"
          animate="animate"
          variants={blurFadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-secondary overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo1.jpeg"
                alt="Client logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo2.jpeg"
                alt="Client logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-primary overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo3.jpeg"
                alt="Client logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-black font-bold text-sm ml-2">40+</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
