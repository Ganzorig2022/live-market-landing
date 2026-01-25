import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
    accessToken?: string;
  }
}
