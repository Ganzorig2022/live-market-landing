import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Check if SMTP is configured
 */
export function isEmailConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}

/**
 * Create nodemailer transporter
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Send email - logs to console if SMTP not configured
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  if (!isEmailConfigured()) {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 EMAIL (SMTP not configured - logging to console)");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("─────────────────────────────────────────────────────────────");
    // Extract text content from HTML for console display
    const textContent = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    console.log(`Content: ${textContent.substring(0, 500)}...`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

/**
 * Generate a 6-digit OTP code
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP verification email
 */
export async function sendOtpEmail(params: {
  to: string;
  firstName: string;
  otpCode: string;
}): Promise<void> {
  const { to, firstName, otpCode } = params;
  const subject = "Your Live Market Verification Code";
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; background-color: #f9fafb; }
        .otp-box {
          background: white;
          border: 2px dashed #6366F1;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 48px;
          font-weight: bold;
          color: #6366F1;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
        }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        .warning { color: #F97316; font-size: 14px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 Live Market</h1>
        </div>
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>Thank you for signing up! Please use the verification code below to complete your registration:</p>

          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>

          <p class="warning">⚠️ This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Live Market. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({ to, subject, html });
}
