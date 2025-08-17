const express = require("express");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require("../models/productModel");
const Inquiry = require("../models/inquiryModel");
const Order = require("../models/orderModel");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log(admin,"admin");
  


  const storedPassword = admin.password || "";
  const isHash = typeof storedPassword === "string" && storedPassword.startsWith("$2");

  let isValid = false;
  if (isHash) {
    isValid = bcrypt.compareSync(password, storedPassword);
  } else {
    // Fallback for legacy/plain-text stored passwords
    isValid = storedPassword === password;
    if (isValid) {
      admin.password = bcrypt.hashSync(password, 10);
      await admin.save();
      console.log("Admin password upgraded to hashed storage");
    }
  }

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server misconfigured: JWT_SECRET is missing" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  console.log(token,"tttt");
  
  res.json({ token });
});

// Dashboard stats
router.get("/dashboard", protect, async (req, res) => {
  const [totalProducts, totalInquiries, totalOrders, recentProducts] = await Promise.all([
    Product.countDocuments(),
    Inquiry.countDocuments(),
    Order.countDocuments(),
    Product.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({
    totalProducts,
    totalInquiries,
    totalOrders,
    recentProducts,
  });
});

module.exports = router;
