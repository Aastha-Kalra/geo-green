const express = require("express");
const Order = require("../models/orderModel");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Admin: create order
router.post("/", protect, async (req, res) => {
  const payload = req.body || {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const subtotal = items.reduce((sum, i) => sum + (Number(i.lineTotal) || (Number(i.unitPrice) * Number(i.quantity)) || 0), 0);
  const tax = Number(payload.tax ?? 0);
  const total = subtotal + tax;

  const order = new Order({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    shippingAddress: payload.shippingAddress,
    notes: payload.notes,
    status: payload.status,
    items,
    subtotal,
    tax,
    total,
  });
  const saved = await order.save();
  res.json(saved);
});

// Admin: list orders
router.get("/", protect, async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
});

// Admin: get order by id
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

// Admin: update order
router.patch("/:id", protect, async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Order not found" });
  res.json(updated);
});

// Admin: delete order
router.delete("/:id", protect, async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Order not found" });
  res.json({ message: "Order deleted" });
});

module.exports = router;


