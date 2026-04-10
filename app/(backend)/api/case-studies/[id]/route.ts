import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import {
  readCaseStudiesFile,
  writeCaseStudiesFile,
} from "@/app/lib/caseStudiesFileManager";
import { CaseStudy } from "@/app/data/caseStudiesData";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const caseStudyId = parseInt(id);

    const updatedCaseStudyData: CaseStudy = await request.json();
    const caseStudies = await readCaseStudiesFile();

    const caseStudyIndex = caseStudies.findIndex((cs) => cs.id === caseStudyId);

    if (caseStudyIndex === -1) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 },
      );
    }

    // Preserve the existing slug and publishedAt
    const existingSlug = caseStudies[caseStudyIndex].slug;
    const existingPublishedAt = caseStudies[caseStudyIndex].publishedAt;
    caseStudies[caseStudyIndex] = {
      ...updatedCaseStudyData,
      id: caseStudyId,
      slug: existingSlug,
      publishedAt: existingPublishedAt,
    };
    await writeCaseStudiesFile(caseStudies);

    return NextResponse.json(caseStudies[caseStudyIndex]);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { error: "Error updating case study" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const caseStudyId = parseInt(id);

    const caseStudies = await readCaseStudiesFile();
    const filteredCaseStudies = caseStudies.filter(
      (cs) => cs.id !== caseStudyId,
    );

    if (filteredCaseStudies.length === caseStudies.length) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 },
      );
    }

    await writeCaseStudiesFile(filteredCaseStudies);

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { error: "Error deleting case study" },
      { status: 500 },
    );
  }
}
