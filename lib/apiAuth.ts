import { NextRequest } from "next/server";
import * as jose from "jose";

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * Extract and verify JWT from Authorization header
 * Use this in API routes that need authentication
 */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

    const { payload } = await jose.jwtVerify(token, secret);

    return {
      id: payload.id as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      isAdmin: payload.isAdmin as boolean,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

/**
 * Generate JWT token for a user
 */
export async function generateToken(user: AuthUser): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

  const token = await new jose.SignJWT({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}
