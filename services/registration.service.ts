import { getSequelize } from "@/lib/sequelize";
import { PendingRegistration, User } from "@/models";
import { sendOtp } from "./otp.service";

export interface InitiateRegistrationData {
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	businessName: string;
	shopName: string;
	hasMultipleShops: boolean;
}

export interface CompleteRegistrationData {
	registrationId: string;
	agreedToTerms: boolean;
	signatureData: string;
}

/**
 * Step 1: Initiate registration - create pending record and send OTP
 */
export async function initiateRegistration(
	data: InitiateRegistrationData,
): Promise<{ success: boolean; registrationId?: string; error?: string }> {
	try {
		// Check if email already exists in Users
		const existingUser = await User.findOne({
			where: { email: data.email },
		});
		if (existingUser) {
			return {
				success: false,
				error: "An account with this email already exists",
			};
		}

		// Check if email already has a pending registration
		const existingPending = await PendingRegistration.findOne({
			where: { email: data.email },
		});

		if (existingPending) {
			// TODO: instead of deletion, set "status" = false
			await existingPending.update({
				status: true,
			});
		}

		// Create pending registration
		const registrationId = crypto.randomUUID();
		await PendingRegistration.create({
			id: registrationId,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			businessName: data.businessName,
			shopName: data.shopName,
			hasMultipleShops: data.hasMultipleShops,
			step: 1,
			status: false,
		});

		// Send OTP
		const otpResult = await sendOtp(registrationId);
		if (!otpResult.success) {
			return { success: false, error: otpResult.error };
		}

		// Update step to 2 (waiting for OTP verification)
		await PendingRegistration.update(
			{ step: 2 },
			{ where: { id: registrationId } },
		);

		return { success: true, registrationId };
	} catch (error) {
		console.error("Error initiating registration:", error);
		return { success: false, error: "Failed to initiate registration" };
	}
}

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

/**
 * Step 3: Complete registration - send request to ADMIN
 */
export async function completeRegistration(
	data: CompleteRegistrationData,
): Promise<{ success: boolean; error?: string }> {
	const sequelize = getSequelize();
	const transaction = await sequelize.transaction();

	try {
		const registration = await PendingRegistration.findByPk(
			data.registrationId,
		);

		if (!registration) {
			await transaction.rollback();
			return { success: false, error: "Registration not found" };
		}

		if (!registration.otpVerified) {
			await transaction.rollback();
			return {
				success: false,
				error: "Email not verified. Please complete OTP verification first.",
			};
		}

		if (!data.agreedToTerms) {
			await transaction.rollback();
			return {
				success: false,
				error: "You must agree to the terms and conditions",
			};
		}

		if (!data.signatureData) {
			await transaction.rollback();
			return { success: false, error: "Signature is required" };
		}

		// Commit transaction
		await transaction.commit();

		return { success: true };
	} catch (error) {
		await transaction.rollback();
		console.error("Error completing registration:", error);
		return { success: false, error: "Failed to complete registration" };
	}
}
