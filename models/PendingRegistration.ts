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
  declare password: string; // Hashed
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare businessName: string;
  declare businessRegNumber: string;
  declare businessAddress: string;
  declare otpCode: CreationOptional<string | null>;
  declare otpExpiresAt: CreationOptional<Date | null>;
  declare otpVerified: CreationOptional<boolean>;
  declare signatureData: CreationOptional<string | null>; // Base64 image
  declare agreedToTerms: CreationOptional<boolean>;
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
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    businessRegNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "business_reg_number",
    },
    businessAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "business_address",
    },
    otpCode: {
      type: DataTypes.STRING(6),
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
    signatureData: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "signature_data",
    },
    agreedToTerms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "agreed_to_terms",
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
