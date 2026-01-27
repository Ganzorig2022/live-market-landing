import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendOtp } from "@/services/otp.service";

const sendOtpSchema = z.object({
	registrationId: z.string().uuid("Invalid registration ID"),
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		// Validate input
		const validationResult = sendOtpSchema.safeParse(body);
		if (!validationResult.success) {
			const errors = validationResult.error.errors.map((e) => e.message);
			return NextResponse.json({ error: errors[0] }, { status: 400 });
		}

		const { registrationId } = validationResult.data;
		const result = await sendOtp(registrationId);

		if (result.success) {
			return NextResponse.json({
				success: true,
				message: "OTP sent successfully.",
			});
		} else {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}
	} catch (error) {
		console.error("Send OTP error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
