const mongoose = require("mongoose");

const queueTokenSchema = new mongoose.Schema(
  {
    tokenID: { type: String, required: true, unique: true },
    tokenNumber: { type: Number, required: true },
    name: String,
    email: String,
    department: String,
    service: String,
    estimatedWaitTime: Number,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QueueToken", queueTokenSchema);
