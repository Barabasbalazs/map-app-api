import { FastifyBaseLogger } from "fastify";
import ApiReply from "../@types/reply-types.js";
import { ERROR500 } from "../constants/status-codes.js";

export function sendServerError(
  logger: FastifyBaseLogger,
  reply: any,
  e: unknown
) {
  logger.error(e);
  reply.status(ERROR500.statusCode).send({ message: ERROR500.message });
}
