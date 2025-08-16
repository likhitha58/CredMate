import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

// 🚨 Log only non-sensitive envs
console.log("✅ Loaded environment variables: PORT, MONGO_URI, JWT_SECRET, EMAIL_USER, HF_API_KEY");

// ✅ Check required env vars
const requiredEnv = ["PORT", "MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS", "HF_API_KEY"];
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Connect MongoDB
connectDB();

const app = express();

// ✅ Configure CORS (allow frontend only)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loan", loanRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
