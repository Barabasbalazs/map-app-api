import { FastifyInstance } from "fastify";
import authController from "../../controllers/auth/auth-controller.js";
import authSchema from "./auth-schema.js";
import { AuthenticatedUser, User } from "../../models/user-model.js";

const { signupSchema, loginSchema } = authSchema;

const authRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: User,
    Reply: AuthenticatedUser
  }>({
    method: "POST",
    url: "/login",
    schema: loginSchema,
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
};

export default authRouter;
