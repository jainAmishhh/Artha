import crypto from "crypto";
import { sendMail } from "../utils/emailer.js"; 
import User from "../models/authUser.models.js";

export const requestEmailChange = async (req, res) => {
  try {
    const userId = req.user._id;
    const { newEmail } = req.body;

    if (!newEmail)
      return res.status(400).json({ success: false, message: "Email required" });

    const exists = await User.findOne({ email: newEmail });
    if (exists)
      return res.status(400).json({ success: false, message: "Email already in use" });

    const user = await User.findById(userId);

    const token = crypto.randomBytes(20).toString("hex");
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    user.pendingEmail = newEmail;
    user.emailChangeToken = hashed;
    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email-change?token=${token}&id=${user._id}`;

    await sendMail({
      to: newEmail,
      subject: "Confirm your new email",
      html: `<p>Click to verify your new email:</p>
             <a href="${verifyUrl}">${verifyUrl}</a>`
    });

    return res.status(200).json({
      success: true,
      message: "Verification link sent to new email"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const confirmEmailChange = async (req, res) => {
  try {
    const { token, id } = req.query;

    if (!token || !id)
      return res.status(400).json({ success: false, message: "Invalid request" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      emailChangeToken: hashed,
      pendingEmail: { $ne: null }
    });

    if (!user)
      return res.status(400).json({ success: false, message: "Invalid token" });

    user.email = user.pendingEmail;
    user.pendingEmail = null;
    user.emailChangeToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email updated successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

