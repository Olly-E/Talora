import Image from "next/image";
import Link from "next/link";

import AutomateCard, { AutomateCardProps } from "./AutomateCard";

import candidateCommunication from "../../../public/images/candidateCommunication.webp";
import interviewCoordination from "../../../public/images/interviewCoordination.webp";
import candidateExperience from "../../../public/images/candidateExperience.webp";
import candidateScreening from "../../../public/images/candidateScreening.webp";
import onboardingSupport from "../../../public/images/onboardingSupport.webp";
import talentSourcing from "../../../public/images/talentSourcing.webp";
import hiringDesign from "../../../public/images/hiringDesign.webp";
import calcBig from "../../../public/images/calcBig.webp";

const automateCards: AutomateCardProps[] = [
  {
    title: "Talent Sourcing",
    description:
      "We proactively identify and engage high quality candidates across global talent pools.",
    image: talentSourcing,
  },
  {
    title: "Candidate Screening",
    description:
      "We assess applicants using structured criteria to ensure alignment with role requirements.",
    image: candidateScreening,
  },
  {
    title: "Interview Coordination",
    description:
      "We manage scheduling and communication to keep your hiring process efficient and organized.",
    image: interviewCoordination,
  },
  {
    title: "Hiring Workflow Design",
    description:
      "We build clear, repeatable processes that improve consistency and reduce hiring delays.",
    image: hiringDesign,
  },
  {
    title: "Candidate Experience",
    description:
      "We ensure timely communication and a professional experience for every applicant.",
    image: candidateExperience,
  },
  {
    title: "Candidate Communication & Feedback",
    description:
      "We provide personalized communication and tailored feedback to every candidate, ensuring clarity, transparency, and a professional hiring experience at every stage.",
    image: candidateCommunication,
  },
  {
    title: "Onboarding Support",
    description:
      "We structure onboarding processes that help new hires integrate and perform quickly.",
    image: onboardingSupport,
  },
];

const AutomateSection = () => {
  return (
    <section className=" sm:bg-secondary rounded-3xl my-20 pb-8 md:pb-10">
      <div className="mx-auto">
        <div className="pt-8 sm:px-8 md:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
                <div className="size-2 rounded-full min-w-2 bg-black" />
                Core Capabilities
              </div>
              <h2 className="text-4xl md:text-5xl font-m leading-tight text-white mb-4">
                Build a{" "}
                <span className="text-primary">Structured Hiring System</span>{" "}
                That Works
              </h2>
              <p className="text-white/90 text-base mb-6 max-w-xl">
                We design and implement recruitment systems that streamline
                sourcing, improve candidate evaluation, and support efficient,
                scalable hiring from start to onboarding.
              </p>
              <Link href="/services">
                <button className="bg-white text-secondary! font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all">
                  Start Hiring Smarter
                </button>
              </Link>
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
        </div>
        <div className="overflow-x-auto scrollbar-hide">
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
