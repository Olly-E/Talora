import Image from "next/image";

import AutomateCard, { AutomateCardProps } from "./AutomateCard";

import calcBig from "../../../public/images/calcBig.webp";
import calc4 from "../../../public/images/calc4 2.webp";
import calc1 from "../../../public/images/calc1.webp";
import calc2 from "../../../public/images/calc2.webp";
import calc3 from "../../../public/images/calc3.webp";

const automateCards: AutomateCardProps[] = [
  {
    title: "Automated Payroll Calculation",
    description:
      "Accurately process salaries, deductions, and taxes with minimal manual input",
    image: (
      <Image
        src={calc1}
        alt="Automated Payroll Calculation"
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    title: "Digital Payslip Distribution",
    description:
      "Accurately process salaries, deductions, and taxes with minimal manual input",
    image: (
      <Image
        src={calc2}
        alt="Digital Payslip Distribution"
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    title: "Automated Benefits Calculation",
    description:
      "Accurately process salaries, deductions, and taxes with minimal manual input",
    image: (
      <Image
        src={calc3}
        alt="Automated Benefits Calculation"
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    title: "Automated Tax Compliance",
    description:
      "Accurately process salaries, deductions, and taxes with minimal manual input",
    image: (
      <Image
        src={calc4}
        alt="Automated Tax Compliance"
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    ),
  },
];

const AutomateSection = () => {
  return (
    <section className=" sm:bg-secondary rounded-3xl my-20 pb-8 md:pb-15">
      <div className="mx-auto">
        <div className="py-8 sm:p-8 md:p-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
                <div className="size-2 rounded-full min-w-2 bg-black" />
                Core Features
              </div>
              <h2 className="text-4xl md:text-5xl font-m leading-tight text-white mb-4">
                Automate Payroll,{" "}
                <span className="text-primary">Simplify Benefits,</span> Empower
                <br className="hidden md:block" />
                Your People
              </h2>
              <p className="text-white/90 text-base mb-6 max-w-xl">
                Key features designed to streamline pay, manage benefits, and
                ensure total compliance every cycle. Key features designed to
                streamline pay, manage benefits, and ensure total compliance
                every cycle.
              </p>
              <button className="bg-white text-secondary! font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all">
                Get Started Now
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full h-100 rounded-2xl overflow-hidden">
                <Image
                  src={calcBig}
                  alt="Payroll Automation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-white text-2xl font-bold mb-6">
            $0 in Payroll Errors Last 12 Months
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide pb-2">
          <div className="flex gap-6 min-w-175 animate-[scroll-x_40s_linear_infinite] will-change-transform">
            {automateCards.map((card, idx) => (
              <AutomateCard key={card.title + idx} {...card} />
            ))}
            {automateCards.map((card, idx) => (
              <AutomateCard key={"dup-" + card.title + idx} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomateSection;
