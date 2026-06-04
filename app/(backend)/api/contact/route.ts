import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      helpNeeded,
      urgency,
      rolesCount,
      hiringLocation,
      company,
      name,
      email,
      additionalInfo,
    } = body;

    // Validate required fields
    if (!name || !email || !helpNeeded || !urgency || !rolesCount) {
      return NextResponse.json(
        {
          error:
            "Name, email, what you need help with, urgency, and number of roles are required",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Send email
    const result = await sendContactEmail({
      helpNeeded: Array.isArray(helpNeeded) ? helpNeeded : [helpNeeded],
      urgency,
      rolesCount,
      hiringLocation: Array.isArray(hiringLocation)
        ? hiringLocation
        : [hiringLocation],
      company: company || "",
      name,
      email,
      additionalInfo: additionalInfo || "",
    });

    if (!result.success) {
      console.error("Email send failed:", result.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", result.data);
    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
