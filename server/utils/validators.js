// src/utils/validators.js
import { body } from "express-validator";

export const signupValidation = [
  body("name").optional().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
  body("email").isEmail().withMessage("Enter a valid email."),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/).withMessage("Password must contain a lowercase letter.")
    .matches(/[0-9]/).withMessage("Password must contain a number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain a special character.")
];

export const loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email."),
  body("password").exists().withMessage("Password is required.")
];
