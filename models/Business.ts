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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  shops?: ShopAttributes[];
}

type BusinessCreationAttributes = Optional<BusinessAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">;

class Business extends Model<BusinessAttributes, BusinessCreationAttributes> implements BusinessAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare status: boolean;
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
