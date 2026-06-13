import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: response.status },
    );
  }

  const buffer = await response.arrayBuffer();
  const contentType =
    response.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="cv"`,
    },
  });
}
