import { FastifyReply} from "fastify";
import { User } from "../models/user-model.js";
import mongoose from "mongoose";


declare module "fastify" {
  interface FastifyInstance {
    asyncVerifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    db: typeof mongoose;
  }
  interface FastifyRequest {
    user: User;
  }
}
