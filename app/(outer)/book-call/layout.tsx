import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation - Schedule Your Free HR Strategy Call",
  description:
    "Schedule a free 30-minute HR consultation with Talora's experts. Discuss your workforce challenges, recruitment needs, and HR automation opportunities. Book your strategy call today.",
  keywords: [
    "book HR consultation",
    "schedule HR call",
    "free HR strategy session",
    "HR consulting appointment",
    "workforce management consultation",
    "recruitment consultation",
  ],
  openGraph: {
    title: "Book a Free HR Consultation - Talora Strategy Call",
    description:
      "Schedule your free 30-minute consultation with our HR experts. Get personalized advice on recruitment, automation, and workforce management.",
    url: "https://talora-psi.vercel.app/book-call",
    type: "website",
  },
};

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
