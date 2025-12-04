import TODO from "../../models/TodoModels/todo.models.js";

// Create Todo //
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, category, dueDate, dueTime, icon } =
      req.body;

    // Required validation
    if (!title || !priority || !category || !dueDate || !dueTime) {
      return res.status(400).json({
        success: false,
        message:
          "Title, Priority, Category, Due Date & Due Time are required.",
      });
    }

    const newTodo = await TODO.create({
      userId: req.user._id,
      title,
      description,
      priority,
      category,
      dueDate,
      dueTime,
      icon,
    });

    return res.status(201).json({
      success: true,
      message: "TODO created successfully!",
      data: newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create TODO",
      error: error.message,
    });
  }
};

// Get all Todos //
export const getTodos = async (req, res) => {
  try {
    const todos = await TODO.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "TODOs fetched successfully!",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch TODOs",
      error: error.message,
    });
  }
};

// Filter Todos (status, priority, role, search) //
// Sort Todos (priority, dueDate, role, status) //
export const filterTodos = async (req, res) => {
  try {
    const {
      search = "",
      status = "All",
      priority = "All",
      category = "All",
      sortBy = "dueDate",
      sortOrder = "asc",
    } = req.query;

    const query = { userId: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status !== "All") query.status = status;
    if (priority !== "All") query.priority = priority;
    if (category !== "All") query.category = category;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const todos = await TODO.find(query).sort(sortOptions);

    return res.status(200).json({
      success: true,
      message: "Todos filtered successfully!",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter TODOs",
      error: error.message,
    });
  }
};

// Toggle status //
export const toggleStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await TODO.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "TODO not found!",
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this TODO",
      });
    }

    if (todo.status === "pending") {
      todo.status = "completed";
      todo.completedAt = new Date();
    } else {
      todo.status = "pending";
      todo.completedAt = null;
    }

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update TODO status",
      error: error.message,
    });
  }
};

// Update a TODO //
export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await TODO.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "TODO not found!",
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this TODO",
      });
    }

    const { title, description, priority, category, dueDate, dueTime, icon } =
      req.body;

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (priority) todo.priority = priority;
    if (category) todo.category = category;
    if (dueDate) todo.dueDate = dueDate;
    if (dueTime) todo.dueTime = dueTime;
    if (icon) todo.icon = icon;

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "TODO updated successfully!",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update TODO",
      error: error.message,
    });
  }
};

// Delete a Todo //
export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await TODO.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "TODO not found!",
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this TODO",
      });
    }

    await todo.deleteOne();

    return res.status(200).json({
      success: true,
      message: "TODO deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete TODO",
      error: error.message,
    });
  }
};