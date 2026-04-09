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
    const articles = await readArticlesFile();

    const newArticle = {
      ...articleData,
      id: Date.now(), // Generate a unique ID
    };

    articles.push(newArticle);
    await writeArticlesFile(articles);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Error creating article" },
      { status: 500 },
    );
  }
}
