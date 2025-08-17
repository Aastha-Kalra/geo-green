const express = require("express");
const Product = require("../models/productModel");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage, cloudinary } = require("../utils/cloudinary");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// Multer with Cloudinary storage
const upload = multer({ storage });

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Product service is running" });
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// Add product (with Cloudinary upload)
router.post("/", protect, upload.array("images", 6), async (req, res) => {
  try {
    const body = req.body;

    // Validate
    if (!body.name || !body.price || !body.category) {
      return res.status(400).json({ message: "Name, price & category are required" });
    }

    // Cloudinary uploaded files (req.files already has .path from Cloudinary)
    const uploadedImages = req.files ? req.files.map((file) => file.path) : [];

    const processArrayField = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field.filter(Boolean);
      try {
        const parsed = JSON.parse(field);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {
        return field.split("\n").map((s) => s.trim()).filter(Boolean);
      }
      return [];
    };

    const product = new Product({
      name: body.name.trim(),
      description: body.description || "",
      additionalInfo: body.additionalInfo || "",
      howToUse: body.howToUse || "",
      ingredients: processArrayField(body.ingredients),
      benefits: processArrayField(body.benefits),
      keyBenefits: processArrayField(body.keyBenefits),
      quantity: body.quantity || "",
      price: Number(body.price),
      category: body.category.trim(),
      image: uploadedImages[0] || "",
      images: uploadedImages,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});


router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


router.put("/:id", protect, upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;

    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    // Parse arrays back from JSON
    const ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];
    const benefits = req.body.benefits ? JSON.parse(req.body.benefits) : [];
    const keyBenefits = req.body.keyBenefits ? JSON.parse(req.body.keyBenefits) : [];

    // Upload new files to Cloudinary
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      newImageUrls = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "geo-green/products",
          });
          return result.secure_url;
        })
      );
    }

    // Merge with existing images sent from frontend
    let images = [];
    if (req.body.existingImages) {
      const existing = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];
      images = [...existing];
    }
    images = [...images, ...newImageUrls];

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        additionalInfo: req.body.additionalInfo,
        howToUse: req.body.howToUse,
        ingredients,
        benefits,
        keyBenefits,
        quantity: req.body.quantity,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});






module.exports = router;
