import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { readJobsFile, writeJobsFile } from "@/app/lib/jobsFileManager";
import { Job } from "@/app/data/jobsData";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const jobId = parseInt(id);

    const updatedJobData: Job = await request.json();
    const jobs = await readJobsFile();

    const jobIndex = jobs.findIndex((job) => job.id === jobId);

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    jobs[jobIndex] = { ...updatedJobData, id: jobId };
    await writeJobsFile(jobs);

    return NextResponse.json(jobs[jobIndex]);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const jobId = parseInt(id);

    const jobs = await readJobsFile();
    const filteredJobs = jobs.filter((job) => job.id !== jobId);

    if (filteredJobs.length === jobs.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await writeJobsFile(filteredJobs);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
