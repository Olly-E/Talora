import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
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
      name,
      email,
      phone: phone || "",
      company: company || "",
      message,
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
