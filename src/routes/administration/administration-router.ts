import { FastifyInstance } from "fastify";
import administrationController from "../../controllers/administration/administration-controller.js";
import { User } from "../../models/user-model.js";

const administrationRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Params: { id: string };
    Reply: User;
  }>({
    method: "GET",
    onRequest: fastify.asyncVerifyJWT,
    url: "/users/:id",
    handler: administrationController.getUser,
  });
};

export default administrationRouter;
