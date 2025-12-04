import UserSettings from "../models/UserModels/userSettings.model.js";

export const ensureUserSettings = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let settings = await UserSettings.findOne({ userId });

    if (!settings) {
      settings = await UserSettings.create({ userId });
    }

    req.userSettings = settings; // Attach for use in controllers
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to initialize user settings",
      error: error.message,
    });
  }
};


// import UserSettings from "../models/UserModels/userSettings.model.js";

// export const ensureUserSettings = async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     // Check if settings exist
//     let settings = await UserSettings.findOne({ userId });

//     // Create default settings if not found
//     if (!settings) {
//       settings = await UserSettings.create({ userId });
//     }

//     // Attach to request for faster controller access
//     req.userSettings = settings;

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to initialize user settings",
//       error: error.message,
//     });
//   }
// };
