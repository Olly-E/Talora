import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    // Check if user is authenticated
    let isAuthenticated = false;
    try {
      await requireAuth();
      isAuthenticated = true;
    } catch {
      // User is not authenticated
      isAuthenticated = false;
    }

    // If authenticated (admin), return all jobs
    // If not authenticated (public), return only published jobs
    const jobs = await prisma.job.findMany({
      where: isAuthenticated ? {} : { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Error fetching jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jobData: any = {};
  try {
    await requireAuth();

    jobData = await request.json();

    // Determine status - default to DRAFT unless explicitly set to PUBLISHED
    const status = jobData.status || "DRAFT";

    // Only validate required fields if publishing (not for drafts)
    if (status === "PUBLISHED") {
      const requiredFields = [
        { field: "title", name: "Job Title" },
        { field: "company", name: "Company" },
        { field: "location", name: "Location" },
        { field: "type", name: "Job Type" },
        { field: "modeOfWork", name: "Mode of Work" },
        { field: "salary", name: "Salary" },
        { field: "currency", name: "Currency" },
        { field: "description", name: "Description" },
      ];

      for (const { field, name } of requiredFields) {
        if (!jobData[field]) {
          return NextResponse.json(
            { error: `${name} is required` },
            { status: 400 },
          );
        }
      }

      // Validate category is an array
      if (!Array.isArray(jobData.category) || jobData.category.length === 0) {
        return NextResponse.json(
          { error: "At least one category is required" },
          { status: 400 },
        );
      }

      // Validate openings is a positive number
      if (!jobData.openings || jobData.openings < 1) {
        return NextResponse.json(
          { error: "Number of openings must be at least 1" },
          { status: 400 },
        );
      }
    }

    // Validate tags is an array if provided
    if (jobData.tags && !Array.isArray(jobData.tags)) {
      return NextResponse.json(
        { error: "Tags must be an array" },
        { status: 400 },
      );
    }

    const publishedAt = status === "PUBLISHED" ? new Date() : null;

    // Generate slug from title (or use default for drafts without title)
    const titleForSlug = jobData.title || `draft-${Date.now()}`;
    const slug = titleForSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists and append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.job.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newJob = await prisma.job.create({
      data: {
        title: jobData.title || "Untitled Job",
        slug: finalSlug,
        company: jobData.company || "",
        location: jobData.location || "",
        type: jobData.type || "Full-time",
        modeOfWork: jobData.modeOfWork || "On-site",
        salary: jobData.salary || "",
        currency: jobData.currency || "USD",
        category: Array.isArray(jobData.category) ? jobData.category : [],
        openings: typeof jobData.openings === "number" ? jobData.openings : 1,
        posted: "Just posted",
        description: jobData.description || "",
        tags: Array.isArray(jobData.tags) ? jobData.tags : [],
        isUrgent: jobData.isUrgent === true,
        applicationLink: jobData.applicationLink || null,
        status,
        publishedAt,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating job:", error);
    console.error("Job data received:", jobData);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON data provided" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create job posting. Please try again." },
      { status: 500 },
    );
  }
}
