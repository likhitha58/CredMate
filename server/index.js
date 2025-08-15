import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

// Log environment variables for debugging
console.log("EMAIL_USER (index.js):", process.env.EMAIL_USER);
console.log("EMAIL_PASS (index.js):", process.env.EMAIL_PASS);

const requiredEnv = ["PORT", "MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/loan", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));