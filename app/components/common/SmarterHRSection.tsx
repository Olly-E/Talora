import React from "react";
import Image from "next/image";
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
  isFirst,
  isLast,
}: BenefitCardProps & { isFirst?: boolean; isLast?: boolean }) => {
  return (
    <div className="flex gap-4 items-start p-6">
      <div className="bg-secondary mt-1 rounded-full p-3 shrink-0">
        <div className="w-6 h-6 text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-black/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
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
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-black" />
            Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
            Build a Better Hiring Process, Achieve Stronger Results
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Talora helps you improve hiring speed, candidate quality, and
            overall recruitment efficiency through structured automations,
            systems and proactive talent sourcing.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          {/* Left Column - Benefits */}
          <div className="bg-primary/40 rounded-3xl overflow-hidden divide-y divide-secondary/10">
            {leftBenefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                {...benefit}
                isFirst={idx === 0}
                isLast={idx === leftBenefits.length - 1}
              />
            ))}
          </div>

          {/* Center Column - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-[3/4] max-w-md bg-gray-200 rounded-2xl">
              Uncomment when image is added:
              <Image
                src={smartImg}
                alt="Professional HR Manager"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="bg-primary/40 rounded-3xl overflow-hidden divide-y divide-secondary/10">
            {rightBenefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                {...benefit}
                isFirst={idx === 0}
                isLast={idx === rightBenefits.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmarterHRSection;
