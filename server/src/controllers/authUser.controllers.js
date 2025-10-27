import User from "../models/authUser.models.js";
import OtpStore from "../models/otp.models.js"; 
import axios from "axios";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please signup first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrecat password/credentials entered." });
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({ success: " true ", message: " Login successful ", token, email });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

export const emailSignup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      loginMethod: "default",
    });

    await newUser.save();

    const token = jsonwebtoken.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    if (
      !phonenumber ||
      phonenumber.length !== 10 ||
      !/^\d{10}$/.test(phonenumber)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    await OtpStore.create({
      phonenumber,
      otp: hashedOtp,
      createdAt: Date.now(),
    });

    const response = await axios.post(
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

    console.log("✅ Fast2SMS response:", response.data);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ OTP send error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.response?.data || error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phonenumber, otp, fullname } = req.body;

    const record = await OtpStore.findOne({ phonenumber }).sort({
      createdAt: -1,
    });

    if (!record) {
      return res
        .status(400)
        .json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() - record.createdAt > 5 * 60 * 1000) {
      await OtpStore.deleteMany({ phonenumber });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp.toString(), record.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await OtpStore.deleteMany({ phonenumber });

    let user = await User.findOne({ phonenumber });
    if (!user) {
      user = new User({
        fullname: fullname || "Anonymous User",
        phonenumber,
        loginMethod: "phone",
      });
      await user.save();
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while verifying OTP",
      error: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { fullname, email, googleId } = req.body;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ fullname, email, googleId, loginMethod: "google" });
      await user.save();
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } 
    );

    res.status(200).json({ message: "Google login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
