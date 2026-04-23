"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Insight Matters",
    role: "Hiring Manager",
    company: "Technology Company",
    image: "https://i.pravatar.cc/150?img=47",
    content:
      "Talora was professional, structured, and transparent throughout the engagement. They delivered well-documented sourcing and prescreen work and communicated clearly at every stage. We appreciated their flexibility in aligning with our timeline constraints. Would be open to working together again.",
    rating: 5,
  },
  {
    id: 2,
    name: "Gallery Company - Sabina",
    role: "Hiring Manager",
    company: "Technology Company",
    image: "https://i.pravatar.cc/150?img=12",
    content:
      "Great working with Talora, we will rehire them to work again with us, their work ethic is great and they're super organized.",
    rating: 5,
  },
  {
    id: 3,
    name: "Danny - USA",
    role: "Hiring Manager",
    company: "Technology Company",
    image: "https://i.pravatar.cc/150?img=45",
    content:
      "Had a great experience working with Adlaide! Super responsive and genuinely helpful throughout the process. Made everything much easier. Would happily work with them again for our next sourcing need.",
    rating: 5,
  },
  {
    id: 4,
    name: "James Anderson",
    role: "COO",
    company: "HealthCore Systems",
    image: "https://i.pravatar.cc/150?img=33",
    content:
      "Working with Talora was a game-changer. They understood our industry's unique challenges and delivered candidates who were not just qualified, but truly aligned with our mission and values.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder",
    company: "GrowthLab",
    image: "https://i.pravatar.cc/150?img=26",
    content:
      "As a startup, we needed to hire fast without compromising quality. Talora's structured approach and global talent network helped us build our dream team in record time.",
    rating: 5,
  },
  {
    id: 6,
    name: "Marcus Johnson",
    role: "HR Director",
    company: "Retail Innovations",
    image: "https://i.pravatar.cc/150?img=14",
    content:
      "The clarity and transparency Talora brought to our hiring process was remarkable. Candidates actually thank us for the experience, and our time-to-hire has been cut in half.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerView = 3;
  const maxIndex = testimonials.length - testimonialsPerView;

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerView,
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-secondary flex items-center gap-2 text-white text-sm font-medium w-fit shadow-sm px-4 py-2 rounded-full mb-6 mx-auto">
            <div className="size-2 rounded-full min-w-2 bg-primary" />
            Client Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by Growing Companies
          </h2>
          <p className="text-gray-600 text-lg">
            See how we&apos;ve helped businesses transform their hiring systems
            and build exceptional teams.
          </p>
        </div>

        {/* Desktop View - 3 Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonials}
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-colors disabled:opacity-50"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-secondary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonials}
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-colors disabled:opacity-50"
              aria-label="Next testimonials"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet View - 1 Card */}
        <div className="lg:hidden">
          <div className="mb-8">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev <= 0 ? testimonials.length - 1 : prev - 1,
                )
              }
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-secondary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev >= testimonials.length - 1 ? 0 : prev + 1,
                )
              }
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Quote Icon */}
      <div className="bg-secondary/10 rounded-2xl p-3 w-fit mb-6">
        <Quote className="size-6 text-secondary" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-primary text-primary"
            strokeWidth={0}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-6 grow">
        &quot;{testimonial.content}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <div className="relative size-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-600">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}
