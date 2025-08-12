// src/server.js
import dotenv from "dotenv";
// Load env vars BEFORE anything else
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Debug environment variables
console.log("📡 Environment check:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");

// --- Database Connection ---
connectDB(process.env.MONGO_URI || "");

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// --- Routes ---
app.use("/api/auth", authRoutes);

// --- Health Check ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});
app.use((req, res, next) => {
  console.log(`📡 Incoming request: ${req.method} ${req.url}`);
  next();
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
