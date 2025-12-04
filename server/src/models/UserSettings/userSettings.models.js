import mongoose, { Schema } from "mongoose";

const userSettingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    profile: {
      avatar: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
    },

    notifications: {
      transactions: { type: Boolean, default: true },
      budgetAlerts: { type: Boolean, default: true },
      dailyDigest: { type: Boolean, default: false },
      marketing: { type: Boolean, default: false },
    },

    appearance: {
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "light",
      },
      language: {
        type: String,
        enum: ["en", "hi", "mr", "bn", "ta"],
        default: "en",
      },
      currency: {
        type: String,
        enum: ["INR", "USD", "EUR"],
        default: "INR",
      },
    },

    security: {
      twoFactorAuth: { type: Boolean, default: false },
      lastPasswordChange: { type: Date, default: null },
      loginHistory: [
        {
          ip: String,
          device: String,
          location: String,
          loginAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserSettings", userSettingsSchema);


// import mongoose, { Schema } from "mongoose";

// const userSettingsSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//       index: true,
//     },

//     // -------- PROFILE SETTINGS --------
//     profile: {
//       avatar: { type: String, default: "" },          // URL or base64
//       location: { type: String, default: "" },
//       phone: { type: String, default: "" },
//     },

//     // -------- NOTIFICATION SETTINGS --------
//     notifications: {
//       transactions: { type: Boolean, default: true },
//       budgetAlerts: { type: Boolean, default: true },
//       dailyDigest: { type: Boolean, default: false },
//       marketing: { type: Boolean, default: false },
//     },

//     // -------- APPEARANCE SETTINGS --------
//     appearance: {
//       theme: {
//         type: String,
//         enum: ["light", "dark", "auto"],
//         default: "light",
//       },
//       language: {
//         type: String,
//         enum: [
//           "en",
//           "hi",
//           "mr",
//           "bn",
//           "ta",
//         ],
//         default: "en",
//       },
//       currency: {
//         type: String,
//         enum: ["INR", "USD", "EUR"],
//         default: "INR",
//       },
//     },

//     // -------- SECURITY SETTINGS --------
//     security: {
//       twoFactorAuth: { type: Boolean, default: false },
//       lastPasswordChange: { type: Date, default: null },
//       loginHistory: [
//         {
//           device: String,
//           ip: String,
//           location: String,
//           loginAt: { type: Date, default: Date.now },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UserSettings", userSettingsSchema);


// import mongoose, { Schema } from "mongoose";

// const userSettingsSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },

//     // Appearance Preferences
//     appearance: {
//       theme: {
//         type: String,
//         enum: ["light", "dark", "auto"],
//         default: "auto",
//       },
//       fontSize: {
//         type: String,
//         enum: ["small", "medium", "large"],
//         default: "medium",
//       }
//     },

//     // Notification Preferences
//     notifications: {
//       transactions: { type: Boolean, default: true },
//       budgetAlerts: { type: Boolean, default: true },
//       dailyDigest: { type: Boolean, default: false },
//       marketing: { type: Boolean, default: false },
//       loginAlerts: { type: Boolean, default: true },
//     },

//     // Security Settings
//     security: {
//       twoFactorAuth: { type: Boolean, default: false },
//       deviceVerification: { type: Boolean, default: true },
//       privacyMode: { type: Boolean, default: false },
//     },

//     // Privacy Settings
//     privacy: {
//       showExpenses: { type: Boolean, default: true },
//       showBudgets: { type: Boolean, default: true },
//       showProfilePicture: { type: Boolean, default: true },
//     },

//     // App Preferences
//     preferences: {
//       language: {
//         type: String,
//         default: "en",
//       },
//       currency: {
//         type: String,
//         enum: ["INR", "USD", "EUR"],
//         default: "INR",
//       },
//       defaultView: {
//         type: String,
//         enum: ["week", "month", "year"],
//         default: "month",
//       },
//       budgetCycle: {
//         type: String,
//         enum: ["weekly", "monthly", "yearly"],
//         default: "monthly",
//       },
//     },

//     // Sync Settings
//     sync: {
//       autoSync: { type: Boolean, default: true },
//       bankSyncEnabled: { type: Boolean, default: false },
//     },

//     // AI Insights
//     ai: {
//       insightsEnabled: { type: Boolean, default: true },
//       personalizedTips: { type: Boolean, default: true }
//     }

//   },
//   { timestamps: true }
// );

// export default mongoose.model("UserSettings", userSettingsSchema);
