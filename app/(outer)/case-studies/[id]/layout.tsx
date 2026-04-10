import type { Metadata } from "next";
import { readCaseStudiesFile } from "@/app/lib/caseStudiesFileManager";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const caseStudies = await readCaseStudiesFile();
  const caseStudy = caseStudies.find((cs) => cs.slug === params.id);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found - Talora",
      description: "The case study you're looking for could not be found.",
    };
  }

  const coverImage = caseStudy.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));

  return {
    title: `${caseStudy.title} - ${caseStudy.client} Case Study | Talora`,
    description: caseStudy.description,
    keywords: [
      caseStudy.client,
      caseStudy.industry,
      ...caseStudy.tags,
      "case study",
      "success story",
      "Talora",
    ],
    openGraph: {
      title: `${caseStudy.title} - ${caseStudy.client}`,
      description: caseStudy.description,
      url: `https://talora-psi.vercel.app/case-studies/${caseStudy.slug}`,
      type: "article",
      publishedTime: caseStudy.publishedAt,
      images: isValidUrl
        ? [
            {
              url: coverImage!,
              width: 1200,
              height: 630,
              alt: `${caseStudy.title} - ${caseStudy.client}`,
            },
          ]
        : undefined,
    },
  };
}

export default function CaseStudyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
