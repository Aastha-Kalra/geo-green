const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    additionalInfo: { type: String },
    howToUse: { type: String },
    ingredients: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    keyBenefits: { type: [String], default: [] },
    quantity: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    images: { type: [String], default: [] },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
