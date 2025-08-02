const express = require("express");
const Inquiry = require("../models/inquiryModel.js");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const inquiry = new Inquiry(req.body);
  await inquiry.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Product Inquiry",
    text: `New inquiry received for product: ${req.body.productId}
Name: ${req.body.name}
Email: ${req.body.email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log("Email sent: " + info.response);
  });

  res.json({ message: "Inquiry submitted" });
});

module.exports = router;
