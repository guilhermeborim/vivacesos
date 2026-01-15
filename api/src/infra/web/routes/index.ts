import { FastifyInstance } from "fastify";
import * as AuthRoutes from "./user.routes";

export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    done();
  });
};
