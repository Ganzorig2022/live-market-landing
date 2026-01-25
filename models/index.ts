import { User } from "./User";
import { Business } from "./Business";
import { Shop } from "./Shop";
import { Warehouse } from "./Warehouse";
import { PendingRegistration } from "./PendingRegistration";

// Define associations
Business.hasMany(Shop, { foreignKey: "businessId", as: "shops" });
Shop.belongsTo(Business, { foreignKey: "businessId", as: "business" });

Business.hasMany(Warehouse, { foreignKey: "businessId", as: "warehouses" });
Warehouse.belongsTo(Business, { foreignKey: "businessId", as: "business" });

Business.hasMany(User, { foreignKey: "businessId", as: "users" });
User.belongsTo(Business, { foreignKey: "businessId", as: "business" });

export { User, Business, Shop, Warehouse, PendingRegistration };

// Export all models for easy access
export const models = {
  User,
  Business,
  Shop,
  Warehouse,
  PendingRegistration,
};
