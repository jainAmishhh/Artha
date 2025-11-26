import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    merchant: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    icon: {
      type: String,
      default: "ShoppingBag",
    },

    color: {
      type: String,
      default: "#6B7280",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
