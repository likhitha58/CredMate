import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

// Send OTP
router.post("/send-otp", sendOtp);

// Verify OTP & Register
router.post("/verify-otp", verifyOtp);

export default router;
