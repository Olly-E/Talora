import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailParams {
  helpNeeded: string[];
  urgency: string;
  rolesCount: string;
  hiringLocation: string[];
  company: string;
  name: string;
  email: string;
  additionalInfo: string;
}

export async function sendContactEmail({
  helpNeeded,
  urgency,
  rolesCount,
  hiringLocation,
  company,
  name,
  email,
  additionalInfo,
}: ContactEmailParams) {
  try {
    // Format urgency for display
    const urgencyDisplay =
      {
        immediately: "Immediately",
        "within-30-days": "Within 30 days",
        "within-60-days": "Within 60 days",
        exploring: "Just exploring options",
      }[urgency] || urgency;

    // Format roles count for display
    const rolesCountDisplay =
      {
        "1": "1 role",
        "2-5": "2–5 roles",
        "6-10": "6–10 roles",
        "10+": "10+ roles",
        "not-sure": "Not sure",
      }[rolesCount] || rolesCount;

    // Format hiring location
    const hiringLocationDisplay = hiringLocation
      .map((loc) => loc.charAt(0).toUpperCase() + loc.slice(1))
      .join(", ");

    const data = await resend.emails.send({
      from: "Talora <contact@taloraagency.com>",
      to: ["contact@taloraagency.com"],
      replyTo: email,
      subject: `Talora Contact Form - Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Talora</h1>
            <p style="color: #E0E7F0; margin: 5px 0 0 0; font-size: 14px;">HR Solutions & Consulting</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #0A2540; margin-top: 0;">New Contact Form Submission</h2>
            
            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600; width: 180px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Work Email:</td>
                  <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #0A2540; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Company:</td>
                  <td style="padding: 8px 0; color: #111827;">${company || "Not provided"}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px;">
              <h3 style="color: #0A2540; margin-bottom: 10px; margin-top: 0;">How can we help today?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">
                ${helpNeeded.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>

            <div style="margin-top: 20px;">
              <h3 style="color: #0A2540; margin-bottom: 10px; margin-top: 0;">Hiring Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600; width: 180px;">Urgency:</td>
                  <td style="padding: 8px 0; color: #111827;">${urgencyDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Number of Roles:</td>
                  <td style="padding: 8px 0; color: #111827;">${rolesCountDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Hiring Location:</td>
                  <td style="padding: 8px 0; color: #111827;">${hiringLocationDisplay}</td>
                </tr>
              </table>
            </div>

            ${
              additionalInfo
                ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #0A2540; margin-bottom: 10px; margin-top: 0;">Additional Information:</h3>
              <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 4px solid #0A2540;">
                <p style="color: #374151; margin: 0; line-height: 1.6;">
                  ${additionalInfo.replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
            `
                : ""
            }
          </div>
          
          <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #6B7280; font-size: 12px; margin: 0;">
              This email was sent from your website's contact form.<br>
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
