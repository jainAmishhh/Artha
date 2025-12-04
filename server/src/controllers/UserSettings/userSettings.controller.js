// // after successful login
// await UserSettings.updateOne(
//   { userId: user._id },
//   { $push: { "security.loginHistory": { ip: req.ip, device: req.get('User-Agent'), location: '', loginAt: new Date() } } },
//   { upsert: true }
// );
// user.lastLoginAt = new Date();
// await user.save();


export const getUserSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.userSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const { avatar, phone, location } = req.body;

    if (avatar !== undefined) req.userSettings.profile.avatar = avatar;
    if (phone !== undefined) req.userSettings.profile.phone = phone;
    if (location !== undefined) req.userSettings.profile.location = location;

    await req.userSettings.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: req.userSettings.profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const updateNotificationSettings = async (req, res) => {
  try {
    const updates = req.body;

    for (const key in updates) {
      if (req.userSettings.notifications.hasOwnProperty(key)) {
        req.userSettings.notifications[key] = updates[key];
      }
    }

    await req.userSettings.save();

    res.status(200).json({
      success: true,
      message: "Notifications updated",
      data: req.userSettings.notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
      error: error.message,
    });
  }
};

export const updateAppearanceSettings = async (req, res) => {
  try {
    const { theme, language, currency } = req.body;

    if (theme) req.userSettings.appearance.theme = theme;
    if (language) req.userSettings.appearance.language = language;
    if (currency) req.userSettings.appearance.currency = currency;

    await req.userSettings.save();

    res.status(200).json({
      success: true,
      message: "Appearance updated",
      data: req.userSettings.appearance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appearance",
      error: error.message,
    });
  }
};

export const updateSecuritySettings = async (req, res) => {
  try {
    const { twoFactorAuth } = req.body;

    if (twoFactorAuth !== undefined) {
      req.userSettings.security.twoFactorAuth = twoFactorAuth;
    }

    await req.userSettings.save();

    res.status(200).json({
      success: true,
      message: "Security updated",
      data: req.userSettings.security,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update security",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await req.user.deleteOne();
    await req.userSettings.deleteOne();

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};


// import UserSettings from "../../models/UserModels/userSettings.model.js";
// import User from "../../models/UserModels/user.models.js";

// // Ensure settings exist for user
// const ensureSettings = async (userId) => {
//   let settings = await UserSettings.findOne({ userId });
//   if (!settings) {
//     settings = await UserSettings.create({ userId });
//   }
//   return settings;
// };

// // ---------------- Get User Settings ----------------
// export const getUserSettings = async (req, res) => {
//   try {
//     const settings = await ensureSettings(req.user._id);

//     res.status(200).json({
//       success: true,
//       data: settings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user settings",
//       error: error.message,
//     });
//   }
// };

// // ---------------- Update Profile ----------------
// export const updateUserSettings = async (req, res) => {
//   try {
//     const settings = await ensureSettings(req.user._id);

//     const { avatar, phone, location } = req.body;

//     if (avatar !== undefined) settings.profile.avatar = avatar;
//     if (phone !== undefined) settings.profile.phone = phone;
//     if (location !== undefined) settings.profile.location = location;

//     await settings.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: settings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update profile settings",
//       error: error.message,
//     });
//   }
// };

// // ---------------- Update Notifications ----------------
// export const updateNotificationSettings = async (req, res) => {
//   try {
//     const settings = await ensureSettings(req.user._id);

//     const updates = req.body;

//     for (const key in updates) {
//       if (settings.notifications.hasOwnProperty(key)) {
//         settings.notifications[key] = updates[key];
//       }
//     }

//     await settings.save();

//     res.status(200).json({
//       success: true,
//       message: "Notification settings updated",
//       data: settings.notifications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update notifications",
//       error: error.message,
//     });
//   }
// };

// // ---------------- Update Appearance ----------------
// export const updateAppearanceSettings = async (req, res) => {
//   try {
//     const settings = await ensureSettings(req.user._id);

//     const { theme, language, currency } = req.body;

//     if (theme) settings.appearance.theme = theme;
//     if (language) settings.appearance.language = language;
//     if (currency) settings.appearance.currency = currency;

//     await settings.save();

//     res.status(200).json({
//       success: true,
//       message: "Appearance settings updated",
//       data: settings.appearance,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update appearance settings",
//       error: error.message,
//     });
//   }
// };

// // ---------------- Update Security ----------------
// export const updateSecuritySettings = async (req, res) => {
//   try {
//     const settings = await ensureSettings(req.user._id);

//     const { twoFactorAuth } = req.body;

//     if (twoFactorAuth !== undefined) settings.security.twoFactorAuth = twoFactorAuth;

//     await settings.save();

//     res.status(200).json({
//       success: true,
//       message: "Security settings updated",
//       data: settings.security,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update security settings",
//       error: error.message,
//     });
//   }
// };

// // ---------------- Delete Account ----------------
// export const deleteAccount = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user._id);
//     await UserSettings.deleteOne({ userId: req.user._id });

//     res.status(200).json({
//       success: true,
//       message: "Account deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete account",
//       error: error.message,
//     });
//   }
// };
