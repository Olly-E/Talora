import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import {
  readArticlesFile,
  writeArticlesFile,
} from "@/app/lib/articlesFileManager";
import { Article } from "@/app/data/articlesData";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const articleId = parseInt(id);

    const updatedArticleData: Article = await request.json();
    const articles = await readArticlesFile();

    const articleIndex = articles.findIndex(
      (article) => article.id === articleId,
    );

    if (articleIndex === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Preserve the existing slug
    const existingSlug = articles[articleIndex].slug;
    articles[articleIndex] = {
      ...updatedArticleData,
      id: articleId,
      slug: existingSlug,
    };
    await writeArticlesFile(articles);

    return NextResponse.json(articles[articleIndex]);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Error updating article" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const articleId = parseInt(id);

    const articles = await readArticlesFile();
    const filteredArticles = articles.filter(
      (article) => article.id !== articleId,
    );

    if (filteredArticles.length === articles.length) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    await writeArticlesFile(filteredArticles);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Error deleting article" },
      { status: 500 },
    );
  }
}
