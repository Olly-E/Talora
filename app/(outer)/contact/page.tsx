import type { Metadata } from "next";
import { ContactHeroSection } from "@/app/(outer)/feature/contact/components";
import ContactSection from "@/app/components/common/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with HR Consulting Experts",
  description:
    "Ready to transform your HR operations? Contact Talora's expert team for personalized HR consulting, recruitment solutions, and workforce management services. Email us at contact@taloraagency.com.",
  keywords: [
    "contact HR consultants",
    "HR consulting inquiry",
    "get HR quote",
    "workforce management contact",
    "recruitment services inquiry",
    "HR solutions contact",
  ],
  openGraph: {
    title: "Contact Talora - HR Consulting Experts",
    description:
      "Get in touch with our HR consulting team. Contact us for personalized HR solutions and workforce management services.",
    url: "https://taloraagency.com/contact",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776082741/talora/articles/cisie0aj9kualyqkpvxc.png",
        width: 1200,
        height: 630,
        alt: "Contact Talora - HR Consulting Experts",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div>
      <ContactHeroSection />
      <ContactSection />
    </div>
  );
}
