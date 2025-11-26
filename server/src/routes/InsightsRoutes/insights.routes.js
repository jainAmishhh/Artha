import express from "express";
import { getFinancialInsights } from "../controllers/insightsController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getFinancialInsights);

export default router;
