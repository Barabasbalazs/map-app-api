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
  getSubscribedTrails: async function (userId: string) {
    return await userModel.aggregate([
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "trails",
          localField: "trails",
          foreignField: "_id",
          as: "trails",
        },
      },
      {
        $unwind: "$trails",
      },
      {
        $replaceRoot: { newRoot: "$trails" },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $set: { "creator.id": { $arrayElemAt: ["$creator._id", 0] } } },
      {
        $unset: [
          "creator.password",
          "creator.trails",
          "users",
          "creator._id",
          "creator.__v",
        ],
      },
    ]);
  },
  updateUser: async function (userId: string, user: User) {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: user,
      },
      {
        new: true,
      }
    );
  },
};

export default userService;
