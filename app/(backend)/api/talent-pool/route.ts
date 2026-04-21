import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

// POST - Create new talent pool entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, desiredJobTitle, importantInfo, cvUrl } = body;

    // Validate required fields
    if (!name || !email || !desiredJobTitle || !cvUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingEntry = await prisma.talentPool.findFirst({
      where: { email },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "This email has already been submitted" },
        { status: 409 },
      );
    }

    // Create talent pool entry
    const talentPoolEntry = await prisma.talentPool.create({
      data: {
        name,
        email,
        desiredJobTitle,
        importantInfo: importantInfo || null,
        cvUrl,
      },
    });

    return NextResponse.json(talentPoolEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating talent pool entry:", error);
    return NextResponse.json(
      { error: "Failed to create talent pool entry" },
      { status: 500 },
    );
  }
}

// GET - Retrieve all talent pool entries (admin only)
export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            {
              desiredJobTitle: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.talentPool.count({ where });

    // Get talent pool entries
    const entries = await prisma.talentPool.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    return NextResponse.json({
      entries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching talent pool entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent pool entries" },
      { status: 500 },
    );
  }
}
