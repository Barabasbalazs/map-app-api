import mongoose, { Document, Schema } from "mongoose";
import { userSchemaTransformer } from "../utils/mongo-schema-transformers.js";

export interface User extends Document {
  email: string;
  name?: string;
  password?: string;
  role: "admin" | "user" | "guide";
  id?: string;
  trails: [{ type: Schema.Types.ObjectId; ref: "trails" }];
}

export interface AuthenticatedUser {
  user: Partial<User>;
  authToken: string;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "guide"], default: "user" },
    trails: [{ type: Schema.Types.ObjectId, ref: "trails" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) =>
        userSchemaTransformer(doc, ret, options),
    },
  }
);

export default mongoose.model<User>("users", userSchema);
