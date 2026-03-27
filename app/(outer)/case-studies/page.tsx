export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Case Studies</h1>
      <p className="text-lg text-gray-600 mb-12">
        See how we've helped businesses transform their HR operations.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border border-gray-2 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-3">Tech Startup Growth</h3>
          <p className="text-gray-600 mb-4">
            How we helped a tech startup scale from 20 to 200 employees in 12
            months.
          </p>
          <span className="text-primary font-semibold">Read more →</span>
        </div>

        <div className="border border-gray-2 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-3">Manufacturing Automation</h3>
          <p className="text-gray-600 mb-4">
            Reducing HR admin time by 70% through process automation.
          </p>
          <span className="text-primary font-semibold">Read more →</span>
        </div>

        <div className="border border-gray-2 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-3">Retail Talent Acquisition</h3>
          <p className="text-gray-600 mb-4">
            Successfully recruiting 500+ seasonal workers in 6 weeks.
          </p>
          <span className="text-primary font-semibold">Read more →</span>
        </div>
      </div>
    </div>
  );
}
