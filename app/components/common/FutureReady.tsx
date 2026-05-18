"use client";

import { Settings, Target, ClipboardCheck } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

import { ScrollTriggeredSplitText } from "../animation/SplitTextAnimation";
import { badgeSlideUp } from "@/app/utils/animation";
import { motion, useInView } from "motion/react";
import { Button } from "../elements/Button";

const SERVICES = [
  {
    icon: <Settings className="size-5 text-white" />,
    color: "bg-primary",
    title: "End-to-End Recruitment Automation",
    desc: "We design and implement structured hiring workflows that streamline sourcing, screening, and interview coordination from start to finish.",

    link: "/services/hr-automation",
  },
  {
    icon: <Target className="size-5 text-white" />,
    color: "bg-primary",
    title: "Strategic Talent Sourcing",
    desc: "We proactively identify and engage high quality global candidates, ensuring you have access to strong, well-matched talent.",

    link: "/services/recruitment",
  },
  {
    icon: <ClipboardCheck className="size-5 text-white" />,
    color: "bg-primary",
    title: "Onboarding Systems",
    desc: "We build structured onboarding processes that help new hires integrate quickly and perform effectively from day one.",

    link: "/services",
  },
];

const FutureReady = () => {
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.3 });

  const cardSlideUp = {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const textSlideUp = {
    initial: { y: 5, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full bg-primary/50 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <motion.div
              className="bg-white text-secondary/80 whitespace-nowrap text-sm mb-4 font-medium w-fit shadow-sm px-4 py-1 rounded-full flex items-center gap-2"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={badgeSlideUp}
              transition={{ duration: 0.6 }}
            >
              <div className="size-2 rounded-full min-w-2 bg-secondary" />
              Our Service
            </motion.div>
            <h2 className="text-[34px] sm:text-5xl font-extrabold leading-tight text-secondary mb-2">
              <ScrollTriggeredSplitText
                direction="top"
                delayPerWord={0.03}
                initialDelay={0}
                type="tween"
                tweenDuration={0.5}
              >
                Structured Hiring Solutions
                <br />
                for Growing Teams
              </ScrollTriggeredSplitText>
            </h2>
          </div>
          <Button
            className="bg-secondary! mt-4!"
            variant="secondary"
            as="link"
            href="/services"
          >
            Explore Our Services <span className="text-xl">→</span>
          </Button>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={gridRef}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-3xl p-8 flex flex-col shadow-sm relative"
              initial="initial"
              animate={isGridInView ? "animate" : "initial"}
              variants={cardSlideUp}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className={clsx(
                    "rounded-full p-2 centered size-10",
                    service.color,
                  )}
                >
                  {service.icon}
                </div>
              </div>
              <div className="flex-1 flex justify-between flex-col">
                <motion.h3
                  className="text-2xl font-bold text-secondary my-2"
                  initial="initial"
                  animate={isGridInView ? "animate" : "initial"}
                  variants={textSlideUp}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.2,
                    ease: "easeOut",
                  }}
                >
                  {service.title}
                </motion.h3>
                <div className="">
                  <motion.p
                    className="text-secondary/70 text-sm mb-6"
                    initial="initial"
                    animate={isGridInView ? "animate" : "initial"}
                    variants={textSlideUp}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + 0.4,
                      ease: "easeOut",
                    }}
                  >
                    {service.desc}
                  </motion.p>
                  <motion.div
                    initial="initial"
                    animate={isGridInView ? "animate" : "initial"}
                    variants={textSlideUp}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + 0.6,
                      ease: "easeOut",
                    }}
                  >
                    <Link href={service.link}>
                      <button className="bg-secondary text-white w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
                        Learn more <span className="text-lg">→</span>
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureReady;
