import { PipelineStage } from "mongoose";
import trailModel, { Trail } from "../../models/trail-model.js";
import { TrailQuery } from "../../@types/trail-query-type.js";
import { ObjectId } from "bson";

const trailsService = {
  createTrail: async function (trail: Trail): Promise<Trail | null> {
    const storedTrail = await trailModel.create(trail);
    if (!storedTrail) {
      return null;
    }
    return storedTrail;
  },
  getTrailById: async function (id: string): Promise<Trail | null> {
    const trail = await trailModel.findById(id);
    if (!trail) {
      return null;
    }
    return trail;
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
    if (!updatedTrail) {
      return null;
    }
    return updatedTrail;
  },
};

export default trailsService;
