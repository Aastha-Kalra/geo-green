const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    productId: { type: String },
    productName: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    quantity: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
