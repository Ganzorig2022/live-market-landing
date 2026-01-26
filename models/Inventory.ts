import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import { WarehouseAttributes } from "./Warehouse";

export interface InventoryAttributes {
  id: string;
  businessId: string;
  warehouseId: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  warehouse?: WarehouseAttributes;
}

type InventoryCreationAttributes = Optional<
  InventoryAttributes,
  "id" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt"
>;

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  declare id: string;
  declare businessId: string;
  declare warehouseId: string;
  declare createdBy?: string;
  declare updatedBy?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations will be defined in index.ts
  public business?: any;
  public warehouse?: any;
  public items?: any[];
}

Inventory.init(
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
    warehouseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "warehouse_id",
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "created_by",
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "updated_by",
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
    tableName: "inventories",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { Inventory };
