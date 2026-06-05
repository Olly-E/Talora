"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { Button } from "../elements/Button";
import { useContact } from "@/app/hooks/useContact";
import { ScrollTriggeredSplitText } from "../animation/SplitTextAnimation";
import { badgeSlideUp } from "@/app/utils/animation";
import CustomRadioGroup from "../form/CustomRadioGroup";
import {
  HELP_NEEDED_OPTIONS,
  URGENCY_OPTIONS,
  ROLES_COUNT_OPTIONS,
  HIRING_LOCATION_OPTIONS,
} from "@/app/utils/constants";

interface ContactFormData {
  helpNeeded: string[];
  urgency: string;
  rolesCount: string;
  hiringLocation: string[];
  company: string;
  name: string;
  email: string;
  additionalInfo?: string;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ContactFormData>({
    defaultValues: {
      helpNeeded: [],
      urgency: "",
      rolesCount: "",
      hiringLocation: [],
      company: "",
      name: "",
      email: "",
      additionalInfo: "",
    },
  });

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
    <motion.section
      id="contact-form"
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Content */}
          <div>
            <motion.div
              className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-1 rounded-full mb-4"
              variants={badgeSlideUp}
              initial="initial"
              animate={isSectionInView ? "animate" : "initial"}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="size-2 rounded-full min-w-2 bg-primary" />
              Get In Touch
            </motion.div>
            <motion.h2
              className="text-4xl md:text-4xl font-bold leading-tight text-gray-900 mb-6"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <ScrollTriggeredSplitText delayPerWord={0.03} direction="top">
                Build a Hiring System That Works for Your Business
              </ScrollTriggeredSplitText>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-base mb-8"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <ScrollTriggeredSplitText
                delayPerWord={0.02}
                direction="bottom"
                initialDelay={0.3}
              >
                Looking to hire, grow your team, or improve your hiring process?
                Let us know what you need help with and we’ll take it from there
              </ScrollTriggeredSplitText>
            </motion.p>

            <motion.div
              className="space-y-6"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delay: 1,
                  },
                },
              }}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
            >
              <motion.div
                className="flex items-start gap-4"
                variants={{
                  hidden: { y: -20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
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
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                variants={{
                  hidden: { y: -20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
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
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            className="bg-primary/10 rounded-3xl p-8 lg:p-10"
            initial={{ y: 100, opacity: 0 }}
            animate={
              isSectionInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
            >
              {/* How can we help today? */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  How can we help today?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {HELP_NEEDED_OPTIONS.map((option) => (
                    <Controller
                      key={option}
                      name="helpNeeded"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value?.includes(option) || false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChange([...(value || []), option]);
                              } else {
                                onChange(
                                  value?.filter(
                                    (item: string) => item !== option,
                                  ) || [],
                                );
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      )}
                    />
                  ))}
                </div>
              </motion.div>

              {/* How urgently are you hiring? */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  How urgently are you hiring?
                </label>
                <Controller
                  name="urgency"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomRadioGroup
                      name="urgency"
                      value={value}
                      onChange={onChange}
                      options={URGENCY_OPTIONS}
                      className="grid grid-cols-2 gap-3"
                    />
                  )}
                />
              </motion.div>

              {/* How many roles are you hiring for? */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  How many roles are you hiring for?
                </label>
                <Controller
                  name="rolesCount"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomRadioGroup
                      name="rolesCount"
                      value={value}
                      onChange={onChange}
                      options={ROLES_COUNT_OPTIONS}
                      className="grid grid-cols-2 gap-3"
                    />
                  )}
                />
              </motion.div>

              {/* Where are you hiring? */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Where are you hiring?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {HIRING_LOCATION_OPTIONS.map((option) => (
                    <Controller
                      key={option}
                      name="hiringLocation"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              value?.includes(option.toLowerCase()) || false
                            }
                            onChange={(e) => {
                              const lowerOption = option.toLowerCase();
                              if (e.target.checked) {
                                onChange([...(value || []), lowerOption]);
                              } else {
                                onChange(
                                  value?.filter(
                                    (item: string) => item !== lowerOption,
                                  ) || [],
                                );
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      )}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Company Name */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <InputField
                  label="Company Name"
                  placeholder="Enter company name"
                  hasError={errors.company}
                  registration={register("company")}
                />
              </motion.div>

              {/* Your Name and Work Email */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <InputField
                  label="Your Name"
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
                  label="Work Email"
                  placeholder="Enter your work email"
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
              </motion.div>

              {/* Anything you'd like us to know? */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <TextAreaField
                  id="additionalInfo"
                  label="Anything you'd like us to know? (Optional)"
                  placeholder="Tell us more about your hiring needs..."
                  hasError={errors.additionalInfo}
                  registration={register("additionalInfo")}
                  rows={4}
                />
              </motion.div>

              {/* Calendly Embed Notice */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <p className="text-xs text-gray-600 mb-3">
                  Prefer to speak with us directly?{" "}
                  <a
                    href="#"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Book a Free Consultation
                  </a>
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Submit"}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
