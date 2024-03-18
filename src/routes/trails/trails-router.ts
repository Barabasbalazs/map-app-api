import { FastifyInstance } from "fastify";
import { Trail } from "../../models/trail-model";
import trailSchema from "./trails-schema.js";
import trailsController from "../../controllers/trails/trails-controller.js";
import { TrailQuery } from "src/@types/trail-query-type";

const {
  createTrailSchema,
  queryTrailsSchema,
  updateTrailSchema,
  trailIdSchema,
} = trailSchema;

const trailsRouter = async (fastify: FastifyInstance) => {
  //getting the trails for users
  fastify.route<{
    Querystring: TrailQuery;
    Reply: Trail[];
  }>({
    method: "GET",
    url: "/",
    onRequest: fastify.asyncVerifyJWT,
    schema: queryTrailsSchema,
    handler: trailsController.getTrails,
  }),
    // creating trails only for guides and admins
    fastify.route<{
      Body: Trail;
      Reply: Trail;
    }>({
      method: "POST",
      url: "/",
      onRequest: fastify.asyncVerifyJWT,
      schema: createTrailSchema,
      handler: trailsController.createTrail,
    });
  //Updating the trail by id, for creators of the trail
  fastify.route<{
    Params: { id: string };
    Body: Partial<Trail>;
    Reply: Trail;
  }>({
    method: "PATCH",
    url: "/:id",
    onRequest: fastify.asyncVerifyJWT,
    schema: updateTrailSchema,
    handler: trailsController.updateTrail,
  });
  //Deleting the trail by id, for creators of the trail
  fastify.route<{
    Params: { id: string };
    Reply: { message: string };
  }>({
    method: "DELETE",
    url: "/:id",
    onRequest: fastify.asyncVerifyJWT,
    schema: trailIdSchema,
    handler: trailsController.deleteTrail,
  });
  //subscribing to a trail for users
  fastify.route<{
    Params: { id: string };
    Reply: Trail;
  }>({
    method: "PATCH",
    url: "/:id/subscribe",
    onRequest: fastify.asyncVerifyJWT,
    schema: trailIdSchema,
    handler: trailsController.subscribeToTrail,
  });
  //unsubscribing from a trail for users
  fastify.route<{
    Params: { id: string };
    Reply: Trail;
  }>({
    method: "DELETE",
    url: "/:id/unsubscribe",
    onRequest: fastify.asyncVerifyJWT,
    schema: trailIdSchema,
    handler: trailsController.unsubscribeFromTrail,
  });
  fastify.route<{
    Reply: Trail[];
  }>({
    method: "GET",
    url: "/subscribed",
    onRequest: fastify.asyncVerifyJWT,
    handler: trailsController.getSubscribedTrails,
  })
};

export default trailsRouter;
