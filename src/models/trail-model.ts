import mongoose, { Document, Schema } from "mongoose";
import { baseTransformer } from "../utils/mongo-schema-transformers.js";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Trail extends Document {
  name: string;
  location?: string;
  creator: { type: Schema.Types.ObjectId; ref: "User" };
  path: [
    {
      coordinates: Coordinates;
      name: string;
    }
  ];
  users: [{ type: Schema.Types.ObjectId; ref: "User" }];
}

const trailSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    path: [
      {
        coordinates: { type: { lat: Number, lng: Number }, required: true },
        name: { type: String, required: true },
      },
    ],
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) => baseTransformer(doc, ret, options),
    },
  }
);

export default mongoose.model<Trail>("trails", trailSchema);
