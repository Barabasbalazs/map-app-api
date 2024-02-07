import { FastifyReply, FastifyRequest } from "fastify";

const authController = {
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: "hello on login",
    });
  },
  signup: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: "hello on signup",
    });
  },
};

export default authController;
