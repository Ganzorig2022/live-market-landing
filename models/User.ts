import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";
import type { Business } from "./Business";
import type { Shop } from "./Shop";

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  emailVerifiedAt?: Date;
  avatar?: string;
  password?: string; // Made optional for invitation flow
  isActive: boolean;
  isAdmin: boolean;
  businessId?: string;
  shopId?: string;
  invitationToken?: string;
  invitationSentAt?: Date;
  invitationAcceptedAt?: Date;
  invitedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  business?: Business;
  shop?: Shop;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | "id"
  | "phone"
  | "emailVerifiedAt"
  | "avatar"
  | "password"
  | "businessId"
  | "shopId"
  | "invitationToken"
  | "invitationSentAt"
  | "invitationAcceptedAt"
  | "invitedBy"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone?: string;
  declare emailVerifiedAt?: Date;
  declare avatar?: string;
  declare password?: string;
  declare isActive: boolean;
  declare isAdmin: boolean;
  declare businessId?: string;
  declare shopId?: string;
  declare invitationToken?: string;
  declare invitationSentAt?: Date;
  declare invitationAcceptedAt?: Date;
  declare invitedBy?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt?: Date | null;

  // Instance methods
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Associations
  declare business?: Business;
  declare shop?: Shop;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "email_verified_at",
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Nullable for invitation flow
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
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
    invitationToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "invitation_token",
    },
    invitationSentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "invitation_sent_at",
    },
    invitationAcceptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "invitation_accepted_at",
    },
    invitedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "invited_by",
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
    tableName: "users",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  },
);

export { User };
export type { UserAttributes };
