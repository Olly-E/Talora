import { Sparkles, Search, Users, Star } from "lucide-react";
import { Button } from "@/app/components/elements/Button";
import Image from "next/image";
import careerImg from "@/public/images/careerImg.webp";

export default function JobHeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary min-h-150 lg:min-h-175">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

      {/* Gradient Blobs */}
      <div className="absolute top-0 right-0 size-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 size-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-full px-4 py-2 backdrop-blur-sm">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium text-white">
                Join Our Talent Pool
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Your <span className="text-primary">Dream Career</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              Discover exciting opportunities with innovative companies. Connect
              with roles that match your ambitions and unlock your full
              potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="primary">
                Browse Positions
                <Search className="size-5" />
              </Button>
              <Button size="lg" variant="outlineWhite">
                Upload Resume
              </Button>
            </div>
          </div>

          {/* Right Image - Unusual Arrangement */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Image Container */}
            <div className="relative">
              {/* Large Image */}
              <div className="relative h-100 lg:h-137.5 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image
                  src={careerImg}
                  alt="Career Opportunities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Card - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl w-48 hidden lg:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <Star className="size-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">200+ Happy Placements</p>
              </div>

              {/* Floating Card - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 bg-black rounded-2xl p-5 shadow-xl w-56 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 rounded-full p-3">
                    <Users className="size-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">2,500+</div>
                    <div className="text-xs text-white/80">
                      Active Candidates
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 right-10 size-32 bg-primary/30 rounded-full blur-2xl"></div>
              <div className="absolute -z-10 bottom-10 left-10 size-40 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
