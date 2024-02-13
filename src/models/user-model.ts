import mongoose, { Document, Schema } from "mongoose";
import { setSchemaTransformer } from "../utils/mongo-schema-setter.js";

export interface User extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role: "ADMIN" | "USER";
  id?: string;
}

export interface AuthenticatedUser {
  user: Partial<User>;
  authToken: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

export default mongoose.model<User>("users", setSchemaTransformer(userSchema));
