import { PipelineStage } from "mongoose";
import trailModel, { Trail } from "../../models/trail-model.js";
import { TrailQuery } from "../../@types/trail-query-type.js";
import { ObjectId } from "bson";

async function populateTrailWithCreator(trail: Trail | null) {
  return trail ? await trail.populate("creator") : null;
}

const trailsService = {
  createTrail: async function (trail: Trail): Promise<Trail | null> {
    const storedTrail = await trailModel.create(trail);

    return await populateTrailWithCreator(storedTrail);
  },
  getTrailById: async function (id: string): Promise<Trail | null> {
    const trail = await trailModel.findById(id);

    return await populateTrailWithCreator(trail);
  },
  getTrails: async function (query: TrailQuery): Promise<Trail[] | null> {
    const { search, order, creator, sort } = query;

    const stages: PipelineStage[] = [];
    const orderNumber = order === "asc" ? 1 : -1;
    const match = {
      ...(creator && { creator: new ObjectId(creator) }),
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      }),
    };

    stages.push({ $match: match });

    if (sort && orderNumber) {
      stages.push({
        $sort: {
          [sort]: orderNumber,
        },
      });
    } else {
      stages.push({
        $sort: {
          priority: -1,
        },
      });
    }

    stages.push(
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
          "creator._id",
          "creator.__v",
          "users",
        ],
      }
    );

    return await trailModel.aggregate(stages);
  },
  updateTrail: async function (
    id: string,
    trail: Partial<Trail>
  ): Promise<Trail | null> {
    const updatedTrail = await trailModel.findOneAndUpdate(
      { _id: id },
      {
        $set: trail,
      },
      {
        new: true,
      }
    );

    return await populateTrailWithCreator(updatedTrail);
  },
  deleteTrail: async function (id: string): Promise<Trail | null> {
    return await trailModel.findByIdAndDelete(id).populate("creator");
  },
  deleteUserFromTrail: async function (
    trailId: string,
    userId: string
  ): Promise<Trail | null> {
    const deletedTrail = await trailModel.findOneAndUpdate(
      { _id: trailId },
      { $pull: { users: new ObjectId(userId) } },
      { new: true }
    );
    return await populateTrailWithCreator(deletedTrail);
  },
  addUserToTrail: async function (userId: string, trailId: string) {
    const updatedTrail = await trailModel.findOneAndUpdate(
      { _id: trailId },
      { $push: { users: new ObjectId(userId) } },
      { new: true }
    );

    return await populateTrailWithCreator(updatedTrail);
  },
};

export default trailsService;
