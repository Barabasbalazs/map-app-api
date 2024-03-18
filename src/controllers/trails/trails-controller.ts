import { FastifyRequest } from "fastify";
import { Trail } from "../../models/trail-model.js";
import { User } from "../../models/user-model.js";
import ApiReply from "src/@types/reply-types.js";
import { TrailQuery } from "../../@types/trail-query-type.js";
import {
  ERROR401,
  ERROR404,
  ERROR409,
  STANDARD,
} from "../../constants/status-codes.js";
import trailsService from "../../services/trails/trail-service.js";
import userService from "../../services/user/user-service.js";
import { sendServerError } from "../../utils/controller-util.js";
import { request } from "http";

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
      sendServerError(request.log, reply, e);
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
      sendServerError(request.log, reply, e);
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
      if ((persistedTrail.creator as User)._id.toString() !== user.id) {
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
      sendServerError(request.log, reply, e);
    }
  },
  subscribeToTrail: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<Trail>
  ) => {
    try {
      const user = request.user;
      if (user.role !== "user" || !user.id) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to subscribe to a trail",
        });
      }

      const persistedUser = await userService.findById(user.id);
      const persistedTrail = await trailsService.getTrailById(
        request.params.id
      );
      if (
        persistedUser?.trails.includes(persistedTrail?._id) ||
        persistedTrail?.users.includes(persistedUser?._id)
      ) {
        return reply.status(ERROR409.statusCode).send({
          message: "You are already subscribed to this trail",
        });
      }
      await userService.addTrailToUser(user.id, request.params.id);
      const updatedTrail = await trailsService.addUserToTrail(
        user.id,
        request.params.id
      );
      if (!updatedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      return reply.status(STANDARD.SUCCESS).send(updatedTrail);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  unsubscribeFromTrail: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<Trail>
  ) => {
    try {
      const user = request.user;
      if (user.role !== "user" || !user.id) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to unsubscribe from a trail",
        });
      }
      const persistedUser = await userService.findById(user.id);
      const persistedTrail = await trailsService.getTrailById(
        request.params.id
      );

      if (
        !persistedUser?.trails.includes(persistedTrail?._id) ||
        !persistedTrail?.users.includes(persistedUser?._id)
      ) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not subscribed to this trail",
        });
      }
      await userService.deleteTrailFromUsers(request.params.id);
      const updatedTrail = await trailsService.deleteUserFromTrail(
        request.params.id,
        user.id
      );

      if (!updatedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      return reply.status(STANDARD.SUCCESS).send(updatedTrail);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  deleteTrail: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<{ message: string }>
  ) => {
    try {
      const user = request.user;
      const persistedTrail = await trailsService.getTrailById(
        request.params.id
      );
      if (!persistedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      if ((persistedTrail.creator as User)._id.toString() !== user.id) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to delete this trail",
        });
      }
      const deletedTrail = await trailsService.deleteTrail(request.params.id);
      if (!deletedTrail) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      await userService.deleteTrailFromUsers(request.params.id);
      return reply.status(STANDARD.SUCCESS).send({ message: "Trail deleted" });
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  getSubscribedTrails: async(
    request: FastifyRequest,
    reply: ApiReply<Trail[]>
  ) => {
    try {
      const user = request.user;
      if (user.role !== "user" || !user.id) {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to get subscribed trails",
        });
      }
      const trails = await userService.getSubscribedTrails(user.id);
      if (!trails) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: ERROR404.message });
      }
      return reply.status(STANDARD.SUCCESS).send(trails);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  }
};

export default trailsController;
