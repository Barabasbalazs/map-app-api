import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fastifyAuth from "@fastify/auth";
import fp from "fastify-plugin";
import environmentVariables from "../config/env-variables.js";
import authService from "../services/auth/auth-service.js";
import { ERROR401 } from "../constants/status-codes.js";

async function authPlugin(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify
    .decorate(
      "asyncVerifyJWT",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
          if (!request.headers || !request.headers.authorization) {
            return reply
              .status(ERROR401.statusCode)
              .send({ message: ERROR401.message });
          }
          const bearerToken = request.headers.authorization.split(" ")[1];

          const secret = environmentVariables.getSecret();
          const user = await authService.getUserFromToken(bearerToken, secret);
          if (!user) {
            return reply
              .status(ERROR401.statusCode)
              .send({ message: ERROR401.message });
          }
          request.user = user;
        } catch (error) {
          return reply
            .status(ERROR401.statusCode)
            .send({ message: ERROR401.message });
        }
      }
    )
    .register(fastifyAuth);
}

export default fp(authPlugin);