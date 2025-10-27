import express from "express";
import {
    emailLogin,
  emailSignup,
  sendOtp,
  verifyOtp,
  googleLogin,
} from "../controllers/authUser.controllers.js";

const router = express.Router();

router.post("/login", emailLogin);
router.post("/signup", emailSignup);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/google-login", googleLogin);

export default router;


// import express from "express";
// import axios from "axios";

// const router = express.Router();

// // send OTP
// router.post("/send-otp", async (req, res) => {
//   try {
//     const { number } = req.body;

//     if (!number || !/^\d{10}$/.test(number)) {
//       return res.status(400).json({ success: false, message: "Invalid number" });
//     }

//     // Generate random 4-digit OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);

//     // 👉 Save OTP temporarily (use DB like Redis/Mongo in real projects)
//     global.otpStore = { number, otp };

//     // ✅ FAST2SMS integration (uncomment if you have API key)
//     /*
//     await axios.post("https://www.fast2sms.com/dev/bulkV2", {
//       route: "otp",
//       message: `Your OTP is ${otp}`,
//       numbers: [number]
//     }, {
//       headers: {
//         authorization: process.env.FAST2SMS_API_KEY
//       }
//     });
//     */

//     console.log("OTP sent:", otp);

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("Send OTP error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // verify OTP
// router.post("/verify-otp", (req, res) => {
//   try {
//     const { number, otp } = req.body;

//     if (
//       global.otpStore &&
//       global.otpStore.number === number &&
//       String(global.otpStore.otp) === String(otp)
//     ) {
//       return res.json({ success: true, message: "OTP verified" });
//     }

//     res.status(400).json({ success: false, message: "Invalid OTP" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;


// // import express from 'express';
// // import { emailSignup, sendOtp, verifyOTP, googleLogin } from '../controllers/authUser.controllers.js';

// // const router = express.Router();

// // router.post("/signup/email", emailSignup);
// // router.post("/login/phone/send-otp", sendOtp);
// // router.post("/login/phone/verify-otp", verifyOTP);
// // router.post("/login/google", googleLogin);

// // export default router;