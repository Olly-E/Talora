import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { readJobsFile, writeJobsFile } from "@/app/lib/jobsFileManager";
import { Job } from "@/app/data/jobsData";

export async function GET() {
  try {
    const jobs = await readJobsFile();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Error fetching jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const jobData: Job = await request.json();
    const jobs = await readJobsFile();

    const newJob = {
      ...jobData,
      id: Date.now(), // Generate a unique ID
      posted: "Just posted", // Add posted date
    };

    jobs.push(newJob);
    await writeJobsFile(jobs);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Error creating job" }, { status: 500 });
  }
}
