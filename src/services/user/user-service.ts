import userModel, { User } from "../../models/user-model.js";
import { ObjectId } from "bson";

const userService = {
  findById: async function (id: string): Promise<User | null> {
    return await userModel.findById(id);
  },
  deleteTrailFromUsers: async function (trailId: string) {
    return await userModel.updateMany(
      {},
      {
        $pull: { trails: new ObjectId(trailId) },
      }
    );
  },
  addTrailToUser: async function (userId: string, trailId: string) {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { trails: new ObjectId(trailId) } },
      { new: true }
    );
  },
};

export default userService;
