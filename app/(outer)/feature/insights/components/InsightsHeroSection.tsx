import { BookOpen } from "lucide-react";

export default function InsightsHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-gray-50 via-white to-gray-50 py-16 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary rounded-full px-5 py-2 mb-6">
            <BookOpen className="size-4" />
            <span className="text-sm font-medium">Insights & Resources</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Expert Insights for <span className="text-primary">Modern HR</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with the latest trends, best practices, and expert advice
            on HR automation, recruitment, and workforce management.
          </p>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 size-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 size-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
