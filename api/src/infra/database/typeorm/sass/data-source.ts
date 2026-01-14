import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const SassDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [path.resolve(__dirname, "entities", "*.{ts,js}")],
  migrations: [path.resolve(__dirname, "migrations", "*.{ts,js}")],
});
