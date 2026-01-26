import { DataTypes, Model, Optional } from "sequelize";
import { getSequelize } from "@/lib/sequelize";

interface FileAttributes {
  id: string;
  name: string;
  path: string;
  createdBy?: string;
}

type FileCreationAttributes = Optional<FileAttributes, "id" | "createdBy">;

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  declare id: string;
  declare name: string;
  declare path: string;
  declare createdBy?: string;
}

File.init(
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
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "created_by",
    },
  },
  {
    sequelize: getSequelize(),
    tableName: "files",
    timestamps: false,
  }
);

export { File };
