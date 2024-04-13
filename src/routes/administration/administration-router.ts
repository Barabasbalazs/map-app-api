import { FastifyInstance } from "fastify";
import administrationController from "../../controllers/administration/administration-controller.js";
import administrationSchema from "./administration-schema.js";
import { User } from "../../models/user-model.js";

const { getUser, updateUser, getAllUsers } = administrationController;
const { userIdSchema, partialUserSchema } = administrationSchema;

const administrationRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Params: { id: string };
    Reply: User;
  }>({
    method: "GET",
    onRequest: fastify.asyncVerifyJWT,
    url: "/users/:id",
    handler: getUser,
    schema: userIdSchema,
  });
  fastify.route<{
    Params: { id: string };
    Body: User;
    Reply: User;
  }>({
    method: "PATCH",
    onRequest: fastify.asyncVerifyJWT,
    url: "/users/:id",
    schema: partialUserSchema,
    handler: updateUser,
  });
  fastify.route<{
    Reply: User[];
  }>({
    method: "GET",
    onRequest: fastify.asyncVerifyJWT,
    url: "/users",
    handler: getAllUsers,
  });
};

export default administrationRouter;
