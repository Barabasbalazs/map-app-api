import { FastifyInstance } from "fastify";
import controller from "../../controllers/index.js";
import authSchema from "./auth-schema.js";
import { AuthenticatedUser, User } from "../../models/user-model.js";

const { authController } = controller;
const { signupSchema } = authSchema;

const authRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: User,
    Reply: AuthenticatedUser
  }>({
    method: "POST",
    url: "/login",
    handler: authController.login,
  });
  fastify.route<{
    Body: User,
    Reply: AuthenticatedUser
  }>({
    method: "POST",
    url: "/signup",
    schema: signupSchema,
    handler: authController.signup,
  });
  /*
  fastify.route({
    method: "GET",
    url: "/test",
    onRequest: fastify.asyncVerifyJWT,
    handler: authController.test,
  });
  */
};

export default authRouter;
