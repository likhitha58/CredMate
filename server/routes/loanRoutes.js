import express from "express";
import { analyzeLoan } from "../controllers/loanController.js";
// import { verifyToken } from "../middleware/authMiddleware.js"; // if you want auth

const router = express.Router();

// Loan analysis route (remove verifyToken while testing)
router.post("/analyze", analyzeLoan);

export default router;
