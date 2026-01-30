import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import type { User } from "./User";
import { BusinessAttributes } from "@/models/Business";

export interface ShopAttributes {
  id: string;
  name: string;
  slug: string;
  businessId: string;
  logoId: string | null;
  imageId: string | null;
  description?: string;
  phone?: string;
  email?: string;
  facebook?: string;
  messenger?: string;
  youtube?: string;
  instagram?: string;
  address?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  business?: BusinessAttributes;
}

type ShopCreationAttributes = Optional<
  ShopAttributes,
  | "id"
  | "logoId"
  | "imageId"
  | "description"
  | "phone"
  | "email"
  | "facebook"
  | "messenger"
  | "youtube"
  | "instagram"
  | "address"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

class Shop extends Model<ShopAttributes, ShopCreationAttributes> implements ShopAttributes {
  declare id: string;
  declare name: string;
  declare slug: string;
  declare businessId: string;
  declare logoId: string | null;
  declare imageId: string | null;
  declare description?: string;
  declare phone?: string;
  declare email?: string;
  declare facebook?: string;
  declare messenger?: string;
  declare youtube?: string;
  declare instagram?: string;
  declare address?: string;
  declare status: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt?: Date | null;

  // Associations will be defined in index.ts
  public business?: BusinessAttributes;
  public cashiers?: User[];
}

Shop.init(
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
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "business_id",
    },
    logoId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "logo_id",
    },
    imageId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "image_id",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    messenger: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    youtube: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "shops",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { Shop };
