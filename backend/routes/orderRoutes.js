import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!items?.length) return res.status(400).json({ message: "Cart is empty" });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({ user: req.user._id, items, shippingAddress, total });
  res.status(201).json(order);
});

router.get("/mine", protect, async (req, res) =>
  res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }))
);

export default router;
