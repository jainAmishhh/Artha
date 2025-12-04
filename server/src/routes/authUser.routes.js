import express from "express";

// Core Auth Controllers
import {
  emailLogin,
  emailSignup,
  sendOtp,
  verifyOtp,
  googleLogin,
} from "../controllers/authUser.controllers.js";

// Email Update Controllers
import {
  requestEmailChange,
  confirmEmailChange,
} from "../controllers/authEmail.controller.js";

// Phone Update Controllers
import {
  requestPhoneChangeOtp,
  verifyPhoneChangeOtp,
} from "../controllers/authPhone.controller.js";

// Password Reset Controllers
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/authPassword.controller.js";

// Rate Limiters
import { globalLimiter, authLimiter } from "../middlewares/rateLimiter.js";

// Auth Middleware (Protect routes)
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(globalLimiter);

  //  PUBLIC AUTH ROUTES
router.post("/login", authLimiter, emailLogin);
router.post("/signup", authLimiter, emailSignup);
router.post("/send-otp", authLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/google-login", authLimiter, googleLogin);

  //  PASSWORD RESET ROUTES (PUBLIC)
router.post("/password/reset/request", authLimiter, requestPasswordReset);
router.post("/password/reset/confirm", resetPassword);

  //  PROTECTED AUTH ROUTES (Requires token)
router.use(authMiddleware);

// Email Change 
router.post("/email/update/request", requestEmailChange);
router.get("/email/update/confirm", confirmEmailChange);

// Phone Number Change 
router.post("/phone/update/request-otp", requestPhoneChangeOtp);
router.post("/phone/update/verify-otp", verifyPhoneChangeOtp);

export default router;
