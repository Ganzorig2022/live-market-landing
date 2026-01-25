import { NextResponse } from "next/server";
import { getSequelize } from "@/lib/sequelize";

export async function GET() {
  try {
    // Test database connection
    const sequelize = getSequelize();
    await sequelize.authenticate();

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
