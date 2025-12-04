import User from "../models/authUser.models.js";
import OtpStore from "../models/otp.models.js";
import UserSettings from "../models/UserSettings/userSettings.models.js";

import axios from "axios";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

//  Helper: Auto-create User Settings
const ensureDefaultSettings = async (userId) => {
  const exists = await UserSettings.findOne({ userId });
  if (!exists) {
    await UserSettings.create({ userId });
  }
};

//  Helper: Sign JWT
const signToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

//  EMAIL LOGIN
export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email & password are required",
      });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found. Please signup first.",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });

    const token = signToken(user._id);

    await ensureDefaultSettings(user._id);

    user.lastLoginAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// EMAIL SIGNUP
export const emailSignup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      loginMethod: "default",
    });

    const token = signToken(newUser._id);
    await ensureDefaultSettings(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during signup",
      error: err.message,
    });
  }
};

//  SEND OTP (Phone Login)
export const sendOtp = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    if (!phonenumber || !/^\d{10}$/.test(phonenumber))
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OtpStore.create({
      phonenumber,
      otp: hashedOtp,
      createdAt: Date.now(),
    });

    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP is ${otp}`,
        language: "english",
        numbers: [phonenumber],
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.response?.data || error.message,
    });
  }
};

//  VERIFY OTP (Phone Login)
export const verifyOtp = async (req, res) => {
  try {
    const { phonenumber, otp, fullname } = req.body;

    if (!phonenumber || !otp)
      return res.status(400).json({
        success: false,
        message: "Phone number & OTP are required",
      });

    const record = await OtpStore.findOne({ phonenumber }).sort({
      createdAt: -1,
    });

    if (!record)
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });

    if (Date.now() - record.createdAt > 5 * 60 * 1000) {
      await OtpStore.deleteMany({ phonenumber });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isMatch = await bcrypt.compare(otp.toString(), record.otp);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    await OtpStore.deleteMany({ phonenumber });

    let user = await User.findOne({ phonenumber });

    if (!user) {
      user = await User.create({
        fullname: fullname || "Anonymous User",
        phonenumber,
        loginMethod: "phone",
      });
    }

    const token = signToken(user._id);
    await ensureDefaultSettings(user._id);

    user.lastLoginAt = new Date();
    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
      error: error.message,
    });
  }
};

//  GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  try {
    const { fullname, email, googleId } = req.body;

    if (!googleId)
      return res.status(400).json({
        success: false,
        message: "Google ID is required",
      });

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        fullname,
        email,
        googleId,
        loginMethod: "google",
      });
    }

    const token = signToken(user._id);
    await ensureDefaultSettings(user._id);

    user.lastLoginAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during Google login",
      error: error.message,
    });
  }
};



// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link has been sent."
      });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    await sendMail({
      to: email,
      subject: "Reset your password",
      html: `<p>Click to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>`
    });

    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link has been sent."
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, id } = req.query;
    const { password, confirmPassword } = req.body;

    if (!password || password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be 6+ chars" });

    if (password !== confirmPassword)
      return res.status(400).json({ success: false, message: "Passwords do not match" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


// // import crypto from "crypto";
// // import { sendMail } from "../utils/emailer.js";
// // import UserSettings from "../models/UserModels/userSettings.model.js"; // used for loginHistory updates

// // // helper - create and save token (hashed)
// // const createTokenPair = (len = 32) => crypto.randomBytes(len).toString("hex");

// // // ---------------- Request Password Reset ----------------
// // export const requestPasswordReset = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     if (!email) return res.status(400).json({ success: false, message: "Email required" });

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });

// //     const resetToken = createTokenPair(20);
// //     const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");
// //     user.resetPasswordToken = hashed;
// //     user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
// //     await user.save();

// //     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;
// //     const html = `<p>Click to reset password: <a href="${resetUrl}">${resetUrl}</a></p>`;
// //     await sendMail({ to: email, subject: "Password reset", html });

// //     return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });
// //   } catch (err) {
// //     console.error("requestPasswordReset", err);
// //     res.status(500).json({ success: false, message: "Server error", error: err.message });
// //   }
// // };

// // // ---------------- Reset Password ----------------
// // export const resetPassword = async (req, res) => {
// //   try {
// //     const { token, id } = req.query;
// //     const { password, confirmPassword } = req.body;

// //     if (!token || !id) return res.status(400).json({ success: false, message: "Invalid token" });
// //     if (!password || password.length < 6) return res.status(400).json({ success: false, message: "Password must be 6+ chars" });
// //     if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });

// //     const hashed = crypto.createHash("sha256").update(token).digest("hex");
// //     const user = await User.findOne({
// //       _id: id,
// //       resetPasswordToken: hashed,
// //       resetPasswordExpires: { $gt: Date.now() },
// //     });
// //     if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

// //     user.password = await bcrypt.hash(password, 10);
// //     user.resetPasswordToken = null;
// //     user.resetPasswordExpires = null;
// //     await user.save();

// //     // optional: invalidate sessions / refresh tokens if used

// //     return res.status(200).json({ success: true, message: "Password reset successful" });
// //   } catch (err) {
// //     console.error("resetPassword", err);
// //     res.status(500).json({ success: false, message: "Server error", error: err.message });
// //   }
// // };

// // // ---------------- Send Email Verification ----------------
// // export const sendEmailVerification = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     if (!email) return res.status(400).json({ success: false, message: "Email required" });

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ success: false, message: "User not found" });

// //     const token = createTokenPair(20);
// //     const hashed = crypto.createHash("sha256").update(token).digest("hex");
// //     user.emailVerificationToken = hashed;
// //     await user.save();

// //     const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&id=${user._id}`;
// //     const html = `<p>Verify email by clicking <a href="${verifyUrl}">${verifyUrl}</a></p>`;
// //     await sendMail({ to: email, subject: "Verify your email", html });

