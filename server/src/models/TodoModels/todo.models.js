// Your React Todo object includes:

// title

// description

// priority

// role

// status

// dueDate

// dueTime

// createdAt

// completedAt

// icon (string name)

// color

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    role: {
      type: String,
      default: "Personal",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    dueDate: {
      type: String,
      required: true,
    },

    dueTime: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    icon: {
      type: String,
      default: "User",
    },

    color: {
      type: String,
      default: "#6B7280",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
