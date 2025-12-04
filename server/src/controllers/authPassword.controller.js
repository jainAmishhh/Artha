import User from "../models/authUser.models.js";
import crypto from "crypto";
import { sendMail } from "../utils/emailer.js";

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link has been sent.",
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
             <a href="${resetUrl}">${resetUrl}</a>`,
    });

    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link has been sent.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, id } = req.query;
    const { password, confirmPassword } = req.body;

    // Validate token & id
    if (!token || !id) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset link. Missing token or user ID.",
      });
    }

    if (!password || password.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "Password must be 6+ chars" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
