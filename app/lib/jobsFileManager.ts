import { promises as fs } from "fs";
import path from "path";
import { Job } from "@/app/data/jobsData";

const JOBS_FILE_PATH = path.join(process.cwd(), "data/jobs.json");

export async function readJobsFile(): Promise<Job[]> {
  try {
    const fileContent = await fs.readFile(JOBS_FILE_PATH, "utf-8");
    const jobs = JSON.parse(fileContent) as Job[];
    return jobs;
  } catch (error) {
    console.error("Error reading jobs file:", error);
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function writeJobsFile(jobs: Job[]): Promise<void> {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(JOBS_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    await fs.writeFile(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing jobs file:", error);
    throw error;
  }
}
