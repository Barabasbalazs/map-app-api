import { FastifyRequest } from "fastify";
import ApiReply from "../../@types/reply-types.js";
import { User } from "../../models/user-model.js";
import userService from "../../services/user/user-service.js";
import trailsService from "../../services/trails/trail-service.js";
import {
  ERROR401,
  ERROR404,
  ERROR500,
  STANDARD,
} from "../../constants/status-codes.js";
import { sendServerError } from "../../utils/controller-util.js";

const administrationController = {
  getUser: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<User>
  ) => {
    try {
      const userFromRequest = request.user;

      if (userFromRequest._id.toString() !== request.params.id) {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: ERROR401.message });
      }

      const user = await userService.findById(request.params.id);
      if (!user) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: "No user found with that id" });
      }
      return reply.status(STANDARD.SUCCESS).send(user);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  updateUser: async (
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
    reply: ApiReply<User>
  ) => {
    try {
      const id = request.params.id;
      const requestUser = request.user;
      const bodyUser = request.body;

      if (id !== requestUser._id.toString() && requestUser.role !== "admin") {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: "You are not authorized to update this user" });
      }
      if (requestUser.role !== "admin" && bodyUser.role) {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: "You are not authorized to update the role" });
      }
      const updatedUser = await userService.updateUser(id, bodyUser);
      if (!updatedUser) {
        return reply.status(ERROR500.statusCode).send({
          message: ERROR500.message,
        });
      }
      return reply.status(STANDARD.SUCCESS).send(updatedUser);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  getAllUsers: async (request: FastifyRequest, reply: ApiReply<User[]>) => {
    try {
      const user = request.user;
      if (user.role !== "admin") {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: "You are not authorized to view all users" });
      }
      const users = await userService.getAllUsers();
      return reply.status(STANDARD.SUCCESS).send(users);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  deleteUser: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<{ message: string }>
  ) => {
    try {
      const requestUser = request.user;
      if (
        requestUser._id.toString() !== request.params.id &&
        requestUser.role !== "admin"
      ) {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: ERROR401.message });
      }
      if (requestUser.role === "guide") {
        await trailsService.deleteTrailsByCreator(request.params.id);
      }
      const result = await userService.deleteUser(request.params.id);
      if (!result.deletedCount) {
        return reply
          .status(ERROR500.statusCode)
          .send({ message: ERROR500.message });
      }
      return reply.status(STANDARD.SUCCESS).send({ message: "User deleted" });
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
};

export default administrationController;
