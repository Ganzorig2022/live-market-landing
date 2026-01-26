import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await loginUser({ email, password });

    if (result.success) {
      return NextResponse.json({
        user: result.user,
        token: result.token,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
  } catch (error) {
    console.error("❌ Login error2:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
