import { PendingRegistration } from "@/models";

/**
 * Get registration status
 */
export async function getRegistrationStatus(registrationId: string): Promise<{
	success: boolean;
	data?: Partial<PendingRegistration>;
	error?: string;
}> {
	try {
		const registration = await PendingRegistration.findByPk(
			registrationId,
			{
				attributes: [
					"id",
					"email",
					"firstName",
					"lastName",
					"businessName",
					"step",
					"otpVerified",
				],
			},
		);

		if (!registration) {
			return { success: false, error: "Registration not found" };
		}

		return {
			success: true,
			data: {
				id: registration.id,
				email: registration.email,
				firstName: registration.firstName,
				lastName: registration.lastName,
				businessName: registration.businessName,
				step: registration.step,
				otpVerified: registration.otpVerified,
			},
		};
	} catch (error) {
		console.error("Error getting registration status:", error);
		return { success: false, error: "Failed to get registration status" };
	}
}
