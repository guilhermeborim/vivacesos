import { FastifyInstance } from "fastify";
import * as ClinicUserRoutes from "./clinic-user.routes";
import * as ClinicRoutes from "./clinic.routes";
import * as AuthRoutes from "./user.routes";
export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    ClinicRoutes.configure(instance);
    ClinicUserRoutes.configure(instance);
    done();
  });
};
