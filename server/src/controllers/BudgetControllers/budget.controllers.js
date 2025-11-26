import Budget from "../models/Budget.js";

// ➤ Create a new budget
export const createBudget = async (req, res) => {
  try {
    const { category, name, budget, spent, color, icon } = req.body;

    const newBudget = await Budget.create({
      userId: req.user._id,
      category,
      name,
      budget,
      spent,
      color,
      icon,
    });

    res.status(201).json({
      message: "Budget created successfully",
      data: newBudget,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Get all budgets for logged-in user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Update a budget
export const updateBudget = async (req, res) => {
  try {
    const id = req.params.id;

    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    if (budget.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    const { category, name, budget: newBudget, spent, color, icon } = req.body;

    budget.category = category ?? budget.category;
    budget.name = name ?? budget.name;
    budget.budget = newBudget ?? budget.budget;
    budget.spent = spent ?? budget.spent;
    budget.remaining = budget.budget - budget.spent;
    budget.percentageSpent = Math.min(
      Math.round((budget.spent / budget.budget) * 100),
      100
    );
    budget.color = color ?? budget.color;
    budget.icon = icon ?? budget.icon;

    await budget.save();

    res.status(200).json({
      message: "Budget updated successfully",
      data: budget,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Delete a budget
export const deleteBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const budget = await Budget.findById(id);

    if (!budget) return res.status(404).json({ error: "Budget not found" });

    if (budget.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    await budget.deleteOne();

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
