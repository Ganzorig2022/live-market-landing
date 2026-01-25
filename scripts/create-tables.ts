import "dotenv/config";
import { getSequelize } from "../lib/sequelize";
// Import all models to register them with Sequelize
import "../models";

async function createTables() {
  const sequelize = getSequelize();

  try {
    // Test connection
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    // Sync all models (create tables)
    // Using alter: true to update existing tables without dropping them
    await sequelize.sync({ alter: true });
    
    console.log("✅ All tables created/updated successfully.");
    console.log("\nTables created:");
    console.log("  - users");
    console.log("  - businesses");
    console.log("  - shops");
    console.log("  - warehouses");
    console.log("  - pending_registrations");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    process.exit(1);
  }
}

createTables();
