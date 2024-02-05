import { FastifyReply, FastifyRequest } from "fastify";
import statusCodes from "../helpers/status-codes.js";

const { ERROR400 } = statusCodes;

const authController = {
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: "hello",
    });
  },
  signup: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: "hello",
    });
  },
};

export default authController;
