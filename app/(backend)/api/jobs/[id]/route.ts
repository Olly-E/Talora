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
    const jobId = parseInt(id);

    const updatedJobData = await request.json();

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title: updatedJobData.title,
        company: updatedJobData.company,
        location: updatedJobData.location,
        type: updatedJobData.type,
        modeOfWork: updatedJobData.modeOfWork,
        salary: updatedJobData.salary,
        category: updatedJobData.category,
        openings: updatedJobData.openings,
        description: updatedJobData.description,
        tags: updatedJobData.tags || [],
        isUrgent: updatedJobData.isUrgent || false,
        applicationLink: updatedJobData.applicationLink || null,
      },
    });

    return NextResponse.json(updatedJob);
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

    // Try to delete the job
    try {
      await prisma.job.delete({
        where: { id: jobId },
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      // If job not found, Prisma will throw an error
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
