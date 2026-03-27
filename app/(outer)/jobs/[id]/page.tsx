export default function JobPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-16 px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Senior Software Engineer</h1>
        <div className="flex gap-6 text-gray-600 mb-6">
          <span>📍 Remote</span>
          <span>💼 Full-time</span>
          <span>💰 $120k - $150k</span>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Apply Now
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-gray-600">
            We are looking for a talented Senior Software Engineer to join our
            growing team. In this role, you'll be responsible for designing and
            implementing scalable solutions that power our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Design and develop high-quality software solutions</li>
            <li>Collaborate with cross-functional teams</li>
            <li>Mentor junior developers</li>
            <li>Participate in code reviews</li>
            <li>Contribute to technical documentation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>5+ years of software development experience</li>
            <li>Strong proficiency in TypeScript and React</li>
            <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
            <li>Excellent communication skills</li>
            <li>Bachelor's degree in Computer Science or related field</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Competitive salary and equity</li>
            <li>Health, dental, and vision insurance</li>
            <li>401(k) with company match</li>
            <li>Flexible work arrangements</li>
            <li>Professional development budget</li>
          </ul>
        </section>
      </div>

      <div className="mt-12">
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}
