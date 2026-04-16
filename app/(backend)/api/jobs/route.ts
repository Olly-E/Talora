import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Error fetching jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const jobData = await request.json();

    // Validate required fields
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

    // Validate tags is an array if provided
    if (jobData.tags && !Array.isArray(jobData.tags)) {
      return NextResponse.json(
        { error: "Tags must be an array" },
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

    // Generate slug from title
    const slug = jobData.title
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
        title: jobData.title,
        slug: finalSlug,
        company: jobData.company,
        location: jobData.location,
        type: jobData.type,
        modeOfWork: jobData.modeOfWork,
        salary: jobData.salary,
        currency: jobData.currency || "USD",
        category: jobData.category,
        openings: jobData.openings,
        posted: "Just posted",
        description: jobData.description,
        tags: jobData.tags || [],
        isUrgent: jobData.isUrgent || false,
        applicationLink: jobData.applicationLink || null,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
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
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job posting. Please try again." },
      { status: 500 },
    );
  }
}
