import { SassDataSource } from "./typeorm/sass/data-source";

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...");

    await SassDataSource.initialize();
    await SassDataSource.runMigrations();

    console.info("[DATABASE] Connected.");
  } catch (error) {
    console.error("[DATABASE] Conection error.", error);

    throw error;
  }
};
