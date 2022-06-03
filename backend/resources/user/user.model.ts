import mongoose from "mongoose";

export interface User {
  email: string;
  id: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false, minlength: 8 },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = mongoose.model("user", userSchema);