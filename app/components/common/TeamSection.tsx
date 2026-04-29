"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import team5 from "../../../public/images/team5.webp";
import team6 from "../../../public/images/team6.jpeg";
import team2 from "../../../public/images/team2.jpeg";
import team1 from "../../../public/images/team1.png";
import team3 from "../../../public/images/team3.png";
import team4 from "../../../public/images/team4.png";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: StaticImageData;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chinedu C. Duru",
    title: "Strategic Recruitment Partner & Advisor",
    bio: "A seasoned HR and recruitment executive with over two decades of experience leading talent acquisition and executive search operations across Africa and internationally. His expertise spans executive search, recruitment strategy, HR systems, leadership development and outsourcing across multiple industries. Having built and led recruitment operations at both boutique and global firms, Chinedu brings deep industry relationships and unparalleled expertise to Talora Agency. As Strategic Recruitment Partner and Advisor, he strengthens Talora’s ability to deliver structured, high quality hiring solutions for growing companies.",
    image: team3,
  },
  {
    name: "Adlaide O.J",
    title: "HR Automation Strategist & Lead Recruiter",
    bio: "An HR Automation Strategist and Recruiter with a strong passion for transforming how businesses hire, Adlaide leads Talora Agency’s automation and recruitment operations. Specialising in designing intelligent hiring workflows, she helps growing companies move from reactive, manual recruitment to structured, scalable systems that save time and deliver better results. With hands on expertise across HR process automation, workflow design, talent acquisition and HR technology integration, she brings both strategic thinking and practical execution to every client engagement.",
    image: team6,
  },
  {
    name: "Sarah Omini",
    title: "Senior Talent Acquisition Specialist",
    bio: "A dedicated Senior Talent Acquisition Specialist and one of Talora Agency’s founding team members, Sarah brings a strong background in end to end recruitment with a specialisation in proactive talent sourcing, candidate engagement and building quality pipelines across multiple industries. With a sharp eye for talent and a deep understanding of what it takes to identify and attract the right candidates, her experience and dedication have been foundational to how Talora approaches hiring today.",
    image: team2,
  },
  {
    name: "Esther Kunye",
    title: "Talent Acquisition Specialist",
    bio: "A dedicated Talent Acquisition Specialist with a strong eye for talent and a commitment to delivering quality candidate experiences. At Talora Agency, she plays a key role in managing the recruitment process, ensuring every candidate interaction is professional, structured and efficient. Esther is passionate about connecting the right people with the right opportunities while maintaining the high standards.",
    image: team1,
  },
  {
    name: "Emmanuel Akinsiku",
    title: "Software Engineer",
    bio: "Emmanuel develops and maintains our platform's core features with a focus on innovation and quality. His work ensures our clients have a seamless, reliable experience while managing their recruitment processes. He's passionate about building technology that empowers HR professionals.",
    image: team4,
  },
  {
    name: "Victoria James",
    title: "Digital Content & Social Media Specialist",
    bio: "A creative and detail oriented Digital Content and Social Media Specialist, Victoria plays a key role in shaping Talora Agency’s online presence across LinkedIn, TikTok and Instagram. From designing compelling graphics to crafting engaging copy and managing community interactions, she ensures Talora’s brand voice remains consistent, relevant and impactful. Her work keeps Talora connected to its audience and positioned as a thought leader in the recruitment and HR automation space.",
    image: team5,
  },
];

const TeamCard = ({
  member,
  isExpanded,
  onClick,
}: {
  member: TeamMember;
  isExpanded: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-400 ease-in cursor-pointer bg-secondary h-96 md:h-112.5 ${
        isExpanded
          ? "min-w-full md:min-w-150"
          : "min-w-64 md:min-w-80 md:hover:min-w-150"
      }`}
    >
      <div
        className={`flex h-full transition-all duration-400 ease-in ${
          isExpanded
            ? "flex-row gap-4 md:gap-6 pt-3 pl-3 pb-3 pr-6 md:pt-4 md:pl-4 md:pb-4 md:pr-8"
            : "flex-col md:flex-col md:group-hover:flex-row md:group-hover:gap-6 md:group-hover:pt-4 md:group-hover:pl-4 md:group-hover:pb-4 md:group-hover:pr-8"
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-400 ease-in ${
            isExpanded
              ? "w-40 md:w-48 h-64 md:h-80 shrink-0 my-auto"
              : "w-full h-full md:group-hover:w-48 md:group-hover:h-80 md:group-hover:shrink-0 md:group-hover:my-auto"
          }`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <div
          className={`flex flex-col justify-center transition-opacity duration-400 ease-in overflow-hidden ${
            isExpanded
              ? "opacity-100 pointer-events-auto w-auto flex-1 delay-400"
              : "opacity-0 pointer-events-none w-0 h-0 delay-0 md:group-hover:delay-400 md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:group-hover:w-auto md:group-hover:h-auto md:group-hover:flex-1"
          }`}
        >
          <h3 className="font-bold text-white text-xl md:text-2xl mb-2 whitespace-nowrap">
            {member.name}
          </h3>
          <div className="text-white/80 text-xs md:text-sm mb-4 truncate">
            {member.title}
          </div>
          <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-12">
            {member.bio}
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-3 left-3 right-4 transition-all duration-400 ease-in ${
          isExpanded
            ? "opacity-0 invisible"
            : "opacity-100 md:group-hover:opacity-0 md:group-hover:invisible"
        }`}
      >
        <div className="bg-secondary p-2 rounded-xl w-fit">
          <h3 className="font-bold text-white text-sm text-left">
            {member.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
              <div className="size-2 rounded-full min-w-2 bg-black" />
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              The Team Behind Your <br /> Hiring Systems
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="group w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-transparent hover:bg-secondary transition-all duration-400"
              aria-label="Previous"
            >
              <ChevronLeft
                size={24}
                className="text-gray-700 group-hover:text-white transition-colors duration-400"
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="group w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-transparent hover:bg-secondary transition-all duration-400"
              aria-label="Next"
            >
              <ChevronRight
                size={24}
                className="text-gray-700 group-hover:text-white transition-colors duration-400"
              />
            </button>
          </div>
        </div>

        {/* Team Horizontal Scroll */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6">
            {teamMembers.map((member, idx) => (
              <TeamCard
                key={idx}
                member={member}
                isExpanded={expandedCard === idx}
                onClick={() => handleCardClick(idx)}
              />
            ))}
            {teamMembers.map((member, idx) => (
              <TeamCard
                key={`dup-${idx}`}
                member={member}
                isExpanded={expandedCard === teamMembers.length + idx}
                onClick={() => handleCardClick(teamMembers.length + idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
