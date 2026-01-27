import { NextRequest, NextResponse } from "next/server";
import { getRegistrationStatus } from "@/services/registration.service";

export async function GET(req: NextRequest) {
	try {
		const registrationId = req.nextUrl.searchParams.get("id");

		if (!registrationId) {
			return NextResponse.json(
				{ error: "Registration ID is required" },
				{ status: 400 },
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
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
