import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const initiateSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  businessName: z.string().min(1, "Business name is required"),
  shopName: z.string().min(1, "Shop name is required"),
  hasMultipleShops: z.boolean(),
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

    const data = validationResult.data;

    // Call admin API to initiate registration
    const adminApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!adminApiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch(`${adminApiUrl}/public/registration/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        businessName: data.businessName,
        shopName: data.shopName,
        hasMultipleShops: data.hasMultipleShops,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return NextResponse.json({
        success: true,
        registrationId: result.registrationId,
        message: result.message || "Registration initiated. Please check your email for the verification code.",
      });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to initiate registration" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Initiate registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
