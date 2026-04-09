import React from "react";

import { Wallet, Users, Mail } from "lucide-react";
import clsx from "clsx";
import { Button } from "../elements/Button";
import Link from "next/link";

const SERVICES = [
  {
    icon: <Wallet className="size-5 text-white" />,
    color: "bg-blue-500",
    title: "Automated Payroll Management",
    desc: "Streamline salary calculations, tax compliance, and payslip distribution — all in just a few clicks.",
    testimonials: "99+ Testimonials",
    link: "/services/hr-automation",
  },
  {
    icon: <Users className="size-5 text-white" />,
    color: "bg-purple-500",
    title: "Recruitment & Applicant Tracking",
    desc: "Streamline salary calculations, tax compliance, and payslip distribution — all in just a few clicks.",
    testimonials: "99+ Testimonials",
    link: "/services/recruitment",
  },
  {
    icon: <Mail className="size-5 text-white" />,
    color: "bg-teal-600",
    title: "Employee Performance Monitoring",
    desc: "Streamline salary calculations, tax compliance, and payslip distribution — all in just a few clicks.",
    testimonials: "99+ Testimonials",
    link: "/services",
  },
];

const FutureReady = () => {
  return (
    <div className="w-full bg-primary/50 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <div className="bg-white text-secondary/80 whitespace-nowrap text-sm mb-4 font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-2 flex items-center gap-2">
              <div className="size-2 rounded-full min-w-2 bg-secondary" />
              Our Service
            </div>
            <h2 className="text-[34px] sm:text-5xl font-extrabold leading-tight text-secondary mb-2">
              Future-Ready
              <br />
              HR Services Platform
            </h2>
          </div>
          <Button
            className="bg-secondary! !mt-4"
            variant="secondary"
            as="link"
            href="/services"
          >
            See More <span className="text-xl">→</span>
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
                  {service.testimonials}
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
