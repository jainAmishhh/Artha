import express from "express";
import {
  createTodo,
  getTodos,
  filterTodos,
  toggleStatus,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create
router.post("/create", authMiddleware, createTodo);

// Get all todos
router.get("/all", authMiddleware, getTodos);

// Filter + Sort
router.get("/filter", authMiddleware, filterTodos);

// Toggle Complete/Pending
router.patch("/toggle/:id", authMiddleware, toggleStatus);

// Update
router.put("/:id", authMiddleware, updateTodo);

// Delete
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
