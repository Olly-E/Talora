import { promises as fs } from "fs";
import path from "path";
import { CaseStudy } from "@/app/data/caseStudiesData";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "caseStudies.json");

export async function readCaseStudiesFile(): Promise<CaseStudy[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading case studies file:", error);
    return [];
  }
}

export async function writeCaseStudiesFile(
  caseStudies: CaseStudy[],
): Promise<void> {
  try {
    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(caseStudies, null, 2),
      "utf8",
    );
  } catch (error) {
    console.error("Error writing case studies file:", error);
    throw error;
  }
}
