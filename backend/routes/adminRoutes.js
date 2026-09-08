import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/stats", async (req, res) => {
  const [products, users, orders, revenue] = await Promise.all([
    Product.countDocuments(), User.countDocuments(), Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }])
  ]);
  res.json({ products, users, orders, revenue: revenue[0]?.total || 0 });
});

router.get("/orders", async (req, res) => res.json(await Order.find().populate("user", "name email").sort({ createdAt: -1 })));
router.patch("/orders/:id", async (req, res) =>
  res.json(await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }))
);

export default router;
