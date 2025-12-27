const QueueToken = require("../models/QueueToken");
const {
  sendTurnAlert,
  sendBookingEmail
} = require("../utils/emailService");

// 🎫 BOOK TOKEN
exports.bookToken = async (req, res) => {
  try {
    let { name, email, dept: department, service, date } = req.body;

    email = email.toLowerCase().trim();

    const countAhead = await QueueToken.countDocuments({
      department,
      date,
      status: "Pending"
    });

    const tokenNumber = countAhead + 1;

    const tokenID = `${(department || "GEN")
      .substring(0, 3)
      .toUpperCase()}-${tokenNumber + 100}`;

    const estimatedWaitTime = countAhead * 10;

    const newToken = new QueueToken({
      tokenID,
      tokenNumber,
      name,
      email,
      department,
      service,
      date,
      estimatedWaitTime,
      status: "Pending"
    });

    await newToken.save();

    // ✅ BOOKING CONFIRMATION EMAIL
    await sendBookingEmail(
      email,
      name,
      tokenID,
      department,
      date,
      estimatedWaitTime
    );

    res.status(201).json({
      message: "Token booked successfully",
      token: newToken,
      peopleAhead: countAhead,
      waitTime: estimatedWaitTime
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📡 TRACK TOKEN
exports.trackToken = async (req, res) => {
  try {
    const { tokenID } = req.params;

    const token = await QueueToken.findOne({ tokenID });
    if (!token)
      return res.status(404).json({ message: "Token not found" });

    const peopleAhead = await QueueToken.countDocuments({
      department: token.department,
      date: token.date,
      status: "Pending",
      tokenNumber: { $lt: token.tokenNumber }
    });

    res.json({
      token,
      position: peopleAhead + 1,
      peopleAhead,
      waitTime: peopleAhead * 10
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📋 ADMIN QUEUE LIST
exports.getQueueList = async (req, res) => {
  try {
    const { department, date } = req.query;

    const filter = { status: { $in: ["Pending", "In Progress"] } };
    if (department) filter.department = department;
    if (date) filter.date = date;

    const queue = await QueueToken.find(filter).sort({ tokenNumber: 1 });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔄 UPDATE STATUS WITH EMAIL ALERT
exports.updateTokenStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const token = await QueueToken.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!token)
      return res.status(404).json({ message: "Token not found" });

    // ✅ Email notification for next token
    if (status === "In Progress") {
      const nextToken = await QueueToken.findOne({
        department: token.department,
        date: token.date,
        status: "Pending"
      }).sort({ tokenNumber: 1 });

      if (nextToken) {
        await sendTurnAlert(
          nextToken.email,
          nextToken.name,
          nextToken.tokenID
        );
      }
    }

    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 GET USER ACTIVE TOKEN
exports.getUserActiveToken = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    const activeToken = await QueueToken.findOne({
      email,
      status: { $in: ["Pending", "In Progress"] }
    }).sort({ createdAt: -1 });

    if (!activeToken)
      return res.json({ message: "No active booking" });

    res.json(activeToken);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📜 USER HISTORY
exports.getUserHistory = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    const history = await QueueToken.find({ email }).sort({
      createdAt: -1
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