// //     return res.status(200).json({ success: true, message: "Verification email sent" });
// //   } catch (err) {
// //     console.error("sendEmailVerification", err);
// //     res.status(500).json({ success: false, message: "Server error", error: err.message });
// //   }
// // };

// // // ---------------- Verify Email Token ----------------
// // export const verifyEmailToken = async (req, res) => {
// //   try {
// //     const { token, id } = req.query;
// //     if (!token || !id) return res.status(400).json({ success: false, message: "Invalid token" });

// //     const hashed = crypto.createHash("sha256").update(token).digest("hex");
// //     const user = await User.findOne({ _id: id, emailVerificationToken: hashed });
// //     if (!user) return res.status(400).json({ success: false, message: "Invalid token" });

// //     user.emailVerified = true;
// //     user.emailVerificationToken = null;
// //     await user.save();

// //     return res.status(200).json({ success: true, message: "Email verified" });
// //   } catch (err) {
// //     console.error("verifyEmailToken", err);
// //     res.status(500).json({ success: false, message: "Server error", error: err.message });
// //   }
// // };

// import User from "../models/authUser.models.js";
// import OtpStore from "../models/otp.models.js";
// import axios from "axios";
// import bcrypt from "bcrypt";
// import jsonwebtoken from "jsonwebtoken";

// export const emailLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found. Please signup first." });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res
//         .status(400)
//         .json({ message: "Incorrecat password/credentials entered." });
//     }

//     const token = jsonwebtoken.sign(
//       { id: user._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res
//       .status(200)
//       .json({ success: " true ", message: " Login successful ", token, email });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//       error: error.message,
//     });
//   }
// };

// export const emailSignup = async (req, res) => {
//   try {
//     const { fullname, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters long" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//       loginMethod: "default",
//     });

//     await newUser.save();

//     const token = jsonwebtoken.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res
//       .status(201)
//       .json({ message: "User registered successfully", token, user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// export const sendOtp = async (req, res) => {
//   try {
//     const { phonenumber } = req.body;

//     if (
//       !phonenumber ||
//       phonenumber.length !== 10 ||
//       !/^\d{10}$/.test(phonenumber)
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid phone number" });
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     const hashedOtp = await bcrypt.hash(otp, 10);

//     await OtpStore.create({
//       phonenumber,
//       otp: hashedOtp,
//       createdAt: Date.now(),
//     });

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "q",
//         message: `Your OTP is ${otp}`,
//         language: "english",
//         numbers: [phonenumber],
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Fast2SMS response:", response.data);

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("❌ OTP send error:", error.response?.data || error.message);
//     res.status(500).json({
//       message: "Failed to send OTP",
//       error: error.response?.data || error.message,
//     });
//   }
// };

// export const verifyOtp = async (req, res) => {
//   try {
//     const { phonenumber, otp, fullname } = req.body;

//     const record = await OtpStore.findOne({ phonenumber }).sort({
//       createdAt: -1,
//     });

//     if (!record) {
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP not found or expired" });
//     }

//     if (Date.now() - record.createdAt > 5 * 60 * 1000) {
//       await OtpStore.deleteMany({ phonenumber });
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     const isMatch = await bcrypt.compare(otp.toString(), record.otp);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     await OtpStore.deleteMany({ phonenumber });

//     let user = await User.findOne({ phonenumber });
//     if (!user) {
//       user = new User({
//         fullname: fullname || "Anonymous User",
//         phonenumber,
//         loginMethod: "phone",
//       });
//       await user.save();
//     }

//     const token = jsonwebtoken.sign(
//       { id: user._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     return res.json({
//       success: true,
//       message: "OTP verified successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Server error while verifying OTP",
//       error: error.message,
//     });
//   }
// };

// export const googleLogin = async (req, res) => {
//   try {
//     const { fullname, email, googleId } = req.body;

//     let user = await User.findOne({ googleId });
//     if (!user) {
//       user = new User({ fullname, email, googleId, loginMethod: "google" });
//       await user.save();
//     }

//     const token = jsonwebtoken.sign(
//       { id: user._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({ message: "Google login successful", token, user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
