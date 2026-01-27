import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { getSequelize } from "@/lib/sequelize";

export class PendingRegistration extends Model<
  InferAttributes<PendingRegistration>,
  InferCreationAttributes<PendingRegistration>
> {
  declare id: string; // UUID
  declare email: string;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare businessName: string;
  declare shopName: string;
  declare numberOfEmployees: CreationOptional<number | null>;
  declare hasMultipleShops: CreationOptional<boolean>;
  declare hasMultipleWarehouses: CreationOptional<boolean>;
  declare password: string; // Hashed password
  declare otpCode: CreationOptional<string | null>;
  declare otpExpiresAt: CreationOptional<Date | null>;
  declare otpVerified: CreationOptional<boolean>;
  declare step: CreationOptional<number>; // 1, 2, or 3
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PendingRegistration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "business_name",
    },
    shopName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "shop_name",
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
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    otpCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: "otp_code",
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "otp_expires_at",
    },
    otpVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "otp_verified",
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize: getSequelize(),
    tableName: "pending_registrations",
    underscored: true,
    timestamps: true,
  }
);
