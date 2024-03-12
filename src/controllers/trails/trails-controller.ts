import { FastifyRequest } from "fastify";
import { Trail } from "../../models/trail-model.js";
import ApiReply from "src/@types/reply-types.js";
import {
  ERROR401,
  ERROR404,
  ERROR500,
  STANDARD,
} from "../../constants/status-codes.js";
import trailsService from "../../services/trails/trail-service.js";
import { TrailQuery } from "../../@types/trail-query-type.js";

const trailsController = {
  createTrail: async (
    request: FastifyRequest<{ Body: Trail }>,
    reply: ApiReply<Trail>
  ) => {
    try {
      const user = request.user;
      if (user.role === "user") {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to create a trail",
        });
      }
      const trail = request.body;
      const newTrail = await trailsService.createTrail({
        ...trail,
        creator: user._id,
      } as Trail);

      if (!newTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      return reply.status(STANDARD.CREATED).send(newTrail);
    } catch (e) {
      request.log.error(e);
      reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
    }
  },
  getTrails: async (
    request: FastifyRequest<{
      Querystring: TrailQuery;
    }>,
    reply: ApiReply<Trail[]>
  ) => {
    try {
      const trails = await trailsService.getTrails(request.query);
      if (!trails) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      return reply.status(STANDARD.SUCCESS).send(trails);
    } catch (e) {
      request.log.error(e);
      reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
    }
  },
  updateTrail: async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Partial<Trail>;
    }>,
    reply: ApiReply<Trail>
  ) => {
    try {
      const user = request.user;
      const trail = request.body;
      const persistedTrail = await trailsService.getTrailById(
        request.params.id
      );
      if (!persistedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      request.log.info(
        `persistedTrail.creator ${persistedTrail.creator.toString()}`
      );
      request.log.info(`user.id ${user.id}`);
      if (persistedTrail.creator.toString() !== user.id) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to update this trail",
        });
      }
      if (trail.creator) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to change the creator of the trail",
        });
      }

      const updatedTrail = await trailsService.updateTrail(
        request.params.id,
        trail
      );
      if (!updatedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }

      return reply.status(STANDARD.SUCCESS).send(updatedTrail);
    } catch (e) {
      request.log.error(e);
      reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
    }
  },
};

export default trailsController;
