import express from "express";
import {
  sendOtp,
  verifyOtp,
  login,
  googleLogin,
  sendResetOtp,
  verifyResetOtp,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

// Signup OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Login routes
router.post("/login", login);
router.post("/google-login", googleLogin);

// Forgot password routes
router.post("/send-reset-otp", sendResetOtp);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;
