const express = require("express");
const {
  getUserProfile,
  getUserTokens
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/tokens/:email", getUserTokens);

module.exports = router;
