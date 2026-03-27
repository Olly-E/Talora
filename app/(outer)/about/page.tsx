export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-12">
          We're on a mission to revolutionize HR and recruitment for modern
          businesses.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, Hurevo was born from the vision to make HR
            processes simpler, faster, and more effective. We've helped hundreds
            of companies find top talent and streamline their HR operations.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve businesses of all sizes, from startups
            to enterprises, across various industries.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">CEO & Founder</p>
              <p className="text-sm text-gray-500">10+ years in HR Tech</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
              <p className="text-gray-600 mb-2">CTO</p>
              <p className="text-sm text-gray-500">Former Google Engineer</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Emily Davis</h3>
              <p className="text-gray-600 mb-2">Head of Recruitment</p>
              <p className="text-sm text-gray-500">
                15+ years in Talent Acquisition
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold mb-1">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-bold mb-1">Partnership</h3>
                <p className="text-gray-600">Your success is our success.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-bold mb-1">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to stay ahead.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
