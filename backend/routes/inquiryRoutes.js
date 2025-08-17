const express = require("express");
const Inquiry = require("../models/inquiryModel.js");
const nodemailer = require("nodemailer");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Public endpoint to create an inquiry
router.post("/", async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // Build email body dynamically
    let emailBody = `<h2>📩 New Inquiry Received</h2><br>`;
    emailBody += `<table border="1" cellspacing="0" cellpadding="6">`;
    for (const [key, value] of Object.entries(req.body)) {
      emailBody += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`;
    }
    emailBody += `</table>`;

    const mailOptions = {
      from: req.body.email || process.env.EMAIL_USER, // customer email if available
      to: process.env.ADMIN_EMAIL, // admin email
      subject: `New Inquiry from ${req.body.name || "Unknown User"}`,
      html: emailBody, // send formatted HTML
      replyTo: req.body.email, // reply goes to customer
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Inquiry submitted & email sent to admin" });
  } catch (error) {
    console.error("❌ Error handling inquiry:", error);
    res.status(500).json({ message: "Error submitting inquiry" });
  }
});

// Admin: list inquiries
router.get("/", protect, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error("❌ Error fetching inquiries:", error);
    res.status(500).json({ message: "Error fetching inquiries" });
  }
});

// Admin: update inquiry status or details
router.patch("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Inquiry.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Inquiry not found" });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating inquiry:", error);
    res.status(500).json({ message: "Error updating inquiry" });
  }
});

module.exports = router;
