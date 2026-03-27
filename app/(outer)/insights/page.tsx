export default function InsightsPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Insights & Articles</h1>
      <p className="text-lg text-gray-600 mb-12">
        Expert insights, industry trends, and best practices in HR and
        recruitment.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              HR TRENDS
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              The Future of Remote Hiring in 2026
            </h2>
            <p className="text-gray-600 mb-4">
              Explore the latest trends and best practices for hiring remote
              talent in today's competitive market.
            </p>
            <span className="text-sm text-gray-500">March 10, 2026</span>
          </div>
        </article>

        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-green-400 to-teal-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              AUTOMATION
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              5 HR Processes You Should Automate Today
            </h2>
            <p className="text-gray-600 mb-4">
              Discover which HR processes can benefit most from automation and
              how to implement them effectively.
            </p>
            <span className="text-sm text-gray-500">March 5, 2026</span>
          </div>
        </article>

        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-orange-400 to-red-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              RECRUITMENT
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              Building a Diverse and Inclusive Workforce
            </h2>
            <p className="text-gray-600 mb-4">
              Learn strategies for creating a recruitment process that promotes
              diversity and inclusion.
            </p>
            <span className="text-sm text-gray-500">February 28, 2026</span>
          </div>
        </article>

        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-pink-400 to-rose-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              EMPLOYEE EXPERIENCE
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              Creating an Engaging Onboarding Experience
            </h2>
            <p className="text-gray-600 mb-4">
              First impressions matter. Here's how to design an onboarding
              process that sets employees up for success.
            </p>
            <span className="text-sm text-gray-500">February 20, 2026</span>
          </div>
        </article>

        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              ANALYTICS
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              Using Data to Drive HR Decisions
            </h2>
            <p className="text-gray-600 mb-4">
              Harness the power of people analytics to make better, more
              informed HR decisions.
            </p>
            <span className="text-sm text-gray-500">February 15, 2026</span>
          </div>
        </article>

        <article className="border border-gray-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-400"></div>
          <div className="p-6">
            <span className="text-sm text-primary font-semibold">
              COMPLIANCE
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              Navigating Employment Law Changes
            </h2>
            <p className="text-gray-600 mb-4">
              Stay compliant with the latest employment law changes and
              understand their impact on your business.
            </p>
            <span className="text-sm text-gray-500">February 10, 2026</span>
          </div>
        </article>
      </div>
    </div>
  );
}
