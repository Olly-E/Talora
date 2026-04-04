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
      title: "Workflow Automation",
      description:
        "Automate repetitive tasks and approvals with intelligent workflow engine that adapts to your processes.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Employee Self-Service",
      description:
        "Empower employees with a user-friendly portal to manage their own data, requests, and documents.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: FileCheck,
      title: "Document Management",
      description:
        "Digitize and organize all HR documents with smart search, version control, and secure access.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Calendar,
      title: "Time & Attendance",
      description:
        "Track work hours, manage shifts, and handle time-off requests automatically with real-time updates.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: DollarSign,
      title: "Payroll Processing",
      description:
        "Calculate salaries, deductions, and taxes automatically with zero errors and full compliance.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Generate comprehensive HR reports and dashboards with actionable insights at your fingertips.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Stay informed with intelligent alerts for important deadlines, approvals, and updates.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with role-based access, audit trails, and regulatory compliance.",
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Automate HR</span>
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive automation tools designed to streamline every aspect
            of your HR operations
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
