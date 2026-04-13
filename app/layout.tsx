import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import GoogleAnalytics from "./components/GoogleAnalytics";
import ReactQueryProvider from "./lib/react-query";
import { Toaster } from "react-hot-toast";
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
} from "./lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://talora-psi.vercel.app",
  ),
  title: {
    default: "Talora - HR Solutions & Workforce Management Consulting",
    template: "%s | Talora",
  },
  description:
    "Transform your HR operations with Talora's expert consulting and automation solutions. Specializing in recruitment, HR automation, workforce optimization, and talent management for modern businesses.",
  keywords: [
    "HR solutions",
    "workforce management",
    "HR consulting",
    "recruitment services",
    "HR automation",
    "talent management",
    "employee engagement",
    "HR technology",
    "human resources consulting",
    "workforce optimization",
    "talent acquisition",
    "HR strategy",
  ],
  authors: [{ name: "Talora Agency" }],
  creator: "Talora Agency",
  publisher: "Talora Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://talora-psi.vercel.app",
    title: "Talora - HR Solutions & Workforce Management Consulting",
    description:
      "Transform your HR operations with Talora's expert consulting and automation solutions. Specializing in recruitment, HR automation, and workforce optimization.",
    siteName: "Talora",
    images: [
      {
        url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776082741/talora/articles/cisie0aj9kualyqkpvxc.png",
        width: 1200,
        height: 630,
        alt: "Talora HR Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talora - HR Solutions & Workforce Management Consulting",
    description:
      "Transform your HR operations with expert consulting and automation solutions from Talora.",
    images: [
      "https://res.cloudinary.com/dreprhbdv/image/upload/v1776082741/talora/articles/cisie0aj9kualyqkpvxc.png",
    ],
    creator: "@taloraagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Structured Data - Website */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Structured Data - Professional Service */}
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
