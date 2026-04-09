import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/elements/Button";

export default function JobResumeSubmitCTA() {
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
          Don&apos;t See the Right Fit?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Send us your resume and we&apos;ll notify you when new positions
          matching your profile become available.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-white text-secondary hover:bg-gray-100"
          >
            Submit Your Resume
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
