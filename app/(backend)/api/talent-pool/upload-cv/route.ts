import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF or Word document." },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 },
      );
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
      publicId: blob.pathname,
    });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error uploading CV" },
      { status: 500 },
    );
  }
}
