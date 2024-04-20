import mongoose, { Document, Schema } from "mongoose";
import { baseTransformer } from "../utils/mongo-schema-transformers.js";
import { User } from "./user-model.js";


export interface AdminRequest extends Document {
  user: User;//{ type: Schema.Types.ObjectId; ref: "users" };
}

const adminRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) => baseTransformer(doc, ret, options),
    },
  }
);

export default mongoose.model<AdminRequest>(
  "admin-requests",
  adminRequestSchema
);
