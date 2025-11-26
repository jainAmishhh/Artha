// This controller will return:

// Total income

// Total expenses

// Net balance

// Category breakdown

// Budget vs spent summary

// Todo completion rate

// Savings rate

// Top categories

// Spending percentages

// Quick stats

import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import Todo from "../models/Todo.js";


export const getFinancialInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    // ===== TRANSACTIONS =====
    const transactions = await Transaction.find({ userId });

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = Math.abs(
      transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const netBalance = income - expenses;
    const savingsRate = income > 0 ? Math.round((netBalance / income) * 100) : 0;

    // ===== CATEGORY BREAKDOWN =====
    const categoryMap = {};
    transactions.forEach(t => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = { category: t.category, amount: 0, color: t.color };
      }
      categoryMap[t.category].amount += Math.abs(t.amount);
    });
    const categoryBreakdown = Object.values(categoryMap);

    const totalSpending = categoryBreakdown.reduce((sum, cat) => sum + cat.amount, 0);

    const categoryPercentages = categoryBreakdown.map(cat => ({
      ...cat,
      percentage: totalSpending ? Math.round((cat.amount / totalSpending) * 100) : 0
    }));

    // ===== BUDGET PERFORMANCE =====
    const budgets = await Budget.find({ userId });
    const budgetPerformance = budgets.map(b => ({
      category: b.category,
      budgeted: b.budget,
      spent: b.spent,
      percentage: b.budget ? Math.round((b.spent / b.budget) * 100) : 0,
      color: b.color
    }));

    // ===== TODO DATA =====
    const todos = await Todo.find({ userId });

    const completedTodos = todos.filter(t => t.status === "completed").length;
    const todoCompletionRate = todos.length
      ? Math.round((completedTodos / todos.length) * 100)
      : 0;

    // ===== QUICK STATS =====
    const highestExpense = categoryBreakdown.reduce((max, c) =>
      c.amount > (max?.amount || 0) ? c : max,
      null
    );

    const totalTransactions = transactions.length;

    // Final Response
    res.status(200).json({
      income,
      expenses,
      netBalance,
      savingsRate,
      categoryPercentages,
      budgetPerformance,
      todoCompletionRate,
      completedTodos,
      totalTodos: todos.length,
      highestExpense,
      totalTransactions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
