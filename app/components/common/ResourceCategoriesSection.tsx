import {
  Target,
  Lightbulb,
  Shield,
  Users,
  Heart,
  TrendingUp,
  Globe,
  BookOpen,
  LucideIcon,
} from "lucide-react";

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, delivering quality solutions that exceed expectations.",
    icon: Target,
  },
  {
    title: "Innovation",
    description:
      "We continuously innovate to stay ahead, embracing new ideas and technologies.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency and honesty, building trust through ethical practices.",
    icon: Shield,
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, working together to achieve shared goals.",
    icon: Users,
  },
  {
    title: "Customer Focus",
    description:
      "Your success is our success. We prioritize understanding and meeting your needs.",
    icon: Heart,
  },
  {
    title: "Growth Mindset",
    description:
      "We embrace challenges and view them as opportunities to learn and improve.",
    icon: TrendingUp,
  },
  {
    title: "Diversity & Inclusion",
    description:
      "We celebrate diverse perspectives and create an inclusive environment for all.",
    icon: Globe,
  },
  {
    title: "Continuous Learning",
    description:
      "We invest in ongoing development, staying current with industry trends and best practices.",
    icon: BookOpen,
  },
];

export default function ResourceCategoriesSection() {
  return (
    <section className="py-20 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary flex items-center gap-2 text-black/80 text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
          <div className="size-2 rounded-full min-w-2 bg-black" />
          Our Core Values
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight max-w-2xl">
            Values That Drive Our Mission
          </h2>
          <p className="text-white/80 max-w-md md:text-right text-sm sm:text-base">
            These principles guide everything we do and shape how we serve our
            clients and build lasting partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
