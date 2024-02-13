import {
  FastifyReply,
  RawServerDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

type ApiReply<T extends RouteGenericInterface> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  T
>;

export default ApiReply