import helmet from "@fastify/helmet";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(helmet);
};
