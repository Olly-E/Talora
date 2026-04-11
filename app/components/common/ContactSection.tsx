"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { Button } from "../elements/Button";
import { useContact } from "@/app/hooks/useContact";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const { mutate: submitContact, isPending } = useContact();

  const onSubmit = (data: ContactFormData) => {
    submitContact(data, {
      onSuccess: () => {
        toast.success(
          "Thank you for contacting us! We'll get back to you shortly.",
        );
        reset();
      },
      onError: (error: Error) => {
        const apiError = error as unknown as ApiError;
        toast.error(
          apiError?.response?.data?.error ||
            "Failed to send message. Please try again.",
        );
      },
    });
  };

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Content */}
          <div>
            <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4">
              <div className="size-2 rounded-full min-w-2 bg-primary" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
              Build a Hiring System That <br />
              Works for Your Business
            </h2>
            <p className="text-gray-600 text-base mb-8">
              Tell us about your hiring needs, and we will design a structured
              approach to help you source the right talent, streamline your
              recruitment process, and hire with confidence. “We work with
              founders and growing companies looking to build structured,
              scalable hiring systems.”
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">contact@taloraagency.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Availability
                  </h3>
                  <p className="text-gray-600">We work with clients globally</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-primary/10 rounded-3xl p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  placeholder="Enter your name"
                  hasError={errors.name}
                  isRequired
                  registration={register("name", {
                    required: "Name is required",
                  })}
                  errorMessage={errors.name?.message}
                />
                <InputField
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  hasError={errors.email}
                  isRequired
                  registration={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  errorMessage={errors.email?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Phone Number"
                  placeholder="Enter your phone"
                  hasError={errors.phone}
                  registration={register("phone")}
                />
                <InputField
                  label="Company Name"
                  placeholder="Enter company name"
                  hasError={errors.company}
                  registration={register("company")}
                />
              </div>

              <TextAreaField
                id="message"
                label="Message"
                placeholder="Tell us about your HR needs..."
                hasError={errors.message}
                isRequired
                registration={register("message", {
                  required: "Message is required",
                })}
                rows={6}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Start Your Hiring Process"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
