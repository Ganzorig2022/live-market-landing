import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import type { Product } from "./Product";
import type { Order } from "./Order";
import type { Bank } from "./Bank";
import { ShopAttributes } from "@/models/Shop";

export interface BusinessAttributes {
  id: string;
  name: string;
  email: string;
  status: boolean;
  numberOfEmployees?: number;
  hasMultipleShops: boolean;
  hasMultipleWarehouses: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  shops?: ShopAttributes[];
}

type BusinessCreationAttributes = Optional<BusinessAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt" | "numberOfEmployees">;

class Business extends Model<BusinessAttributes, BusinessCreationAttributes> implements BusinessAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare status: boolean;
  declare numberOfEmployees?: number;
  declare hasMultipleShops: boolean;
  declare hasMultipleWarehouses: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt?: Date | null;

  // Associations will be defined in index.ts
  public shops?: ShopAttributes[];
  public products?: Product[];
  public orders?: Order[];
  public banks?: Bank[];
}

Business.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "number_of_employees",
    },
    hasMultipleShops: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "has_multiple_shops",
    },
    hasMultipleWarehouses: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "has_multiple_warehouses",
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    sequelize: getSequelize(),
    tableName: "businesses",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { Business };
