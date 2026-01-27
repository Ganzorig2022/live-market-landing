import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOtp } from "@/services/otp.service";

const verifyOtpSchema = z.object({
	registrationId: z.string().uuid("Invalid registration ID"),
	otpCode: z.string().min(6, "OTP must be at least 6 digits"),
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		// Validate input
		const validationResult = verifyOtpSchema.safeParse(body);
		if (!validationResult.success) {
			const errors = validationResult.error.errors.map((e) => e.message);
			return NextResponse.json({ error: errors[0] }, { status: 400 });
		}

		const { registrationId, otpCode } = validationResult.data;
		const result = await verifyOtp(registrationId, otpCode);

		if (result.success) {
			return NextResponse.json({
				success: true,
				message: "Email verified successfully.",
			});
		} else {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}
	} catch (error) {
		console.error("Verify OTP error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
