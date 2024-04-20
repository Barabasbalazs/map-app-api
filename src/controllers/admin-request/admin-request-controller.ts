import { FastifyRequest } from "fastify";
import ApiReply from "../../@types/reply-types.js";
import { AdminRequest } from "../../models/admin-request-model.js";
import adminRequestService from "../../services/admin-request/admin-request-service.js";
import userService from "../../services/user/user-service.js";
import {
  ERROR401,
  ERROR404,
  ERROR500,
  STANDARD,
} from "../../constants/status-codes.js";
import { sendServerError } from "../../utils/controller-util.js";

const adminRequestController = {
  getAdminRequests: async (
    request: FastifyRequest,
    reply: ApiReply<AdminRequest[]>
  ) => {
    try {
      const requestUser = request.user;
      if (requestUser.role !== "admin") {
        return reply
          .status(ERROR401.statusCode)
          .send({ message: "You are not authorized to view admin requests" });
      }
      const adminRequests = await adminRequestService.getAdminRequests();
      return reply.status(STANDARD.SUCCESS).send(adminRequests);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },

  respondToAdminRequest: async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: {
        accepted: boolean;
      };
    }>,
    reply: ApiReply<{ accepted: boolean }>
  ) => {
    try {
      const requestUser = request.user;
      if (requestUser.role !== "admin") {
        return reply.status(ERROR401.statusCode).send({
          message: "You are not authorized to respond to admin requests",
        });
      }

      const requestId = request.params.id;
      const accepted = request.body.accepted;

      const adminRequest = await adminRequestService.getAdminRequestById(
        requestId
      );
      if (!adminRequest) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: "Admin request not found" });
      }

      const user = adminRequest.user;
      if (!user.id) {
        return reply
          .status(ERROR404.statusCode)
          .send({ message: "User not found" });
      }
      if (accepted) {
        user.role = "admin";
        const id = user._id;

        const res = await userService.updateUser(id, { role: user.role });
        if (!res) {
          return reply
            .status(ERROR500.statusCode)
            .send({ message: "Failed to update user" });
        }
      }

      await adminRequestService.deleteAdminRequest(requestId);
      return reply.status(STANDARD.SUCCESS).send({ accepted });
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
};

export default adminRequestController;
