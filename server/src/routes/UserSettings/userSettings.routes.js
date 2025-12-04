import express from "express";
import authMiddleware from "../middleware/auth.js";
import { ensureUserSettings } from "../middleware/ensureSettings.js";
import {
  getUserSettings,
  updateUserSettings,
  updateNotificationSettings,
  updateAppearanceSettings,
  updateSecuritySettings,
  deleteAccount,
} from "../controllers/UserControllers/userSettings.controller.js";

const router = express.Router();

// All routes require login + settings auto-generation
router.use(authMiddleware, ensureUserSettings);

router.get("/", getUserSettings);
router.put("/profile", updateUserSettings);
router.put("/notifications", updateNotificationSettings);
router.put("/appearance", updateAppearanceSettings);
router.put("/security", updateSecuritySettings);
router.delete("/delete-account", deleteAccount);

export default router;


// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   getUserSettings,
//   updateUserSettings,
//   updateNotificationSettings,
//   updateAppearanceSettings,
//   updateSecuritySettings,
//   deleteAccount,
// } from "../controllers/userSettings.controller.js";
// import { ensureUserSettings } from "../middleware/ensureSettings.js";

// router.use(authMiddleware, ensureUserSettings);


// const router = express.Router();

// /**
//  * @route   GET /api/settings
//  * @desc    Get logged-in user settings
//  * @access  Private
//  */
// router.get("/", authMiddleware, getUserSettings);

// /**
//  * @route   PUT /api/settings/update
//  * @desc    Update general settings (name, email, phone, location, etc.)
//  * @access  Private
//  */
// router.put("/update", authMiddleware, updateUserSettings);

// /**
//  * @route   PUT /api/settings/notifications
//  * @desc    Update notification preferences
//  * @access  Private
//  */
// router.put("/notifications", authMiddleware, updateNotificationSettings);

// /**
//  * @route   PUT /api/settings/appearance
//  * @desc    Update theme, language, currency
//  * @access  Private
//  */
// router.put("/appearance", authMiddleware, updateAppearanceSettings);

// /**
//  * @route   PUT /api/settings/security
//  * @desc    Update security preferences (2FA toggle, password change)
//  * @access  Private
//  */
// router.put("/security", authMiddleware, updateSecuritySettings);

// /**
//  * @route   DELETE /api/settings/delete-account
//  * @desc    Permanently delete the user account
//  * @access  Private
//  */
// router.delete("/delete-account", authMiddleware, deleteAccount);

// export default router;
