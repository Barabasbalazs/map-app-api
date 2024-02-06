import { FastifyInstance } from "fastify";
import controller from "../../controllers/index.js";
import authSchema from "./auth-schema.js";

const { authController } = controller;
const { signupSchema } = authSchema;

const authRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/login",
    handler: authController.login,
  });
  fastify.route({
    method: "POST",
    url: "/signup",
    schema: signupSchema,
    handler: authController.signup,
  });
};

export default authRouter;
