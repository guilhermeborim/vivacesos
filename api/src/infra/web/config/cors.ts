import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
  });
};
