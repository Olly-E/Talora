import React from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

import team1 from "../../../public/images/team1.png";
import team2 from "../../../public/images/team2.jpeg";

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
  { type: "image", image: team1, alt: "Team member" },
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

  { type: "image", image: team2, alt: "Team member" },
];

const AboutTaloraGrid = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-20 container">
      {gridData.map((item, index) => {
        if (item.type === "empty") {
          return <div className="hidden xl:block" key={index}></div>;
        }

        if (item.type === "image") {
          return (
            <div
              key={index}
              className={clsx("rounded-3xl overflow-hidden relative h-80")}
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
            </div>
          );
        }

        if (item.type === "stat") {
          return (
            <div
              key={index}
              className={clsx(
                "rounded-3xl p-8 flex flex-col justify-between h-80",
                item.bgColor,
              )}
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
                  className={clsx("text-xl font-semibold mb-2", item.textColor)}
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
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default AboutTaloraGrid;
