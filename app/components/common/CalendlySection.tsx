"use client";

import { useEffect } from "react";
import { CheckCircle, Clock, Video, Mail } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/adlaide-taloraagency/discovery-call";

export default function CalendlySection() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="calendly-section"
      className="relative w-full bg-white py-16 lg:py-20"
    >
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - What to Expect */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  What to Expect
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      30-minute personalized consultation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Discussion of your specific HR challenges
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Tailored recommendations for your business
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      No obligation or pressure to commit
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-primary/10 to-tertiary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900">Quick & Easy</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Choose a time that works for you from our available slots.
                </p>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg">
                    <Video className="size-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Virtual Meeting</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Video call link will be sent to your email after booking.
                </p>
              </div>
            </div>

            {/* Right Side - Calendly Widget */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div
                  className="calendly-inline-widget"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </div>

          {/* Alternative Contact Section */}
          <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="size-5 text-primary" />
              <p className="text-gray-700 font-medium">
                Can&apos;t find a suitable time slot?
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              No worries! You can reach out to us directly via{" "}
              <a href="mailto:contact@taloraagency.com" className="text-primary hover:underline font-medium">
                email
              </a>{" "}
              or our contact form.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Send us a message instead
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
