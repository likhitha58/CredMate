import express from "express";
import { signup, login, verifyOtp } from "../controllers/authController.js";
import { signupValidation, loginValidation } from "../utils/validators.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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

router.post("/signup", signupValidation, validateRequest, signup);
router.post("/verify-otp", otpValidation, validateRequest, verifyOtp);
router.post("/login", loginValidation, validateRequest, login);

export default router;
