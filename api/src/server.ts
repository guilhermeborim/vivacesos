import "dotenv/config";
import fastify from "fastify";
// import * as Routes from "./infra/web/routes";
import * as Database from "./infra/database/";
import * as Cors from "./infra/web/config/cors";
// import * as Schema from "./infra/web/config/schema";
// import * as ErrorHandler from "./infra/web/config/error-handler";
import path = require("path");

(async () => {
  const app = fastify();

  // ErrorHandler.configure(app);

  // Schema.configure(app);

  await Cors.register(app);

  await Database.connect();

  // Routes.register(app);

  app.get("/health", async (request, reply) => {
    return { status: "ok" };
  });

  app.listen(
    {
      port: Number(process.env.PORT),
    },
    () => {
      console.log(`Api rodando na porta ${process.env.PORT}`);
    }
  );
})();
