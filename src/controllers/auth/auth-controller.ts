import { FastifyRequest } from "fastify";
import authService from "../../services/auth/auth-service.js";
import { AuthenticatedUser, User } from "../../models/user-model.js";
import { ERROR401, ERROR403, ERROR500 } from "../../constants/status-codes.js";
import ApiReply from "../../@types/reply-types.js";
import { sendServerError } from "../../utils/controller-util.js";

const authController = {
  login: async (
    request: FastifyRequest<{ Body: User }>,
    reply: ApiReply<AuthenticatedUser>
  ) => {
    try {
      const user = request.body;
      const authenticatedUser = await authService.authenticateUser(user);
      if (!authenticatedUser) {
        reply.status(ERROR401.statusCode).send({
          message: "Invalid credentials",
        });
      } else {
        reply.status(200).send(authenticatedUser);
      }
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
  signup: async (
    request: FastifyRequest<{ Body: User }>,
    reply: ApiReply<AuthenticatedUser>
  ) => {
    try {
      const user = request.body;
      const foundUser = await authService.findByEmail(user.email);
      if (foundUser) {
        reply.status(ERROR403.statusCode).send({
          message: "Email already taken",
        });
      }
      const newAuthenticatedUser = await authService.signup(user);
      if (!newAuthenticatedUser) {
        reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
      } else {
        reply.status(201).send(newAuthenticatedUser);
      }
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
};

export default authController;
