import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      default: "Anonymous User"
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true, 
      sparse: true, 
    },

    password: {
      type: String,
    },

    phonenumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    loginMethod: {
      type: String,
      enum: ["default", "phone", "google"],
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
