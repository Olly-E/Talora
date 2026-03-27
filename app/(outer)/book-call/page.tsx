"use client";

import { useState } from "react";

export default function BookCallPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Book a Strategy Call</h1>
        <p className="text-lg text-gray-600 mb-12">
          Let's discuss how we can help transform your HR operations. Schedule a
          free 30-minute consultation with our experts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold mb-2"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              required
              className="w-full px-4 py-3 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-2"
            >
              What would you like to discuss? *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Schedule My Call
          </button>
        </form>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">What to Expect</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span>✓</span>
              <span>30-minute personalized consultation</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Discussion of your specific HR challenges</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Tailored recommendations for your business</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>No obligation or pressure to commit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
