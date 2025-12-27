const User = require("../models/User");
const QueueToken = require("../models/QueueToken");

// 👤 USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Profile error" });
  }
};

// 📜 USER TOKEN HISTORY
exports.getUserTokens = async (req, res) => {
  try {
    const tokens = await QueueToken.find({ email: req.params.email })
      .sort({ createdAt: -1 });
    res.json(tokens);
  } catch {
    res.status(500).json({ message: "History error" });
  }
};
