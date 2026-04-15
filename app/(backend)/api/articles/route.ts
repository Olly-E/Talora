import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Error fetching articles" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const articleData = await request.json();

    // Validate required fields
    const requiredFields = [
      { field: "title", name: "Title" },
      { field: "author", name: "Author" },
      { field: "category", name: "Category" },
      { field: "excerpt", name: "Excerpt" },
      { field: "content", name: "Content" },
      { field: "readTime", name: "Read Time" },
    ];

    for (const { field, name } of requiredFields) {
      if (!articleData[field]) {
        return NextResponse.json(
          { error: `${name} is required` },
          { status: 400 },
        );
      }
    }

    // Validate tags is an array if provided
    if (articleData.tags && !Array.isArray(articleData.tags)) {
      return NextResponse.json(
        { error: "Tags must be an array" },
        { status: 400 },
      );
    }

    // Generate slug from title
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists and append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newArticle = await prisma.article.create({
      data: {
        title: articleData.title,
        slug: finalSlug,
        author: articleData.author,
        category: articleData.category,
        coverImage: articleData.coverImage,
        readTime: articleData.readTime,
        tags: articleData.tags || [],
        excerpt: articleData.excerpt,
        featured: articleData.featured || false,
        content: articleData.content,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON data provided" },
        { status: 400 },
      );
    }
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article. Please try again." },
      { status: 500 },
    );
  }
}
