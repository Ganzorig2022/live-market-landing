import { PendingRegistration } from "@/models";
import { sendOtpEmail } from "@/lib/email";

/**
 * Generate a 6-digit OTP code
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate OTP and send email
 */
export async function sendOtp(registrationId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const registration = await PendingRegistration.findByPk(registrationId);

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    const otpCode = generateOtpCode();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await registration.update({
      otpCode,
      otpExpiresAt,
    });

    // Send OTP email
    await sendOtpEmail(registration.email, otpCode, registration.firstName);

    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error: "Failed to send OTP" };
  }
}

/**
 * Verify OTP code
 */
export async function verifyOtp(
  registrationId: string,
  otpCode: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const registration = await PendingRegistration.findByPk(registrationId);

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    if (registration.otpVerified) {
      return { success: false, error: "OTP already verified" };
    }

    if (!registration.otpCode || !registration.otpExpiresAt) {
      return { success: false, error: "No OTP code found. Please request a new one." };
    }

    // Check if OTP expired
    if (new Date() > registration.otpExpiresAt) {
      return { success: false, error: "OTP has expired. Please request a new one." };
    }

    // Check if OTP matches
    if (registration.otpCode !== otpCode) {
      return { success: false, error: "Invalid OTP code" };
    }

    // Mark as verified
    await registration.update({
      otpVerified: true,
      step: 3,
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
}
