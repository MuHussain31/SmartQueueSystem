const nodemailer = require("nodemailer");

// ✅ transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 🔔 NEXT TURN ALERT EMAIL
const sendTurnAlert = async (to, name, tokenID) => {
  try {
    await transporter.sendMail({
      from: `"Smart Queue" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Turn is Near!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your token <b>${tokenID}</b> will be called soon.</p>
        <p>Please get ready and reach the counter.</p>
        <br/>
        <p>– Smart Queue Management System</p>
      `
    });

    console.log(`Turn alert sent to ${to}`);
  } catch (err) {
    console.error("Turn alert email error:", err);
  }
};

// ✅ BOOKING CONFIRMATION EMAIL
const sendBookingEmail = async (
  to,
  name,
  tokenID,
  department,
  date,
  waitTime
) => {
  try {
    await transporter.sendMail({
      from: `"Smart Queue" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Token Booked Successfully ✅",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your slot has been successfully booked.</p>

        <p><b>Token ID:</b> ${tokenID}</p>
        <p><b>Department:</b> ${department}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Estimated Waiting Time:</b> ${waitTime} minutes</p>

        <br/>
        <p>You can track your token live from your dashboard.</p>
        <p>– Smart Queue Management System</p>
      `
    });

    console.log(`Booking confirmation sent to ${to}`);
  } catch (err) {
    console.error("Booking email error:", err);
  }
};

module.exports = {
  sendTurnAlert,
  sendBookingEmail
};
