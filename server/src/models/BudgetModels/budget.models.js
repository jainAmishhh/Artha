// Artha\server\src\models\BudgetModels

import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Education",
        "Emergency",
        "Housing",
        "Shopping",
        "Food",
        "Transport",
        "Health",
        "Entertainment",
        "Subscriptions",
        "Utilities",
        "Savings",
        "Investments",
        "Gifts",
        "Travel",
        "Personal Care",
        "Bills",
        "Groceries",
        "Pets",
        "Insurance",
        "Family",
        "Debt",
        "Miscellaneous",
      ],
      default: "Education",
      required: true,
      trim: true,
    },

    budgetName: {
      type: String,
      required: true,
      trim: true,
    },

    budgetAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    spentAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    remaining: {
      type: Number,
      default: () => {
        return this.budgetAmount - this.spentAmount;
      },
    },

    percentageSpent: {
      type: Number,
      default: () => {
        if (this.budgetAmount === 0) {
          return 0;
        }
        return Math.min(
          Math.round((this.spentAmount / this.budgetAmount) * 100),
          100
        );
      },
    },

    colorTheme: {
      type: String,
      enum: [
        "emerald",
        "blue",
        "purple",
        "rose",
        "amber",
        "cyan",
        "teal",
        "indigo",
        "lime",
        "orange",
        "red",
        "violet",
      ],
      default: "emerald",
    },

    icon: {
      type: String,
      enum: [
        "BookOpen",
        "AlertTriangle",
        "Home",
        "ShoppingCart",
        "Utensils",
        "Car",
        "Heart",
        "Film",
        "CreditCard",
        "Wallet",
        "PiggyBank",
        "ChartBar",
        "Gift",
        "Plane",
        "Bath",
        "ShoppingBag",
        "ShieldCheck",
        "Users",
        "TrendingUp",
        "AlertCircle",
      ],
      default: "BookOpen",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
