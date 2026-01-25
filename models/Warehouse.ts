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

export class Warehouse extends Model<
  InferAttributes<Warehouse>,
  InferCreationAttributes<Warehouse>
> {
  declare id: CreationOptional<number>;
  declare businessId: ForeignKey<Business["id"]>;
  declare name: string;
  declare address: string;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "business_id",
      references: {
        model: "businesses",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
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
    tableName: "warehouses",
    underscored: true,
    timestamps: true,
  }
);
