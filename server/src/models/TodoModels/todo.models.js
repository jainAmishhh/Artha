import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: ["Personal", "Work", "Development", "Learning", "Health"],
      default: "Personal",
      required: true,
    },
    dueDate: {
      type: Date,
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
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    completedAt: {
      type: Date,
      default: null,
    },
    icon: {
      type: String,
      enum: [
        "User",
        "BookOpen",
        "AlertTriangle",
        "Home",
        "ShoppingCart",
        "Utensils",
        "Car",
        "Heart",
      ],
      default: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TODO", todoSchema);