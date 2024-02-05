import { FastifyInstance, errorCodes } from "fastify";
import controller from "../../controllers/index.js";
import authSchema from "./schema.js";

const { authController } = controller;
const { signupSchema } = authSchema;

const authRouter = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(function (error, request, reply) {
   
    reply.status(500).send({ ok: 'man2' })
  
  });
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
