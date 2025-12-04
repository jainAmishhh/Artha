import User from "../models/authUser.models.js";
import OtpStore from "../models/otp.models.js";
import bcrypt from "bcrypt";
import axios from "axios";

export const requestPhoneChangeOtp = async (req, res) => {
  try {
    const { newPhone } = req.body;
    const userId = req.user._id;

    if (!/^\d{10}$/.test(newPhone))
      return res.status(400).json({ success: false, message: "Invalid phone number" });

    const alreadyExists = await User.findOne({ phonenumber: newPhone });
    if (alreadyExists)
      return res.status(400).json({ success: false, message: "Phone already in use" });

    const user = await User.findById(userId);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.pendingPhone = newPhone;
    user.phoneChangeOtp = hashedOtp;
    await user.save();

    // Send SMS via Fast2SMS
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP to update phone is ${otp}`,
        language: "english",
        numbers: [newPhone],
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to new phone number"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const verifyPhoneChangeOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId).select("+phoneChangeOtp");

    if (!user.pendingPhone)
      return res.status(400).json({ success: false, message: "No pending phone update" });

    const isMatch = await bcrypt.compare(otp.toString(), user.phoneChangeOtp);

    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.phonenumber = user.pendingPhone;
    user.pendingPhone = null;
    user.phoneChangeOtp = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
