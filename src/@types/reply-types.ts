import {
  FastifyReply,
  RawServerDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

interface TypedResponse<T> extends RouteGenericInterface {
  Reply:
    | T
    | {
        message: string;
      };
}

type ApiReply<T> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  TypedResponse<T>
>;

export default ApiReply;
