import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";

export interface BusinessAgreementAttributes {
  id: string;
  businessId: string;
  userId: string;
  agreedToTerms: boolean;
  signatureData: string;
  signedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

type BusinessAgreementCreationAttributes = Optional<
  BusinessAgreementAttributes,
  "id" | "signedAt" | "createdAt" | "updatedAt"
>;

class BusinessAgreement extends Model<BusinessAgreementAttributes, BusinessAgreementCreationAttributes>
  implements BusinessAgreementAttributes {
  declare id: string;
  declare businessId: string;
  declare userId: string;
  declare agreedToTerms: boolean;
  declare signatureData: string;
  declare signedAt: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations will be defined in index.ts
  public business?: any;
  public user?: any;
}

BusinessAgreement.init(
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
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "user_id",
    },
    agreedToTerms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "agreed_to_terms",
    },
    signatureData: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "signature_data",
    },
    signedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "signed_at",
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
    tableName: "business_agreements",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export { BusinessAgreement };
