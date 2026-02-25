import "dotenv/config"
import path from "path"
import "reflect-metadata"
import { DataSource } from "typeorm"
const baseDir = path.join(__dirname, "typeorm/sass")
export const SassDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [`${baseDir}/entities/*.js`],
  migrations: [`${baseDir}/migrations/*.js`],
})
