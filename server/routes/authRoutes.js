import express from "express";
import { signup, login, verifyOtp } from "../controllers/authController.js";
import { signupValidation, loginValidation } from "../utils/validators.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("⚠ Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Additional validation for OTP verification route
const otpValidation = [
  body("email").isEmail().withMessage("Enter a valid email."),
  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numeric"),
];

// Debug log for each route
router.post("/signup", (req, res, next) => {
  console.log("📩 POST /api/auth/signup called with body:", req.body);
  next();
}, signupValidation, validateRequest, signup);

router.post("/verify-otp", (req, res, next) => {
  console.log("🔍 POST /api/auth/verify-otp called with body:", req.body);
  next();
}, otpValidation, validateRequest, verifyOtp);

router.post("/login", (req, res, next) => {
  console.log("🔑 POST /api/auth/login called with body:", req.body);
  next();
}, loginValidation, validateRequest, login);

export default router;
