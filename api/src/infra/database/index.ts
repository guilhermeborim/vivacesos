import fs from "fs"
import path from "path"
import { SassDataSource } from "./typeorm/sass/data-source"

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...")
    console.info("[__dirname]", __dirname)
    console.info("[dist contents]", fs.readdirSync(path.join(__dirname, "../../..")))

    await SassDataSource.initialize()
    console.log(
      "[TODAS ENTIDADES]",
      SassDataSource.entityMetadatas.map((m) => m.name),
    )
    await SassDataSource.runMigrations()

    console.info("[DATABASE] Connected.")
  } catch (error) {
    console.error("[DATABASE] Conection error.", error)
    throw error
  }
}
