import type { Metadata } from "next";
import { readArticlesFile } from "@/app/lib/articlesFileManager";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const articles = await readArticlesFile();
  const article = articles.find((a) => a.slug === params.id);

  if (!article) {
    return {
      title: "Article Not Found - Talora",
      description: "The article you're looking for could not be found.",
    };
  }

  const coverImage = article.coverImage?.trim();
  const isValidUrl =
    coverImage &&
    (coverImage.startsWith("http://") || coverImage.startsWith("https://"));

  return {
    title: `${article.title} - Talora Insights`,
    description: article.excerpt,
    keywords: [
      article.title,
      article.category,
      ...article.tags,
      "HR insights",
      "workforce management",
      "Talora",
    ],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://talora-psi.vercel.app/insights/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: isValidUrl
        ? [
            {
              url: coverImage!,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
  };
}

export default function InsightDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
