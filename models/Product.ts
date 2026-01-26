import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import type { BusinessAttributes } from "./Business";
import type { ProductCategoryAttributes } from "./ProductCategory";
import type { DeliveryTypeAttributes } from "./DeliveryType";
import type { VariantAttributes } from "./Variant";
import { ShopAttributes } from "./Shop";

export interface ProductAttributes {
  id: string;
  businessId: string;
  shopId?: string;
  name: string;
  description?: string;
  status: boolean;
  video?: string;
  deliveryTypeId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  business?: BusinessAttributes;
  shop?: ShopAttributes;
  categories?: ProductCategoryAttributes[];
  deliveryType?: DeliveryTypeAttributes;
  variants?: VariantAttributes[];
}

type ProductCreationAttributes = Optional<
  ProductAttributes,
  | "id"
  | "shopId"
  | "description"
  | "video"
  | "deliveryTypeId"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "business"
  | "categories"
  | "deliveryType"
>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: string;
  declare businessId: string;
  declare shopId?: string;
  declare name: string;
  declare description?: string;
  declare status: boolean;
  declare video?: string;
  declare deliveryTypeId?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt?: Date | null;

  // Associations will be defined in index.ts
  public business?: any;
  public shop?: any;
  public variants?: any[];
  public categories?: any[];
  public images?: any[];
  public orderItems?: any[];
  public wishLists?: any[];
  public deliveryType?: any;

  // Many-to-many association methods for categories
  public declare setCategories: (categories: any[]) => Promise<void>;
  public declare addCategories: (categories: any[]) => Promise<void>;
  public declare addCategory: (category: any) => Promise<void>;
  public declare removeCategories: (categories: any[]) => Promise<void>;
  public declare removeCategory: (category: any) => Promise<void>;
  public declare hasCategories: (categories: any[]) => Promise<boolean>;
  public declare hasCategory: (category: any) => Promise<boolean>;
  public declare countCategories: () => Promise<number>;
}

Product.init(
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
    shopId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "shop_id",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    deliveryTypeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "delivery_type_id",
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
    tableName: "products",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { Product };
