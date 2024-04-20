import { FastifyInstance } from "fastify";
import authRouter from "./auth/auth-router.js";
import trailsRouter from "./trails/trails-router.js";
import administrationRouter from "./administration/administration-router.js";
import adminRequestRouter from "./admin-request/admin-request-router.js";


const router = async (fastify: FastifyInstance) => {
  fastify.register(authRouter, { prefix: "/auth" });
  fastify.register(trailsRouter, { prefix: "/trails" });
  fastify.register(administrationRouter, { prefix: "/administration" });
  fastify.register(adminRequestRouter, { prefix: "/admin-requests" });
};

export default router;
