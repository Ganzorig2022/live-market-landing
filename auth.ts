import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig, NextAuthResult, User } from "next-auth";
import { loginUser } from "@/services/auth.service";

// Extend NextAuth types
declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			id: string;
			email: string;
			name: string;
			firstName: string;
			lastName: string;
			isAdmin: boolean;
		};
	}

	interface User {
		id: string;
		email: string;
		name: string;
		firstName: string;
		lastName: string;
		isAdmin: boolean;
		accessToken?: string;
	}
}

const config: NextAuthConfig = {
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
	},
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: {
					type: "email",
					label: "Email",
					placeholder: "user@example.com",
				},
				password: {
					type: "password",
					label: "Password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const result = await loginUser({
						email: credentials.email as string,
						password: credentials.password as string,
					});

					if (!result.success || !result.user || !result.token) {
						return null;
					}

					return {
						id: result.user.id.toString(),
						email: result.user.email,
						name: `${result.user.firstName} ${result.user.lastName}`,
						firstName: result.user.firstName,
						lastName: result.user.lastName,
						isAdmin: result.user.isAdmin,
						accessToken: result.token,
					};
				} catch (error) {
					console.error("❌ Login error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.isAdmin = user.isAdmin;
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.id) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.firstName = token.firstName as string;
				session.user.lastName = token.lastName as string;
				session.user.isAdmin = token.isAdmin as boolean;
				session.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
};

const nextAuth = NextAuth(config);

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
