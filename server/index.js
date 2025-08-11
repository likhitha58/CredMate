// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// --- Database Connection ---
connectDB(process.env.MONGO_URI || "");

// --- Middleware ---
// CORS: allow requests from your frontend domain
app.use(
  cors({
    origin: process.env.VITE_API_BASE || "http://localhost:5173", // change to your deployed frontend URL
    credentials: true,
  })
);

// Parse incoming JSON with a limit
app.use(express.json({ limit: "10mb" }));

// --- Routes ---
app.use("/api/auth", authRoutes);

// --- Health Check Route ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
