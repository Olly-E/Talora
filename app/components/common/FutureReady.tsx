import React from "react";

import { Settings, Target, ClipboardCheck } from "lucide-react";
import clsx from "clsx";
import { Button } from "../elements/Button";
import Link from "next/link";

const SERVICES = [
  {
    icon: <Settings className="size-5 text-white" />,
    color: "bg-primary",
    title: "End-to-End Recruitment Automation",
    desc: "We design and implement structured hiring workflows that streamline sourcing, screening, and interview coordination from start to finish.",
    metric: "20+ Companies",
    link: "/services/recruitment",
  },
  {
    icon: <Target className="size-5 text-white" />,
    color: "bg-primary",
    title: "Strategic Talent Sourcing",
    desc: "We proactively identify and engage high quality global candidates, ensuring you have access to strong, well-matched talent.",
    metric: "50+ Placements",
    link: "/services/recruitment",
  },
  {
    icon: <ClipboardCheck className="size-5 text-white" />,
    color: "bg-primary",
    title: "Onboarding Systems",
    desc: "We build structured onboarding processes that help new hires integrate quickly and perform effectively from day one.",
    metric: "20+ Systems Built",
    link: "/services",
  },
];

const FutureReady = () => {
  return (
    <div className="w-full bg-primary/50 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <div className="bg-white text-secondary/80 whitespace-nowrap text-sm mb-4 font-medium w-fit shadow-sm px-4 py-1 rounded-full flex items-center gap-2">
              <div className="size-2 rounded-full min-w-2 bg-secondary" />
              Our Service
            </div>
            <h2 className="text-[34px] sm:text-5xl font-extrabold leading-tight text-secondary mb-2">
              Structured Hiring Solutions
              <br />
              for Growing Teams
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-3xl p-8 flex flex-col gap-6 shadow-sm min-h-90 relative"
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
                <span className="border border-gray-400 text-gray-700 text-xs px-3 py-1 rounded-full bg-white/80 font-medium">
                  {service.metric}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  {service.title}
                </h3>
                <p className="text-secondary/70 text-sm mb-6">{service.desc}</p>
                <Link href={service.link}>
                  <button className="bg-secondary text-white w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
                    See Detail <span className="text-lg">→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureReady;
