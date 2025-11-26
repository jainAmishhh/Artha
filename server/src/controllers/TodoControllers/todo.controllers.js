// ✔ Create Todo
// ✔ Get all Todos
// ✔ Filter Todos (status, priority, role, search)
// ✔ Sort Todos (priority, dueDate, role, status)
// ✔ Toggle status
// ✔ Update & Delete

import Todo from "../models/Todo.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      role,
      dueDate,
      dueTime,
      icon,
      color,
    } = req.body;

    const newTodo = await Todo.create({
      userId: req.user._id,
      title,
      description,
      priority,
      role,
      dueDate,
      dueTime,
      icon,
      color,
      status: "pending",
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Todo created", data: newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterTodos = async (req, res) => {
  try {
    const {
      search = "",
      status = "All",
      priority = "All",
      role = "All",
      sortBy = "dueDate",
      sortOrder = "asc",
    } = req.query;

    const query = { userId: req.user._id };

    // Search Filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Status
    if (status !== "All") query.status = status;

    // Priority
    if (priority !== "All") query.priority = priority;

    // Role/Category
    if (role !== "All") query.role = role;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const todos = await Todo.find(query).sort(sortOptions);

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    if (todo.status === "pending") {
      todo.status = "completed";
      todo.completedAt = new Date();
    } else {
      todo.status = "pending";
      todo.completedAt = null;
    }

    await todo.save();

    res.status(200).json({ message: "Status updated", data: todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Todo updated",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    await todo.deleteOne();

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

