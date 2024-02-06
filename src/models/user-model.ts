import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role: "ADMIN" | "USER";
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

export default mongoose.model<User>("users", userSchema);
