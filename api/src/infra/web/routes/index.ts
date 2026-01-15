import { FastifyInstance } from "fastify";
import * as ClinicRoutes from "./clinic.routes";
import * as AuthRoutes from "./user.routes";
export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    ClinicRoutes.configure(instance);
    done();
  });
};
