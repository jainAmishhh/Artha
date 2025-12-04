  // \server\src\controllers\BudgetControllers

  import Budget from "../../models/BudgetModels/budget.models.js";

  // CREATE BUDGET //

  export const createBudget = async (req, res) => {
    try {
      const {
        category,
        budgetName,
        budgetAmount,
        spentAmount,
        colorTheme,
        icon,
      } = req.body;

      // Validate required fields
      if (
        !category ||
        !budgetName ||
        budgetAmount == null ||
        spentAmount == null
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Category, Budget Name, Budget Amount & Spent Amount are required.",
        });
      }

      // Prevent zero/negative values
      if (budgetAmount < 0 || spentAmount < 0) {
        return res.status(400).json({
          success: false,
          message: "Budget amount and spent amount must be positive.",
        });
      }

      const newBudget = await Budget.create({
        userId: req.user._id,
        category,
        budgetName,
        budgetAmount,
        spentAmount,
        colorTheme,
        icon,
        remaining: budgetAmount - spentAmount,
        percentageSpent:
          budgetAmount === 0
            ? 0
            : Math.min(Math.round((spentAmount / budgetAmount) * 100), 100),
      });

      return res.status(201).json({
        success: true,
        message: "Budget created successfully",
        data: newBudget,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create budget",
        error: error.message,
      });
    }
  };

  // GET ALL USER BUDGETS //

  export const getBudgets = async (req, res) => {
    try {
      const budgets = await Budget.find({ userId: req.user._id }).sort({
        createdAt: -1,
      });

      if (!budgets) {
        return res.status(400).json({
          success: false,
          message: "Budget not found!",
        })
      }

      return res.status(200).json({
        success: true,
        message: "Budgets fetched successfully",
        data: budgets,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch budgets",
        error: error.message,
      });
    }
  };

  // UPDATE BUDGET //

  export const updateBudget = async (req, res) => {
    try {
      const id = req.params.id;

      const budget = await Budget.findById(id);
      if (!budget) {
        return res.status(400).json({
          success: false,
          message: "Budget not found",
        });
      }

      // Authorization check
      if (budget.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this budget",
        });
      }

      // Fields to update
      const {
        category,
        budgetName,
        budgetAmount,
        spentAmount,
        colorTheme,
        icon,
      } = req.body;

      // Assign updated fields only if present
      if (category) budget.category = category;
      if (budgetName) budget.budgetName = budgetName;
      if (budgetAmount != null) budget.budgetAmount = budgetAmount;
      if (spentAmount != null) budget.spentAmount = spentAmount;
      if (colorTheme) budget.colorTheme = colorTheme;
      if (icon) budget.icon = icon;

      // Recalculate derived fields
      budget.remaining = budget.budgetAmount - budget.spentAmount;
      budget.percentageSpent =
        budget.budgetAmount === 0
          ? 0
          : Math.min(
              Math.round((budget.spentAmount / budget.budgetAmount) * 100),
              100
            );

      await budget.save();

      return res.status(200).json({
        success: true,
        message: "Budget updated successfully",
        data: budget,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update budget",
        error: error.message,
      });
    }
  };

  // DELETE BUDGET //

  export const deleteBudget = async (req, res) => {
    try {
      const id = req.params.id;

      const budget = await Budget.findById(id);
      if (!budget) {
        return res.status(400).json({
          success: false,
          message: "Budget not found",
        });
      }

      // Authorization
      if (budget.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to delete this budget",
        });
      }

      await budget.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Budget deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete budget",
        error: error.message,
      });
    }
  };
