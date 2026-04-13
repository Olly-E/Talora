import type { Metadata } from "next";
import { readJobsFile } from "@/app/lib/jobsFileManager";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const jobs = await readJobsFile();
  const job = jobs.find((j) => j.slug === params.id);

  if (!job) {
    return {
      title: "Job Not Found - Talora",
      description: "The job posting you're looking for could not be found.",
    };
  }

  return {
    title: `${job.title} in ${job.location} - Talora Careers`,
    description: job.description,
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
      description: job.description,
      url: `https://talora-psi.vercel.app/jobs/${job.slug}`,
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dreprhbdv/image/upload/v1776082741/talora/articles/cisie0aj9kualyqkpvxc.png",
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
