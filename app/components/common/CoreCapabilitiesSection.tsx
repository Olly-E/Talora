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
    title: "Proactive Talent Sourcing",
    description:
      "We identify and engage high quality candidates globally, including African professionals and international contractors, so you are not dependent on inbound applications.",
    icon: Users,
  },
  {
    title: "Structured Hiring Systems",
    description:
      "We design clear, repeatable recruitment processes that improve consistency, reduce hiring errors, and support long term team growth",
    icon: Database,
  },
  {
    title: "Recruitment Automation",
    description:
      "We build end to end workflows that streamline sourcing, screening and interview coordination, reducing manual effort and saving time.",
    icon: Calendar,
  },
  {
    title: "Candidate Experience",
    description:
      "We ensure every candidate receives clear communication, timely updates, and a professional hiring experience that reflects your company.",
    icon: FileText,
  },
  {
    title: "Strategic Hiring Support",
    description:
      "We work closely with you or your leadership team to define roles, evaluate candidates effectively, and make confident hiring decisions.",
    icon: Shield,
  },
  {
    title: "Onboarding Systems",
    description:
      "We design structured onboarding processes that help new hires integrate quickly and start contributing from day one.",
    icon: UserPlus,
  },
];

export default function CoreCapabilitiesSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hiring Should Not Slow Down Your Growth
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            We helps growing companies build structured recruitment systems,
            source high quality global talent, and automate hiring workflows so
            you can scale your team without operational complexity.
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
