import {
  Workflow,
  Users,
  FileCheck,
  Calendar,
  DollarSign,
  BarChart3,
  Bell,
  Lock,
} from "lucide-react";

export default function HRAutomationFeaturesSection() {
  const features = [
    {
      icon: Workflow,
      title: "Application & Workflow Automation",
      description:
        "Automatically manage candidate applications through a structured workflow that ensures consistency, speed, and zero manual bottlenecks.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: FileCheck,
      title: "Automated Candidate Screening",
      description:
        "Evaluate applicants against predefined criteria to quickly identify qualified candidates and filter out mismatches.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Bell,
      title: "Structured Candidate Communication",
      description:
        "Deliver personalized, stage-based communication so candidates receive clear updates, not generic messages.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Calendar,
      title: "Interview Scheduling Automation",
      description:
        "Allow qualified candidates to automatically book interview slots, removing back-and-forth coordination.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: BarChart3,
      title: "Candidate Tracking & Visibility",
      description:
        "Track every candidate across stages with full visibility into progress, status, and evaluation outcomes.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Evaluation & Feedback Frameworks",
      description:
        "Standardize how candidates are assessed to ensure consistent, objective, and well-documented hiring decisions.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: DollarSign,
      title: "Offer & Onboarding Coordination",
      description:
        "Streamline the transition from candidate selection to onboarding with structured workflows and clear communication.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Lock,
      title: "End-to-End Recruitment Automation",
      description:
        "Connect every stage into one seamless system, from application to hiring, reducing manual work and improving efficiency.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-semibold">What You Get</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Automate Your Hiring Process</span>
          </h2>
          <p className="text-lg text-gray-600">
            A complete recruitment automation system designed to screen
            candidates, manage communication, and streamline every stage from
            application to interview.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`size-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
