"use client";

import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const CALENDLY_URL =
  "https://calendly.com/your-talora-account/30-minute-consultation";

export default function BookCallPage() {
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Calendar className="size-4" />
              Free Consultation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Book a Strategy Call
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Let&apos;s discuss how we can help transform your HR operations.
              Schedule a free 30-minute consultation with our experts.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Benefits */}
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

              <div className="bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl p-6 border border-primary/20">
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

              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
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

            {/* Calendly Widget */}
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

          {/* Alternative Contact */}
          <div className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 mb-4">
              Can&apos;t find a suitable time slot or prefer to email us?
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
    </div>
  );
}
