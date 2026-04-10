import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import {
  readCaseStudiesFile,
  writeCaseStudiesFile,
} from "@/app/lib/caseStudiesFileManager";
import { CaseStudy } from "@/app/data/caseStudiesData";

export async function GET() {
  try {
    const caseStudies = await readCaseStudiesFile();
    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Error fetching case studies" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const caseStudyData: CaseStudy = await request.json();

    // Validate required fields
    const requiredFields = [
      { field: "title", name: "Title" },
      { field: "client", name: "Client" },
      { field: "industry", name: "Industry" },
      { field: "description", name: "Description" },
      { field: "challenge", name: "Challenge" },
      { field: "solution", name: "Solution" },
    ];

    for (const { field, name } of requiredFields) {
      if (!caseStudyData[field as keyof CaseStudy]) {
        return NextResponse.json(
          { error: `${name} is required` },
          { status: 400 },
        );
      }
    }

    // Validate results is an array
    if (!Array.isArray(caseStudyData.results)) {
      return NextResponse.json(
        { error: "Results must be an array" },
        { status: 400 },
      );
    }

    // Validate tags is an array if provided
    if (caseStudyData.tags && !Array.isArray(caseStudyData.tags)) {
      return NextResponse.json(
        { error: "Tags must be an array" },
        { status: 400 },
      );
    }

    const caseStudies = await readCaseStudiesFile();

    // Generate slug from title
    const slug = caseStudyData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists and append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (caseStudies.some((cs) => cs.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newCaseStudy = {
      ...caseStudyData,
      id: Date.now(), // Generate a unique ID
      slug: finalSlug,
      publishedAt: new Date().toISOString(),
    };

    caseStudies.push(newCaseStudy);
    await writeCaseStudiesFile(caseStudies);

    return NextResponse.json(newCaseStudy, { status: 201 });
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
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study. Please try again." },
      { status: 500 },
    );
  }
}
