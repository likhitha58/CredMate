import express from "express";
import {
  sendOtp,
  verifyOtp,
  login,
  sendResetOtp,
  verifyResetOtp,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/send-reset-otp", sendResetOtp);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;