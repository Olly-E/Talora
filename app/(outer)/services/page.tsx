export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover how we can help transform your business with our comprehensive
        HR solutions.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-gray-2 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Recruitment Services</h2>
          <p className="text-gray-600 mb-4">
            Find the right talent for your organization with our expert
            recruitment services.
          </p>
          <a
            href="/recruitment"
            className="text-primary hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="border border-gray-2 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">HR Automation</h2>
          <p className="text-gray-600 mb-4">
            Streamline your HR processes with cutting-edge automation solutions.
          </p>
          <a
            href="/hr-automation"
            className="text-primary hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
}
