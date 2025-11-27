import express from "express";
import {
  createTodo,
  getTodos,
  filterTodos,
  toggleStatus,
  updateTodo,
  deleteTodo,
} from "../../controllers/TodoControllers/todo.controllers.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth to all todo routes
router.use(authMiddleware);

// Create a new TODO
router.post("/", createTodo);

// Get all TODOs for logged-in user
router.get("/", getTodos);

// Filter + sort TODOs (uses query params)
router.get("/filter", filterTodos);

// Toggle TODO status (pending/completed)
router.patch("/:id/toggle", toggleStatus);

// Update a TODO
router.put("/:id", updateTodo);

// Delete a TODO
router.delete("/:id", deleteTodo);

export default router;
