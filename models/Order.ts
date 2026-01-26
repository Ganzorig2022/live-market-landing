import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import { Money } from "../utils/money";
import { ProductAttributes } from "./Product";

interface OrderAttributes {
  id: string;
  userId?: string;
  businessId?: string;
  shopId?: string;
  totalAmount: number;
  currency: string;
  specialInstructions?: string;
  sessionId: string;
  receiptNumber?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  // Associations
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
  business?: {
    id: string;
    name: string;
  };
  shop?: {
    id: string;
    name: string;
  };
  items?: Array<{
    id: string;
    orderId: string;
    productId: string;
    variantId: string;
    productName: string;
    productSku: string;
    pricePerUnit: number;
    currency: string;
    quantity: number;
    product?: ProductAttributes;
  }>;
  histories?: Array<{
    id: string;
    orderId: string;
    orderStatusId: string;
    note?: string;
    createdAt: Date;
    orderStatus?: {
      id: string;
    };
  }>;
  payments?: Array<{
    id: string;
    paidAmount: number;
    currency: string;
    paymentType: string;
    paidAt: Date;
  }>;
}

type OrderCreationAttributes = Optional<
  OrderAttributes,
  | "id"
  | "userId"
  | "businessId"
  | "shopId"
  | "specialInstructions"
  | "receiptNumber"
  | "createdBy"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: string;
  declare userId?: string;
  declare businessId?: string;
  declare shopId?: string;
  declare totalAmount: number;
  declare currency: string;
  declare specialInstructions?: string;
  declare sessionId: string;
  declare receiptNumber?: string;
  declare createdBy?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt?: Date | null;

  // Instance methods
  public getTotalAmount(): Money {
    return new Money(this.totalAmount, this.currency);
  }

  public getTotalQuantity(): number {
    // This would need to be calculated from order items
    return 0;
  }

  // Associations will be defined in index.ts
  public user?: any;
  public business?: any;
  public shop?: any;
  public creator?: any;
  public items?: any[];
  public histories?: any[];
  public payments?: any[];
  public address?: any;
}

Order.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "user_id",
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "business_id",
    },
    shopId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "shop_id",
    },
    totalAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "total_amount",
      get() {
        const rawValue = this.getDataValue("totalAmount");
        return rawValue && typeof rawValue === "string" ? parseInt(rawValue, 10) : rawValue;
      },
    },
    currency: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "MNT",
    },
    specialInstructions: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: "special_instructions",
    },
    sessionId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "session_id",
    },
    receiptNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "receipt_number",
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "created_by",
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
    tableName: "orders",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { Order };
export type { OrderAttributes };
