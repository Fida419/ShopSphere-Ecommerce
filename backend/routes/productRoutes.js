import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q = "", category = "" } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (category) filter.category = category;
  res.json(await Product.find(filter).sort({ createdAt: -1 }));
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});

router.post("/", protect, adminOnly, async (req, res) => res.status(201).json(await Product.create(req.body)));
router.put("/:id", protect, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
