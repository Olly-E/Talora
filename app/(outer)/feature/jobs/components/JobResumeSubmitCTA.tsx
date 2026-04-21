"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import { CVUploadModal } from "@/app/components/CVUploadModal";
import { useState } from "react";

export default function JobResumeSubmitCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-20 bg-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63498.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay Considered for the Right Opportunities
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Submit your profile to be considered for roles that match your
          experience. We review every candidate carefully and reach out when
          relevant opportunities arise.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-white text-secondary hover:bg-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            Submit Your Resume
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
      {/* CV Upload Modal */}
      <CVUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
