import fs from "fs"
import path from "path"
import { SassDataSource } from "./typeorm/sass/data-source"

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...")
    console.log("[APP CONTENTS]", fs.readdirSync("/app"))
    console.log("[DIRNAME]", __dirname)
    console.log("[ENTITIES PATH]", path.join(__dirname, "typeorm/sass/entities/*.js"))

    const sassDir = "/app/infra/database/typeorm/sass"
    console.log("[SASS DIR]", fs.readdirSync(sassDir))
    console.log("[ENTITIES FILES]", fs.readdirSync(path.join(sassDir, "entities")))
    console.log("[MIGRATIONS FILES]", fs.readdirSync(path.join(sassDir, "migrations")))

    await SassDataSource.initialize()
    console.log(
      "[TODAS ENTIDADES]",
      SassDataSource.entityMetadatas.map((m) => m.name),
    )
    await SassDataSource.runMigrations()

    console.info("[DATABASE] Connected.")
  } catch (error) {
    console.error("[DATABASE] Connection error.", error)
    throw error
  }
}
