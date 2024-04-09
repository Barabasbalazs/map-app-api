import { FastifyInstance } from "fastify";
import administrationController from "../../controllers/administration/administration-controller.js";
import administrationSchema from "./administration-schema.js";
import { User } from "../../models/user-model.js";

const { userIdSchema } = administrationSchema;

const administrationRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Params: { id: string };
    Reply: User;
  }>({
    method: "GET",
    onRequest: fastify.asyncVerifyJWT,
    url: "/users/:id",
    handler: administrationController.getUser,
    schema: userIdSchema,
  });
};

export default administrationRouter;
