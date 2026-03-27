import React from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import gridImg2 from "../../../public/images/gridImg2.webp";
import gridImg1 from "../../../public/images/gridImg1.webp";

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
  { type: "image", image: gridImg1, alt: "Professional team meeting" },
  {
    type: "stat",
    value: "98%",
    title: "Customer Satisfaction",
    description:
      "Our clients love our intuitive interface, responsive support, and continuous feature updates",
    bgColor: "bg-primary",
    textColor: "text-black",
  },
  { type: "empty" },
  {
    type: "stat",
    value: "25+",
    title: "Industries Served",
    description:
      "Companies across industries rely on our platform to manage their HR operations daily",
    bgColor: "bg-secondary",
    textColor: "text-white",
  },

  {
    type: "stat",
    value: "10,000+",
    title: "Active Users",
    description:
      "Companies across industries rely on our platform to manage their HR operations daily",
    bgColor: "bg-secondary",
    textColor: "text-white",
  },
  { type: "empty" },
  {
    type: "stat",
    value: "5 M",
    title: "Minutes to Onboard",
    description:
      "Companies across industries rely on our platform to manage their HR operations daily",
    bgColor: "bg-primary",
    textColor: "text-black",
  },

  { type: "image", image: gridImg2, alt: "Team collaboration workspace" },
];

const AboutTaloraGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 pt-20 container">
      {gridData.map((item, index) => {
        if (item.type === "empty") {
          return <div key={index}></div>;
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
                className="object-cover"
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
              <h3 className={clsx("text-6xl font-bold mb-4", item.textColor)}>
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
