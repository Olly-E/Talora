import {
  Database,
  Calendar,
  FileText,
  Shield,
  UserPlus,
  Users,
  LucideIcon,
} from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

const capabilities: Capability[] = [
  {
    title: "Strategic HR Solutions",
    description:
      "Transform your HR operations with solutions designed to align with your business goals and drive organizational success.",
    icon: Database,
  },
  {
    title: "Tailored Approach",
    description:
      "Every organization is unique. We customize our services to fit your specific needs, culture, and industry requirements.",
    icon: Users,
  },
  {
    title: "Proven Expertise",
    description:
      "Backed by years of experience and industry knowledge, we deliver solutions that consistently exceed expectations.",
    icon: Shield,
  },
  {
    title: "Innovation-Driven",
    description:
      "Stay ahead with cutting-edge HR technology and best practices that keep your organization competitive and agile.",
    icon: FileText,
  },
  {
    title: "End-to-End Support",
    description:
      "From initial consultation to ongoing optimization, we partner with you at every stage of your HR transformation journey.",
    icon: UserPlus,
  },
  {
    title: "Results-Focused",
    description:
      "We measure success by your success. Our commitment is to deliver measurable outcomes that drive real business impact.",
    icon: Calendar,
  },
];

export default function CoreCapabilitiesSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Empowering Organizations, Transforming HR
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Partner with us to modernize your HR operations with comprehensive
            solutions built on expertise, innovation, and commitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
