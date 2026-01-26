import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
	PendingRegistration,
	Business,
	Shop,
	Warehouse,
	User,
	BusinessAgreement,
} from "@/models";
import { sendOtp } from "./otp.service";
import { getSequelize } from "@/lib/sequelize";

export interface InitiateRegistrationData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	businessName: string;
	shopName: string;
	numberOfEmployees: number | null;
	hasMultipleShops: boolean;
	hasMultipleWarehouses: boolean;
}

export interface CompleteRegistrationData {
	registrationId: string;
	agreedToTerms: boolean;
	signatureData: string;
}

/**
 * Generate a URL-friendly slug from business name
 */
function generateSlug(name: string): string {
	const baseSlug = name
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();

	// Add random suffix for uniqueness
	const randomSuffix = Math.random().toString(36).substring(2, 6);
	return `${baseSlug}-${randomSuffix}`;
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
			// Delete old pending registration and create new one
			await existingPending.destroy();
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(data.password, 10);

		// Create pending registration
		const registrationId = uuidv4();
		await PendingRegistration.create({
			id: registrationId,
			email: data.email,
			password: hashedPassword,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			businessName: data.businessName,
			step: 1,
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
export async function getRegistrationStatus(
	registrationId: string,
): Promise<{
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
 * Step 3: Complete registration - create all entities
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

		// Create Business
		const business = await Business.create(
			{
				name: registration.businessName,
				email: registration.email,
				status: false, // Requires admin approval
				numberOfEmployees: registration.numberOfEmployees ?? undefined,
				hasMultipleShops: registration.hasMultipleShops,
				hasMultipleWarehouses: registration.hasMultipleWarehouses,
			},
			{ transaction },
		);

		// Create Shop (user-provided name)
		await Shop.create(
			{
				businessId: business.id,
				name: registration.shopName,
				slug: generateSlug(registration.shopName),
				status: false,
			},
			{ transaction },
		);

		// Create Warehouse (auto-named)
		await Warehouse.create(
			{
				businessId: business.id,
				name: `${registration.businessName} Warehouse`,
				address: undefined,
				isActive: false,
			},
			{ transaction },
		);

		// Create User
		const user = await User.create(
			{
				email: registration.email,
				password: registration.password, // Already hashed
				firstName: registration.firstName,
				lastName: registration.lastName,
				phone: registration.phone,
				businessId: business.id,
				isAdmin: false,
				isActive: false, // Requires admin approval
			},
			{ transaction },
		);

		// Create Business Agreement with signature
		await BusinessAgreement.create(
			{
				businessId: business.id,
				userId: user.id,
				agreedToTerms: data.agreedToTerms,
				signatureData: data.signatureData,
			},
			{ transaction },
		);

		// Delete pending registration
		await registration.destroy({ transaction });

		// Commit transaction
		await transaction.commit();

		return { success: true };
	} catch (error) {
		await transaction.rollback();
		console.error("Error completing registration:", error);
		return { success: false, error: "Failed to complete registration" };
	}
}
