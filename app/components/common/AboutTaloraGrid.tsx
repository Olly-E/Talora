"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useInView } from "motion/react";
import clsx from "clsx";

import { ScrollTriggeredSplitText } from "../animation/SplitTextAnimation";
import { slideInFromRight } from "../../utils/animation";

import gridImg1 from "../../../public/images/gridImg1.webp";
import gridImg2 from "../../../public/images/gridImg2.jpg";

type GridItem =
  | { type: "image"; image: StaticImageData; alt: string }
  | {
      type: "stat";
      value: string;
      title: string;
      description: string;
      bgColor: string;
      textColor: string;
    }
  | { type: "empty" };

const gridData: GridItem[] = [
  { type: "image", image: gridImg1, alt: "Team member" },
  {
    type: "stat",
    value: "98%",
    title: "Structured Hiring Systems",
    description:
      "We design clear, repeatable recruitment processes that improve consistency and reduce hiring inefficiencies.",
    bgColor: "bg-primary",
    textColor: "text-black",
  },
  { type: "empty" },
  {
    type: "stat",
    value: "25+",
    title: "Global Talent Access",
    description:
      "We source and engage high quality candidates across international markets, including top African professionals.",
    bgColor: "bg-secondary",
    textColor: "text-white",
  },
  {
    type: "stat",
    value: "50+",
    title: "Recruitment Automation",
    description:
      "We streamline sourcing, screening, and interview coordination to reduce manual work and speed up hiring.",
    bgColor: "bg-secondary",
    textColor: "text-white",
  },
  { type: "empty" },
  {
    type: "stat",
    value: "40+",
    title: "Onboarding Systems",
    description:
      "We build structured onboarding processes that help new hires integrate quickly and perform effectively.",
    bgColor: "bg-primary",
    textColor: "text-black",
  },

  { type: "image", image: gridImg2, alt: "Team member" },
];

const AboutTaloraGrid = () => {
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.3 });

  // Pre-calculate delays for each item
  let imageCount = 0;
  let statCount = 0;
  const itemDelays = gridData.map((item) => {
    if (item.type === "image") {
      imageCount++;
      return imageCount === 1 ? 0 : 0.1;
    }
    if (item.type === "stat") {
      statCount++;
      return 0.5 + (statCount - 1) * 0.05;
    }
    return 0;
  });

  const slideUpVariant = {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      <div className="container flex-col sm:flex-row flex gap-10 items-start justify-between">
        <motion.div
          className="bg-secondary whitespace-nowrap flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInFromRight}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="size-2  rounded-full min-w-2 bg-primary" />
          About Talora
        </motion.div>
        <h2 className=" max-w-5xl text-[28px] sm:text-end">
          <ScrollTriggeredSplitText
            direction="right"
            delayPerWord={0.03}
            initialDelay={0}
            type="tween"
            tweenDuration={0.5}
          >
            At Talora, we believe hiring should be structured, efficient, and
            built for growth.{" "}
            <span className="text-secondary/60">
              We help companies move away from reactive recruitment by designing
              clear hiring systems, sourcing high quality global talent, and
              streamlining the entire recruitment process from sourcing to
              onboarding.
            </span>
          </ScrollTriggeredSplitText>
        </h2>
      </div>
      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-20 container"
        ref={gridRef}
      >
        {gridData.map((item, index) => {
          if (item.type === "empty") {
            return <div className="hidden xl:block" key={index}></div>;
          }

          if (item.type === "image") {
            return (
              <motion.div
                key={index}
                className={clsx("rounded-3xl overflow-hidden relative h-80")}
                initial="initial"
                animate={isGridInView ? "animate" : "initial"}
                variants={slideUpVariant}
                transition={{
                  duration: 0.4,
                  delay: itemDelays[index],
                  ease: "easeOut",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={clsx(
                    "object-cover object-[40%_20%]",
                    item.image &&
                      index === gridData.length - 1 &&
                      "object-[40%_30%]",
                  )}
                />
              </motion.div>
            );
          }

          if (item.type === "stat") {
            return (
              <motion.div
                key={index}
                className={clsx(
                  "rounded-3xl p-8 flex flex-col justify-between h-80",
                  item.bgColor,
                )}
                initial="initial"
                animate={isGridInView ? "animate" : "initial"}
                variants={slideUpVariant}
                transition={{
                  duration: 0.4,
                  delay: itemDelays[index],
                  ease: "easeOut",
                }}
              >
                <h3
                  className={clsx(
                    "text-5xl xl:text-6xl font-bold mb-4",
                    item.textColor,
                  )}
                >
                  {item.value}
                </h3>

                <div className="">
                  <p
                    className={clsx(
                      "text-xl font-semibold mb-2",
                      item.textColor,
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={clsx(
                      "text-sm",
                      item.textColor === "text-black"
                        ? "text-black/80"
                        : "text-white/70",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </>
  );
};

export default AboutTaloraGrid;
