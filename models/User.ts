import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import { Business } from "./Business";

export type UserRole = "owner" | "staff";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare phone: CreationOptional<string | null>;
  declare businessId: ForeignKey<Business["id"]> | null;
  declare role: CreationOptional<UserRole>;
  declare signatureData: CreationOptional<string | null>; // Base64 signature image
  declare isAdmin: CreationOptional<boolean>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      allowNull: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "business_id",
      references: {
        model: "businesses",
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM("owner", "staff"),
      allowNull: false,
      defaultValue: "staff",
    },
    signatureData: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "signature_data",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Changed to false - requires admin approval
      field: "is_active",
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
    tableName: "users",
    underscored: true,
    timestamps: true,
  }
);
