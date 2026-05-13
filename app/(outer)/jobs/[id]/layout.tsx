import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await prisma.job.findFirst({
    where: {
      slug: id,
      status: "PUBLISHED",
    },
  });

  if (!job) {
    return {
      title: "Job Not Found - Talora",
      description: "The job posting you're looking for could not be found.",
    };
  }

  // Truncate description for SEO (max 160 characters)g
  const metaDescription =
    job.description.length > 160
      ? job.description.substring(0, 157) + "..."
      : job.description;

  return {
    title: `${job.title} in ${job.location} - Talora Careers`,
    description: metaDescription,
    keywords: [
      job.title,
      job.location,
      job.type,
      ...job.category,
      "job opening",
      "career opportunity",
      "Talora careers",
    ],
    openGraph: {
      title: `${job.title} - ${job.location}`,
      description: metaDescription,
      url: `https://talora-psi.vercel.app/jobs/${job.slug}`,
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776253978/talora/articles/rdl1s1ddchehidderxie.jpg",
          width: 1200,
          height: 630,
          alt: `${job.title} at Talora`,
        },
      ],
    },
  };
}

export default function JobDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
