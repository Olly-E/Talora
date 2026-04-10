import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import {
  readArticlesFile,
  writeArticlesFile,
} from "@/app/lib/articlesFileManager";
import { Article } from "@/app/data/articlesData";

export async function GET() {
  try {
    const articles = await readArticlesFile();
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

    const articleData: Article = await request.json();

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
      if (!articleData[field as keyof Article]) {
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

    const articles = await readArticlesFile();

    // Generate slug from title
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists and append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (articles.some((article) => article.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newArticle = {
      ...articleData,
      id: Date.now(), // Generate a unique ID
      slug: finalSlug,
    };

    articles.push(newArticle);
    await writeArticlesFile(articles);

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
