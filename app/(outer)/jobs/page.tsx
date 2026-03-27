export default function JobsPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Job Opportunities</h1>
      <p className="text-lg text-gray-600 mb-12">
        Find your next career opportunity with our partner companies.
      </p>

      <div className="space-y-4">
        <div className="border border-gray-2 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Senior Software Engineer
              </h3>
              <p className="text-gray-600 mb-2">Tech Company Inc.</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>📍 Remote</span>
                <span>💼 Full-time</span>
                <span>💰 $120k - $150k</span>
              </div>
            </div>
            <span className="text-primary font-semibold">View →</span>
          </div>
        </div>

        <div className="border border-gray-2 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">HR Manager</h3>
              <p className="text-gray-600 mb-2">Global Corp</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>📍 New York, NY</span>
                <span>💼 Full-time</span>
                <span>💰 $90k - $110k</span>
              </div>
            </div>
            <span className="text-primary font-semibold">View →</span>
          </div>
        </div>

        <div className="border border-gray-2 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">Marketing Coordinator</h3>
              <p className="text-gray-600 mb-2">Creative Agency</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>📍 Los Angeles, CA</span>
                <span>💼 Full-time</span>
                <span>💰 $60k - $75k</span>
              </div>
            </div>
            <span className="text-primary font-semibold">View →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
