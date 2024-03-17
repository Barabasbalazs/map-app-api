import mongoose, { Document, Schema } from "mongoose";
import { trailSchemaTransformer } from "../utils/mongo-schema-transformers.js";
import { User } from "./user-model.js";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Trail extends Document {
  name: string;
  location?: string;
  creator: { type: Schema.Types.ObjectId; ref: "users" } | User;
  path: [
    {
      coordinates: Coordinates;
      name: string;
    }
  ];
  users: [{ type: Schema.Types.ObjectId; ref: "users" }];
}

const trailSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "users", required: true },
    path: [
      {
        coordinates: { type: { lat: Number, lng: Number }, required: true },
        name: { type: String, required: true },
      },
    ],
    users: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) =>
        trailSchemaTransformer(doc, ret, options),
    },
  }
);

export default mongoose.model<Trail>("trails", trailSchema);
