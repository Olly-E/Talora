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

    // Handle status change to PUBLISHED
    const status = updatedJobData.status || existingJob.status;
    const publishedAt =
      status === "PUBLISHED" && existingJob.status === "DRAFT"
        ? new Date()
        : existingJob.publishedAt;

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
        currency: updatedJobData.currency || "USD",
        category: updatedJobData.category,
        openings: updatedJobData.openings,
        description: updatedJobData.description,
        tags: updatedJobData.tags || [],
        isUrgent: updatedJobData.isUrgent || false,
        applicationLink: updatedJobData.applicationLink || null,
        status,
        publishedAt,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const jobId = parseInt(id);

    const partialData = await request.json();

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Build update data object with only provided fields
    const updateData: Record<string, unknown> = {};
    
    if (partialData.title !== undefined) updateData.title = partialData.title;
    if (partialData.company !== undefined) updateData.company = partialData.company;
    if (partialData.location !== undefined) updateData.location = partialData.location;
    if (partialData.type !== undefined) updateData.type = partialData.type;
    if (partialData.modeOfWork !== undefined) updateData.modeOfWork = partialData.modeOfWork;
    if (partialData.salary !== undefined) updateData.salary = partialData.salary;
    if (partialData.currency !== undefined) updateData.currency = partialData.currency;
    if (partialData.category !== undefined) updateData.category = partialData.category;
    if (partialData.openings !== undefined) updateData.openings = partialData.openings;
    if (partialData.description !== undefined) updateData.description = partialData.description;
    if (partialData.tags !== undefined) updateData.tags = partialData.tags;
    if (partialData.isUrgent !== undefined) updateData.isUrgent = partialData.isUrgent;
    if (partialData.applicationLink !== undefined) updateData.applicationLink = partialData.applicationLink;
    
    // Handle status change
    if (partialData.status !== undefined) {
      updateData.status = partialData.status;
      // Set publishedAt if transitioning from DRAFT to PUBLISHED
      if (partialData.status === "PUBLISHED" && existingJob.status === "DRAFT") {
        updateData.publishedAt = new Date();
      }
    }

    // Update the job with partial data
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
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
