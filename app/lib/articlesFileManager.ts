import { promises as fs } from "fs";
import path from "path";
import { Article } from "@/app/data/articlesData";

const ARTICLES_FILE_PATH = path.join(process.cwd(), "data/articles.json");

export async function readArticlesFile(): Promise<Article[]> {
  try {
    const fileContent = await fs.readFile(ARTICLES_FILE_PATH, "utf-8");
    const articles = JSON.parse(fileContent) as Article[];
    return articles;
  } catch (error) {
    console.error("Error reading articles file:", error);
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function writeArticlesFile(articles: Article[]): Promise<void> {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(ARTICLES_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    await fs.writeFile(
      ARTICLES_FILE_PATH,
      JSON.stringify(articles, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Error writing articles file:", error);
    throw error;
  }
}
