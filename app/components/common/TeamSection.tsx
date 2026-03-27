"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import team1 from "../../../public/images/team1.webp";
import team2 from "../../../public/images/team2.webp";
import team3 from "../../../public/images/team3.webp";
import team4 from "../../../public/images/team4.webp";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: StaticImageData;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jessica Tan",
    title: "Head of Product & Innovation",
    bio: "With over a decade of experience in HR technology, Jessica plays a pivotal role in shaping our product strategy and long-term vision. Her deep understanding of human resource challenges allows her to translate complex processes into intuitive, effective solutions. She leads with a strong focus on user experience, ensuring that every feature we build is not only functional but also truly helpful for HR teams. Jessica is committed to innovation that scales with growing businesses and makes work more efficient for everyone.",
    image: team1,
  },
  {
    name: "Michael Chen",
    title: "Chief Technology Officer",
    bio: "Michael brings 15 years of software engineering expertise to our platform. He architects scalable solutions that handle enterprise-level demands while maintaining lightning-fast performance. His passion for clean code and robust infrastructure ensures our platform remains reliable and secure for all our clients.",
    image: team2,
  },
  {
    name: "Sarah Williams",
    title: "VP of Customer Success",
    bio: "Sarah leads our customer success initiatives with a focus on delivering exceptional value. With her background in HR operations, she understands client needs deeply and ensures our team provides world-class support. Her dedication to customer satisfaction has earned us industry-leading retention rates.",
    image: team3,
  },
  {
    name: "David Rodriguez",
    title: "Director of Engineering",
    bio: "David oversees our engineering teams with a focus on innovation and quality. His expertise in distributed systems and cloud architecture ensures our platform can scale to meet the demands of enterprises worldwide. He's passionate about building technology that empowers HR professionals.",
    image: team4,
  },
];

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden transition-all duration-400 ease-in cursor-pointer bg-secondary min-w-80 hover:min-w-150 h-112.5">
      <div className="flex transition-all duration-400 ease-in group-hover:flex-row group-hover:gap-6 group-hover:pt-4 group-hover:pl-4 group-hover:pb-4 group-hover:pr-8 h-full">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl transition-all duration-400 ease-in w-full h-full group-hover:w-48 group-hover:h-80 group-hover:shrink-0 group-hover:my-auto">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center transition-opacity duration-400 ease-in delay-0 group-hover:delay-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto w-0 overflow-hidden group-hover:w-auto group-hover:flex-1">
          <h3 className="font-bold text-white text-2xl mb-2 whitespace-nowrap">
            {member.name}
          </h3>
          <div className="text-white/80 text-sm mb-4 truncate">
            {member.title}
          </div>
          <p className="text-white/90 text-sm leading-relaxed line-clamp-12">
            {member.bio}
          </p>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-4 transition-all duration-400 ease-in opacity-100 group-hover:opacity-0 group-hover:invisible">
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
              People Behind the
              <br />
              HR Innovation
            </h2>
          </div>

          {/* Navigation */}
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
              <TeamCard key={idx} member={member} />
            ))}
            {teamMembers.map((member, idx) => (
              <TeamCard key={`dup-${idx}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
