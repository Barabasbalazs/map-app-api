import mongoose, { Document, Schema } from "mongoose";
import { setSchemaTransformer } from "../utils/mongo-schema-setter.js";

export interface User extends Document {
  email: string;
  name?: string;
  password?: string;
  role: "admin" | "user" | "guide";
  id?: string;
}

export interface AuthenticatedUser {
  user: Partial<User>;
  authToken: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "guide"], default: "user" },
});

export default mongoose.model<User>("users", setSchemaTransformer(userSchema));
