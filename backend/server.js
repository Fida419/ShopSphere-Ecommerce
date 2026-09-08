import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ status: "ok", service: "ShopSphere API" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

const sampleProducts = [
  { title: "Premium Wireless Headphones", description: "Immersive sound and all-day comfort.", price: 129, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", featured: true },
  { title: "Classic Minimal Watch", description: "Timeless design for everyday style.", price: 89, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", featured: true },
  { title: "Urban Backpack", description: "Smart storage for work and travel.", price: 59, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
  { title: "Smart Desk Lamp", description: "Modern lighting with a clean aesthetic.", price: 45, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80" }
];

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  if (await Product.countDocuments() === 0) await Product.insertMany(sampleProducts);
  app.listen(process.env.PORT || 5000, () => console.log("ShopSphere API running"));
}
start().catch(err => { console.error(err); process.exit(1); });
