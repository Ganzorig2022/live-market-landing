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
	declare hasMultipleShops: CreationOptional<boolean>;
	declare status: CreationOptional<boolean>;
	declare otpCode: CreationOptional<string | null>;
	declare otpExpiresAt: CreationOptional<Date | null>;
	declare otpVerified: CreationOptional<boolean>;
	declare step: CreationOptional<number>; // 1, 2, or 3
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare approvedAt?: Date | null;
	declare approvedBy?: string | null;
}

PendingRegistration.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
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
		phone: {
			type: DataTypes.STRING(255),
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
		hasMultipleShops: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "has_multiple_shops",
		},
		step: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		otpVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "otp_verified",
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
		approvedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "approved_at",
		},
		approvedBy: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: "approved_by",
		},
	},
	{
		sequelize: getSequelize(),
		tableName: "pending_registrations",
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	},
);
