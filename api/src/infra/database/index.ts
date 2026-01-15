import { SassDataSource } from "./typeorm/sass/data-source";

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...");

    await SassDataSource.initialize();
    console.log(
      "[TODAS ENTIDADES]",
      SassDataSource.entityMetadatas.map((m) => m.name)
    );
    await SassDataSource.runMigrations();

    console.info("[DATABASE] Connected.");
  } catch (error) {
    console.error("[DATABASE] Conection error.", error);

    throw error;
  }
};
