export default function HRAutomationPage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">HR Automation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform your HR operations with intelligent automation solutions.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Streamline Your Processes</h2>
          <p className="text-gray-600">
            Our HR automation tools help you reduce manual work, minimize
            errors, and free up your team to focus on strategic initiatives.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Automated Onboarding</li>
            <li>Payroll Integration</li>
            <li>Performance Management</li>
            <li>Employee Self-Service Portal</li>
            <li>Compliance Tracking</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
