import bcrypt from "bcryptjs";
import { User, Business } from "@/models";
import { generateToken } from "@/lib/apiAuth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    businessId?: number;
    business?: {
      id: number;
      name: string;
    };
  };
  token?: string;
  error?: string;
}

/**
 * Authenticate user with email and password
 */
export async function loginUser(credentials: LoginCredentials): Promise<LoginResult> {
  try {
    const { email, password } = credentials;

    // Find user by email with business
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Business,
          as: "business",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Check if user is active
    if (!user.isActive) {
      console.log("❌ user.isActive: ", user.isActive)
      return {
        success: false,
        error: "Your account is pending approval. You will receive an email once approved.",
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: "Invalid email or password" };
    }

    // Generate JWT token
    const token = await generateToken({
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    });

    // Get business data if exists
    const businessData = user.businessId
      ? {
          id: (user as unknown as { business: Business }).business?.id,
          name: (user as unknown as { business: Business }).business?.name,
        }
      : undefined;

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        businessId: user.businessId ?? undefined,
        business: businessData,
      },
      token,
    };
  } catch (error) {
    console.error("❌ Login error1:", error);
    return { success: false, error: "An error occurred during login" };
  }
}
