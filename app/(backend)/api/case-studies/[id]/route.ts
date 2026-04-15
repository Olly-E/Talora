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
    const caseStudyId = parseInt(id);

    const updatedCaseStudyData = await request.json();

    // Check if case study exists
    const existingCaseStudy = await prisma.caseStudy.findUnique({
      where: { id: caseStudyId },
    });

    if (!existingCaseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 },
      );
    }

    // Update the case study
    const updatedCaseStudy = await prisma.caseStudy.update({
      where: { id: caseStudyId },
      data: {
        title: updatedCaseStudyData.title,
        client: updatedCaseStudyData.client,
        industry: updatedCaseStudyData.industry,
        description: updatedCaseStudyData.description,
        challenge: updatedCaseStudyData.challenge,
        solution: updatedCaseStudyData.solution,
        results: updatedCaseStudyData.results,
        coverImage: updatedCaseStudyData.coverImage,
        tags: updatedCaseStudyData.tags || [],
        featured: updatedCaseStudyData.featured || false,
      },
    });

    return NextResponse.json(updatedCaseStudy);
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

    // Try to delete the case study
    try {
      await prisma.caseStudy.delete({
        where: { id: caseStudyId },
      });
      return NextResponse.json({
        success: true,
        message: "Case study deleted successfully",
      });
    } catch {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 },
      );
    }
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
