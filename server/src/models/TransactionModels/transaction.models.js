import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    types: {
      type: String,
      enum: ["Income", "Expense"],
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
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
      enum: [
        // Income Categories
        "Salary",
        "Freelance",
        "Business Income",
        "Investments Income",
        "Gifts Received",
        "Refunds",
        "Other Income",

        // Essential Expenses
        "Groceries",
        "Food & Dining",
        "Housing",
        "Rent",
        "Utilities",
        "Transportation",
        "Healthcare",
        "Insurance",
        "Education",
        "Emergency",

        // Lifestyle & Optional Expenses
        "Entertainment",
        "Shopping",
        "Travel",
        "Personal Care",
        "Fitness",
        "Subscriptions",
        "Pets",
        "Family & Kids",

        // Financial Responsibilities
        "Bills",
        "Loan EMI",
        "Credit Card Payment",
        "Savings",
        "Investments",
        "Charity",

        // Others
        "Miscellaneous",
      ],
      default: "Groceries",
    },

    icon: {
      type: String,
      enum: [
        // Income
        "Wallet", // Salary / Income
        "Banknote", // Freelance / Business Income
        "TrendingUp", // Investments Income
        "Gift", // Gifts Received
        "RefreshCcw", // Refunds

        // Essential Expenses
        "ShoppingBag", // Groceries
        "Utensils", // Food & Dining
        "Home", // Housing / Rent
        "Plug", // Utilities (electricity/water)
        "Car", // Transportation
        "HeartPulse", // Healthcare
        "ShieldCheck", // Insurance
        "GraduationCap", // Education
        "AlertTriangle", // Emergency

        // Lifestyle
        "Film", // Entertainment
        "ShoppingCart", // Shopping
        "Plane", // Travel
        "Sparkles", // Personal Care
        "Dumbbell", // Fitness
        "Dog", // Pets
        "Users", // Family & Kids

        // Financial Responsibilities
        "CreditCard", // Credit Card Payment
        "Receipt", // Bills
        "PiggyBank", // Savings
        "ChartBar", // Investments
        "Handshake", // Charity

        // Misc
        "CircleHelp", // Miscellaneous / Unknown
      ],
      default: "ShoppingBag",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
