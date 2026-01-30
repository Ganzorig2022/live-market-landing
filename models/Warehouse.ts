import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import type { BusinessAttributes } from "./Business";

export interface WarehouseAttributes {
  id: string;
  businessId: string;
  name: string;
  address?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  business?: BusinessAttributes;
}

type WarehouseCreationAttributes = Optional<
  WarehouseAttributes,
  "id" | "address" | "description" | "isActive" | "createdAt" | "updatedAt" | "business"
>;

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  declare id: string;
  declare businessId: string;
  declare name: string;
  declare address?: string;
  declare description?: string;
  declare isActive: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations will be defined in index.ts
  public business?: BusinessAttributes;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "business_id",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize: getSequelize(),
    tableName: "warehouses",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { Warehouse };
