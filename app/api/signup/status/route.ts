import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRegistrationStatus } from "@/services/registration.service";

const statusSchema = z.object({
  id: z.string().uuid("Invalid registration ID format"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const registrationId = searchParams.get("id");

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    // Validate UUID format
    const validation = statusSchema.safeParse({ id: registrationId });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const result = await getRegistrationStatus(registrationId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
  } catch (error) {
    console.error("Get registration status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
