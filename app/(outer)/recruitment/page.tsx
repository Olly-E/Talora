export default function RecruitmentPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Recruitment Services</h1>
      <p className="text-lg text-gray-600 mb-8">
        We help you find and hire the best talent for your organization.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <p className="text-gray-600">
            Our recruitment process is designed to identify candidates who not
            only have the right skills but also align with your company culture
            and values.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Executive Search</li>
            <li>Volume Hiring</li>
            <li>Specialized Recruitment</li>
            <li>Talent Pipelining</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
