import mongoose, { Schema } from "mongoose";

const bankAccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Savings", "Current", "Salary", "NRE", "Other"],
      required: true,
    },

    balance: {
      type: Number,
      required: true,
      min: 0,
    },

    colorTheme: {
      type: String,
      enum: [
        "blue",
        "emerald",
        "amber",
        "rose",
        "purple",
        "indigo",
        "cyan"
      ],
      default: "blue",
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },

    linkedVia: {
      type: String,
      enum: ["manual", "bank-sync", "upi-link"],
      default: "manual",
    }
  },
  { timestamps: true }
);

export default mongoose.model("BankAccount", bankAccountSchema);
