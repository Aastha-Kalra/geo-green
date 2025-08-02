const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.json(saved);
});

module.exports = router;
