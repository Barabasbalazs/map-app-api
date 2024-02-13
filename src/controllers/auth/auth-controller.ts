import {
  FastifyReply,
  FastifyRequest,
  RawServerDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import authService from "../../services/auth/auth-service.js";
import { AuthenticatedUser, User } from "../../models/user-model.js";
import { ERROR403, ERROR500 } from "../../constants/status-codes.js";
import ApiReply from "src/@types/reply-types.js";

interface AuthUserResponse extends RouteGenericInterface {
  Reply:
 AuthenticatedUser
    | {
        message: string;
      };
}

const authController = {
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: "hello on login",
    });
  },
  signup: async (
    request: FastifyRequest<{ Body: User }>,
    reply: ApiReply<AuthUserResponse>
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
      reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
    }
  },
};

export default authController;
