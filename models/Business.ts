import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { getSequelize } from "@/lib/sequelize";

export class Business extends Model<
  InferAttributes<Business>,
  InferCreationAttributes<Business>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare registrationNumber: string;
  declare email: string;
  declare phone: string;
  declare address: string;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "registration_number",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "businesses",
    underscored: true,
    timestamps: true,
  }
);
