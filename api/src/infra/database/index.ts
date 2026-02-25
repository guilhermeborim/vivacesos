import fs from "fs"
import path from "path"
import { SassDataSource } from "./typeorm/sass/data-source"

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...")
    console.info("[DATABASE] Connecting...")
    console.log("[APP CONTENTS]", fs.readdirSync("/app"))
    console.log("[DIRNAME]", __dirname)
    console.log("[ENTITIES PATH]", path.join(__dirname, "typeorm/sass/entities/*.js"))
    console.log("[ENTITIES DIR]", fs.readdirSync("/app/infra/database/typeorm/sass/"))
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
