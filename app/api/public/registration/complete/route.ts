import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { completeRegistration } from "@/services/registration.service";

const completeSchema = z.object({
	registrationId: z.string().uuid("Invalid registration ID"),
	agreedToTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and conditions",
	}),
	signatureData: z.string().min(1, "Signature is required"),
	documentUrls: z
		.array(z.string().url())
		.min(1, "At least one agreement document is required"),
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

		const result = await completeRegistration(validationResult.data);

		if (result.success) {
			return NextResponse.json({
				success: true,
				message:
					"Registration completed successfully. Your account is pending approval.",
			});
		} else {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}
	} catch (error) {
		console.error("Complete registration error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
