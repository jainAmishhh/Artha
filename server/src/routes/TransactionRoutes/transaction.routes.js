import express from "express";
import {
  createTransaction,
  getTransactions,
  filterTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create
router.post("/create", authMiddleware, createTransaction);

// Get all
router.get("/all", authMiddleware, getTransactions);

// Filter
router.get("/filter", authMiddleware, filterTransactions);

// Update
router.put("/:id", authMiddleware, updateTransaction);

// Delete
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
