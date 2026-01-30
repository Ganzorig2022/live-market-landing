import "dotenv/config";
import bcrypt from "bcryptjs";
import { User } from "../models";

async function seed() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists. Skipping seed.");
      process.exit(0);
    }

    // Create admin user (without business - this is a platform admin)
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      email: "admin@example.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      isAdmin: true,
      isActive: true, // Admin is active by default
    });

    console.log("✅ Admin user created successfully:");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: admin123`);
    console.log("\n⚠️  Remember to change the password in production!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
