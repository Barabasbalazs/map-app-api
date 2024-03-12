import { FastifyInstance } from "fastify";
import authRouter from "./auth/auth-router.js";
import trailsRouter from "./trails/trails-router.js";

const router = async (fastify: FastifyInstance) => {
  fastify.register(authRouter, { prefix: "/auth" });
  fastify.register(trailsRouter, { prefix: "/trails" });
};

export default router;
