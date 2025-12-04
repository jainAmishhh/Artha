import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      default: "Anonymous User",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },

    phonenumber: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^[0-9]{10}$/.test(value);
        },
        message: "Phone number must be 10 digits",
      },
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },

    password: {
      type: String,
      select: false,
    },

    googleId: {
      type: String,
    },

    loginMethod: {
      type: String,
      enum: ["default", "phone", "google"],
      required: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    pendingEmail: {
      type: String,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid pending email format",
      },
    },

    emailChangeToken: {
      type: String,
      default: null,
      select: false,
    },

    pendingPhone: {
      type: String,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^[0-9]{10}$/.test(value);
        },
        message: "Pending phone must be 10 digits",
      },
    },

    phoneChangeOtp: {
      type: String,
      default: null,
      select: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// --------------------
// INDEXES (Correct way)
// --------------------
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ phonenumber: 1 }, { unique: true, sparse: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
