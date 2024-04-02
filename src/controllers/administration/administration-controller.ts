import { FastifyRequest } from "fastify";
import ApiReply from "src/@types/reply-types.js";
import { User } from "../../models/user-model.js";
import userService from "../../services/user/user-service.js";
import { sendServerError } from "../../utils/controller-util.js";

const administrationController = {
  getUser: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: ApiReply<User>
  ) => {
    try {
        const userFromRequest = request.user;
        if (userFromRequest.role === 'guide' || userFromRequest.role === "user" && userFromRequest._id.toString() !== request.params.id) {
            return reply
            .status(401)
            .send({ message: "You are not authorized to view this user" });
        }
        const user = await userService.findById(request.params.id);
        if (!user) {
            return reply
            .status(404)
            .send({ message: "No user found with that id" });
        }
        return reply.status(200).send(user);
    } catch (e) {
      sendServerError(request.log, reply, e);
    }
  },
};

export default administrationController;
