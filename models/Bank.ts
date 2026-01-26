import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";

interface BankAttributes {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

type BankCreationAttributes = Optional<BankAttributes, "id" | "createdAt" | "updatedAt">;

class Bank extends Model<BankAttributes, BankCreationAttributes> implements BankAttributes {
  declare id: string;
  declare name: string;
  declare nameEn: string;
  declare code: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations will be defined in index.ts
  public businessBanks?: any[];
}

Bank.init(
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
    nameEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "name_en",
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  },
  {
    sequelize: getSequelize(),
    tableName: "banks",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { Bank };
