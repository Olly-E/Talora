import {
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Factory,
  Landmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import proffGridImg from "@/public/images/proffGrid.webp";

const industries = [
  {
    name: "Technology",
    icon: Building2,
    description: "Fast-growing tech companies and startups",
    color: "from-purple-500/20 to-purple-600/20",
    iconBg: "bg-purple-500",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Hospitals, clinics, and medical facilities",
    color: "from-red-500/20 to-pink-600/20",
    iconBg: "bg-red-500",
  },
  {
    name: "Education",
    icon: GraduationCap,
    description: "Schools, universities, and training centers",
    color: "from-blue-500/20 to-blue-600/20",
    iconBg: "bg-blue-500",
  },
  {
    name: "Retail",
    icon: ShoppingBag,
    description: "Retail chains and e-commerce businesses",
    color: "from-orange-500/20 to-orange-600/20",
    iconBg: "bg-orange-500",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Production facilities and industrial plants",
    color: "from-gray-500/20 to-gray-600/20",
    iconBg: "bg-gray-700",
  },
  {
    name: "Finance",
    icon: Landmark,
    description: "Banks, insurance, and financial services",
    color: "from-green-500/20 to-green-600/20",
    iconBg: "bg-green-600",
  },
];

export default function ServiceIndustriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="bg-primary flex items-center gap-2 text-secondary text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full mb-6 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-secondary" />
            Industries We Serve
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Specialized Solutions for Your Industry
          </h2>
          <p className="text-gray-600 text-lg">
            We understand that every industry has unique HR challenges. Our
            solutions are tailored to meet the specific needs of your sector
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-7xl mx-auto">
          {/* Left - Industries Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="relative overflow-hidden rounded-3xl p-8 bg-secondary border border-secondary hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="border border-white bg-white rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="size-8 text-black" strokeWidth={2} />
                  </div>

                  <h3 className="font-bold text-2xl mb-2 text-white">
                    {industry.name}
                  </h3>

                  <p className="text-white/80 text-sm">
                    {industry.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/10 blur-2xl" />
                </div>
              );
            })}
          </div>

          {/* Right - Image */}
          <div className="relative flex-1 min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={proffGridImg}
              alt="Diverse Industries We Serve"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/10 to-transparent" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Don&apos;t see your industry? We work with businesses across all
            sectors.
          </p>
          <Link href="/contact#contact-form">
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-all">
              Contact Us to Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
