"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ScrollTriggeredSplitText } from "../animation/SplitTextAnimation";
import {
  Rocket,
  Users,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import smartImg from "../../../public/images/smartImg.webp";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({
  icon,
  title,
  description,
  isInView,
  delay,
  direction,
}: BenefitCardProps & {
  isInView: boolean;
  delay: number;
  direction: "left" | "right";
}) => {
  const cardStagger = {
    initial: { x: direction === "left" ? -200 : 200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex gap-4 items-start p-6"
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={cardStagger}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div className="bg-secondary mt-1 rounded-full p-3 shrink-0">
        <div className="w-6 h-6 text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-black/70 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const leftBenefits: BenefitCardProps[] = [
  {
    icon: <Rocket size={24} />,
    title: "Faster Hiring Process",
    description:
      "Reduce time-to-hire through structured workflows, proactive sourcing, and streamlined coordination.",
  },
  {
    icon: <Users size={24} />,
    title: "Improved Candidate Experience",
    description:
      "Deliver clear communication and personalized feedback, ensuring every candidate has a professional experience.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Better Hiring Decisions",
    description:
      "Use structured evaluation frameworks to identify the right candidates with confidence and consistency.",
  },
];

const rightBenefits: BenefitCardProps[] = [
  {
    icon: <TrendingUp size={24} />,
    title: "Scalable Hiring Systems",
    description:
      "Implement processes that remain efficient and consistent as your team grows.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Structured Recruitment Workflows",
    description:
      "Replace ad hoc hiring with clear, repeatable systems that improve efficiency and reduce errors.",
  },
  {
    icon: <Handshake size={24} />,
    title: "Aligned Team Collaboration",
    description:
      "Ensure hiring managers and stakeholders are aligned through clear processes and communication.",
  },
];

const SmarterHRSection = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const badgeSlideUp = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const columnSlideIn = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4 mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={badgeSlideUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="size-2 rounded-full min-w-2 bg-black" />
            Benefits
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
            <ScrollTriggeredSplitText
              direction="top"
              delayPerWord={0.03}
              initialDelay={0}
              type="tween"
              tweenDuration={0.5}
            >
              Build a Better Hiring Process, Achieve Stronger Results
            </ScrollTriggeredSplitText>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            <ScrollTriggeredSplitText
              direction="bottom"
              delayPerWord={0.03}
              initialDelay={0.3}
              type="tween"
              tweenDuration={0.5}
            >
              Talora helps you improve hiring speed, candidate quality, and
              overall recruitment efficiency through structured automations,
              systems and proactive talent sourcing.
            </ScrollTriggeredSplitText>
          </p>
        </div>

        {/* Grid Layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center"
          ref={sectionRef}
        >
          {/* Left Column - Benefits */}
          <motion.div
            className="bg-primary/40 rounded-3xl overflow-hidden divide-y divide-secondary/10"
            initial="initial"
            animate={isSectionInView ? "animate" : "initial"}
            variants={columnSlideIn}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {leftBenefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                {...benefit}
                isInView={isSectionInView}
                delay={0.6 + idx * 0.1}
                direction="left"
              />
            ))}
          </motion.div>

          {/* Center Column - Image */}
          <div className="flex items-center justify-center">
            <motion.div
              className="relative w-full aspect-3/4 max-w-md bg-gray-200 rounded-2xl overflow-hidden"
              initial={{ clipPath: "inset(50% 0 50% 0)" }}
              animate={
                isSectionInView
                  ? { clipPath: "inset(0 0 0 0)" }
                  : { clipPath: "inset(50% 0 50% 0)" }
              }
              transition={{ duration: 0.8, delay: 1.2, ease: [1, 0, 1, 1] }}
            >
              <Image
                src={smartImg}
                alt="Professional HR Manager"
                fill
                className="object-cover rounded-2xl"
                style={{ objectPosition: "-300px center" }}
              />
            </motion.div>
          </div>

          {/* Right Column - Benefits */}
          <motion.div
            className="bg-primary/40 rounded-3xl overflow-hidden divide-y divide-secondary/10"
            initial="initial"
            animate={isSectionInView ? "animate" : "initial"}
            variants={columnSlideIn}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {rightBenefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                {...benefit}
                isInView={isSectionInView}
                delay={0.6 + idx * 0.1}
                direction="right"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmarterHRSection;
