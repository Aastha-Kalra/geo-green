const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema({
  productId: String,
  name: String,
  email: String,
  phone: String,
  message: String,
});

module.exports = mongoose.model("Inquiry", inquirySchema);
