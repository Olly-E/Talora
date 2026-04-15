import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const articleId = parseInt(id);

    const updatedArticleData = await request.json();

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: updatedArticleData.title,
        author: updatedArticleData.author,
        category: updatedArticleData.category,
        coverImage: updatedArticleData.coverImage,
        readTime: updatedArticleData.readTime,
        tags: updatedArticleData.tags || [],
        excerpt: updatedArticleData.excerpt,
        featured: updatedArticleData.featured || false,
        content: updatedArticleData.content,
      },
    });

    return NextResponse.json(updatedArticle);
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

    // Try to delete the article
    try {
      await prisma.article.delete({
        where: { id: articleId },
      });
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
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
