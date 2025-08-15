import express from "express";
import { analyzeLoan } from "../controllers/loanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for analyzing loan eligibility
router.post("/analyze", verifyToken, analyzeLoan);

export default router;
