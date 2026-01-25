import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { initiateRegistration } from "@/services/registration.service";

const initiateSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  businessName: z.string().min(1, "Business name is required"),
  businessRegNumber: z.string().min(1, "Business registration number is required"),
  businessAddress: z.string().min(1, "Business address is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = initiateSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message);
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const result = await initiateRegistration(validationResult.data);

    if (result.success) {
      return NextResponse.json({
        success: true,
        registrationId: result.registrationId,
        message: "Registration initiated. Please check your email for the verification code.",
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error("Initiate registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
