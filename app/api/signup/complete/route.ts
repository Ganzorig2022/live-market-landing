import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const completeSchema = z.object({
  registrationId: z.string().uuid("Invalid registration ID"),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  signatureData: z.string().min(1, "Signature is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = completeSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message);
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const data = validationResult.data;

    // Call admin API to complete registration
    const adminApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!adminApiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch(`${adminApiUrl}/public/registration/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registrationId: data.registrationId,
        agreedToTerms: data.agreedToTerms,
        signatureData: data.signatureData,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || "Registration completed successfully. Your account is pending approval.",
      });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to complete registration" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Complete registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
