import pg from "pg";
import { Sequelize } from "sequelize";

let sequelize: Sequelize | null = null;

export function getSequelize() {
  if (!sequelize) {
    // Fix for timestamp parsing in pg
    pg.types.setTypeParser(1114, (stringValue: string) => {
      return new Date(stringValue + "+0000");
    });

    sequelize = new Sequelize(
      process.env.PGDB_NAME as string,
      process.env.PGDB_USERNAME as string,
      process.env.PGDB_PASSWORD as string,
      {
        host: process.env.PGDB_HOST,
        port: parseInt(process.env.PGDB_PORT || "5432"),
        dialect: "postgres",
        dialectModule: pg,
        logging: process.env.NODE_ENV === "development" ? console.log : false,
      }
    );
  }
  return sequelize;
}
