import { FastifyInstance } from "fastify";
import { AdminRequest } from "../../models/admin-request-model.js";
import adminRequestController from "../../controllers/admin-request/admin-request-controller.js";
import adminRequestSchema from "./admin-request-schema.js";

const { getAdminRequests, respondToAdminRequest } = adminRequestController;
const { adminRequestResponseSchema } = adminRequestSchema;

const adminRequestRouter = async (fastify: FastifyInstance) => {
  fastify.route<{
    Reply: AdminRequest[];
  }>({
    method: "GET",
    onRequest: fastify.asyncVerifyJWT,
    url: "/",
    handler: getAdminRequests,
  });
  fastify.route<{
    Params: { id: string };
    Body: {
      accepted: boolean;
    };
    Reply: { accepted: boolean };
  }>({
    method: "PATCH",
    onRequest: fastify.asyncVerifyJWT,
    url: "/:id",
    handler: respondToAdminRequest,
    schema: adminRequestResponseSchema,
  });
};

export default adminRequestRouter;
