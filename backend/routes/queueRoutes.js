const express = require("express");
const {
  bookToken,
  getQueueList,
  updateTokenStatus,
  getUserHistory,
  trackToken          // ✅ ADD THIS
} = require("../controllers/queueController");

const router = express.Router();

// User
router.post("/book", bookToken);
router.get("/history/:email", getUserHistory);
router.get("/track/:tokenID", trackToken);   // ✅ ADD THIS

// Admin
router.get("/list", getQueueList);
router.put("/update/:tokenID", updateTokenStatus);

module.exports = router;
