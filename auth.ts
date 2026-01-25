import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig, NextAuthResult, User } from "next-auth";

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

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
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: `${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            isAdmin: data.user.isAdmin,
            accessToken: data.token,
          };
        } catch (error) {
          console.error("Login error:", error);
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
