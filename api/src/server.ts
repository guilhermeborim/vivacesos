import "dotenv/config";
import fastify from "fastify";
import * as Database from "./infra/database/";
import * as Cookies from "./infra/web/config/cookies";
import * as Cors from "./infra/web/config/cors";
import * as ErrorHandler from "./infra/web/config/error-handler";
import * as Routes from "./infra/web/routes";
import path = require("path");

(async () => {
  const app = fastify();

  ErrorHandler.configure(app);

  await Cors.register(app);
  await Cookies.register(app);
  await Database.connect();

  Routes.register(app);

  app.get("/health", async (request, reply) => {
    return { status: "ok" };
  });

  app.listen(
    {
      port: 3334,
    },
    () => {
      console.log(`Api rodando na porta ${process.env.PORT}`);
    },
  );
})();
