import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailParams {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  phone,
  company,
  message,
}: ContactEmailParams) {
  try {
    const data = await resend.emails.send({
      from: "Talora <contact@taloraagency.com>",
      to: ["contact@taloraagency.com"],
      replyTo: email,
      subject: `Talora Contact Form - Message from ${name}`,
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
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #0A2540; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827;">${phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Company:</td>
                  <td style="padding: 8px 0; color: #111827;">${company || "Not provided"}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="color: #0A2540; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 4px solid #0A2540;">
                <p style="color: #374151; margin: 0; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
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
