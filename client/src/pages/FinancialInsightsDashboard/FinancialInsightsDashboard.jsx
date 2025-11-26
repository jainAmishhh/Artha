// axios.get("/api/insights/dashboard")
//   .then(res => setInsights(res.data));

// ✅ 1. Replace hardcoded sample data with API calls

// Remove:

// const transactions = [...]
// const budgetData = [...]
// const todoData = [...]


// Replace with:

// const [insights, setInsights] = useState(null);

// useEffect(() => {
//   axios.get("/api/insights/dashboard")
//        .then(res => setInsights(res.data));
// }, []);

// ✅ 2. Use backend response values

// Your backend returns:

// income
// expenses
// netBalance
// savingsRate
// categoryPercentages
// budgetPerformance
// todoCompletionRate
// completedTodos
// totalTodos
// highestExpense
// totalTransactions


// Replace UI values accordingly.

// ✅ 3. Add loading / no-data states

// Before data loads:

// if (!insights) return <LoadingSkeleton />;

// ✅ 4. Add filtering on transactions

// The transactions page must call the existing:

// 👉 /api/transactions/filter endpoint
// instead of filtering in frontend.

// ✅ 5. Add date-based filtering backend

// Your UI includes:

// Today

// 7 Days

// 30 Days

// You must modify filterTransactions controller to also filter by date range if needed.

// ✅ 6. (Optional but recommended)
// Add separate “Insights” frontend service

// services/insightsApi.js

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  BarChart3,
  Activity,
  Target,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Award,
} from "lucide-react";

const FinancialInsightsDashboard = () => {
  const [activeView, setActiveView] = useState("insights");
  const [filters, setFilters] = useState({
    search: "",
    time: "All",
    type: "All",
    category: "All",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const transactions = [
    { id: 1, description: "Salary", merchant: "Company", amount: 50000, type: "income", category: "Salary", date: "2025-06-15", color: "#10B981" },
    { id: 2, description: "Groceries", merchant: "Store", amount: -2500, type: "expense", category: "Food", date: "2025-06-14", color: "#F59E0B" },
    { id: 3, description: "Rent", merchant: "Landlord", amount: -15000, type: "expense", category: "Housing", date: "2025-06-10", color: "#3B82F6" },
    { id: 4, description: "Freelance", merchant: "Client", amount: 8000, type: "income", category: "Freelance", date: "2025-06-08", color: "#10B981" },
    { id: 5, description: "Coffee", merchant: "Cafe", amount: -350, type: "expense", category: "Food", date: "2025-06-12", color: "#F59E0B" },
  ];

  const budgetData = [
    { category: "Food", budgeted: 5000, spent: 2850, color: "#F59E0B" },
    { category: "Housing", budgeted: 15000, spent: 15000, color: "#3B82F6" },
    { category: "Transportation", budgeted: 3000, spent: 2200, color: "#EF4444" },
    { category: "Entertainment", budgeted: 2000, spent: 1500, color: "#EC4899" },
  ];

  const todoData = [
    { id: 1, title: "Complete project", completed: true },
    { id: 2, title: "Buy groceries", completed: true },
    { id: 3, title: "Gym workout", completed: false },
    { id: 4, title: "Team meeting", completed: true },
  ];

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalIncome - totalExpenses;
  const completedTodos = todoData.filter(t => t.completed).length;
  const todoCompletionRate = Math.round((completedTodos / todoData.length) * 100);

  // Category breakdown
  const categoryMap = {};
  transactions.forEach(({ category, amount, color }) => {
    if (!categoryMap[category]) {
      categoryMap[category] = { category, amount: 0, color };
    }
    categoryMap[category].amount += Math.abs(amount);
  });
  const categoryData = Object.values(categoryMap);

  // Spending by category percentage
  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
  const categoryPercentages = categoryData.map(cat => ({
    ...cat,
    percentage: Math.round((cat.amount / totalSpending) * 100)
  }));

  const timeFilters = ["All", "Today", "7 Days", "30 Days"];
  const categories = ["All", ...new Set(transactions.map(t => t.category))];
  const typeFilters = ["All", "income", "expense"];

  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;
  
  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        transaction.description.toLowerCase().includes(search) ||
        transaction.merchant.toLowerCase().includes(search);
      const matchesCategory = filters.category === "All" || transaction.category === filters.category;
      const matchesType = filters.type === "All" || transaction.type === filters.type;
      return matchesSearch && matchesCategory && matchesType;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
                <Activity className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-800">Financial Insights</h1>
                <p className="text-slate-600">Analyze your spending patterns and trends</p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-white rounded-xl p-1 border border-slate-200 shadow-lg">
              <button
                onClick={() => setActiveView("insights")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeView === "insights"
                    ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <PieChart size={18} />
                Insights
              </button>
              <button
                onClick={() => setActiveView("transactions")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeView === "transactions"
                    ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <BarChart3 size={18} />
                Transactions
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <TrendingUp className="text-emerald-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Total Income</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">₹{totalIncome.toLocaleString()}</p>
            <p className="text-xs text-emerald-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-rose-100 rounded-xl">
                <TrendingDown className="text-rose-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Total Expenses</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-rose-600 mt-1">-5% from last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Wallet className="text-blue-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Net Balance</p>
            </div>
            <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ₹{netBalance.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">Available to save</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Target className="text-purple-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Savings Rate</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{savingsRate}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(savingsRate, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Insights View */}
        {activeView === "insights" ? (
          <div className="space-y-6">
            
            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Spending by Category */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="text-purple-600" size={20} />
                  <h3 className="text-xl font-bold text-slate-800">Spending by Category</h3>
                </div>
                <div className="space-y-4">
                  {categoryPercentages.map((cat) => (
                    <div key={cat.category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-700">{cat.category}</span>
                        <span className="text-sm font-bold text-slate-800">₹{cat.amount.toLocaleString()}</span>
                      </div>
                      <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${cat.percentage}%`,
                            backgroundColor: cat.color
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{cat.percentage}% of total spending</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Performance */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-slate-800">Budget Performance</h3>
                </div>
                <div className="space-y-4">
                  {budgetData.map((item) => {
                    const percentage = Math.round((item.spent / item.budgeted) * 100);
                    const isOverBudget = percentage > 100;
                    return (
                      <div key={item.category} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-slate-700">{item.category}</span>
                          <span className={`text-sm font-bold ${isOverBudget ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {percentage}%
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mb-2">
                          <span>Spent: ₹{item.spent.toLocaleString()}</span>
                          <span>Budget: ₹{item.budgeted.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              isOverBudget ? 'bg-gradient-to-r from-rose-500 to-rose-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Insights */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Todo Progress */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-emerald-600" size={20} />
                  <h3 className="text-lg font-bold text-slate-800">Task Progress</h3>
                </div>
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold text-slate-800 mb-2">{todoCompletionRate}%</p>
                  <p className="text-sm text-slate-600">{completedTodos} of {todoData.length} tasks completed</p>
                </div>
                <div className="space-y-2">
                  {todoData.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-2 text-sm">
                      {todo.completed ? (
                        <CheckCircle className="text-emerald-500" size={16} />
                      ) : (
                        <Clock className="text-slate-400" size={16} />
                      )}
                      <span className={`${todo.completed ? 'text-slate-600 line-through' : 'text-slate-700'}`}>
                        {todo.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Health Score */}
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-white" size={20} />
                  <h3 className="text-lg font-bold">Financial Health</h3>
                </div>
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold mb-2">85</p>
                  <p className="text-sm text-purple-100">Out of 100</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-100">Savings</span>
                    <span className="font-semibold">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Spending</span>
                    <span className="font-semibold">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Budget Adherence</span>
                    <span className="font-semibold">Good</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-amber-600" size={20} />
                  <h3 className="text-lg font-bold text-slate-800">Quick Stats</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <p className="text-xs text-emerald-700 mb-1">Highest Expense</p>
                    <p className="text-lg font-bold text-emerald-900">Housing</p>
                    <p className="text-sm text-emerald-700">₹15,000</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-700 mb-1">Average Daily Spend</p>
                    <p className="text-lg font-bold text-blue-900">₹700</p>
                    <p className="text-sm text-blue-700">Last 30 days</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <p className="text-xs text-purple-700 mb-1">Transactions</p>
                    <p className="text-lg font-bold text-purple-900">{transactions.length}</p>
                    <p className="text-sm text-purple-700">This month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Transactions View
          <div className="space-y-6">
            
            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilters({...filters, time: filter})}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        filters.time === filter
                          ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    showFilters 
                      ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Filter size={18} />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {showFilters && (
                <div className="mt-6 grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {typeFilters.map(type => (
                        <option key={type} value={type}>
                          {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Filtered Transactions ({filteredTransactions.length})
              </h3>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => {
                  const isIncome = transaction.type === "income";
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{transaction.description}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                          <span>{transaction.merchant}</span>
                          <span className="text-slate-400">•</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(transaction.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${transaction.color}20`,
                            color: transaction.color 
                          }}
                        >
                          {transaction.category}
                        </span>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
                          isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {isIncome ? (
                            <ArrowUpRight size={18} className="text-emerald-600" />
                          ) : (
                            <ArrowDownLeft size={18} className="text-rose-600" />
                          )}
                          <span>{isIncome ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInsightsDashboard;


// import React, { act, useState } from "react";
// import FinancialInsightsHeader from "./FinancialInsightsHeader";
// import SummaryCard from "./SummaryCard";
// import transactionData from "../TransactionHistory/transactionData.js";
// import FinancialInsightFilterBar from "./FinancialInsightFilterBar.jsx";
// import RenderInsightsContent from "./renderInsightsContent.jsx";
// import RenderTransactionContent from "./RenderTransactionContent.jsx";
// // import KeyMetrics from "./KeyMetrics";
// // import SpendingTrendChart from "./SpendingTrendChart";
// // import CategoryBreakdownChart from "./CategoryBreakdownChart";
// // import BudgetPerformanceChart from "./BudgetPerformanceChart";
// // import TodoProgress from "./TodoProgress";
// // import TransactionsList from "./TransactionsList";
// import { transactionsData, budgetData, todoData } from "./mockData";
// // import categoryData from "./categoryData";

// const FinancialInsightsDashboard = () => {
//   const [activeView, setActiveView] = useState("insights");
//   const [transactions] = useState(transactionData);
//   const [filters, setFilters] = useState({
//     search: "",
//     time: "All",
//     type: "All",
//     category: "All",
//     insight: "All",
//   });

//   const totalIncome = Number(
//     transactions
//       .filter((t) => t.type === "income")
//       .reduce((sum, t) => sum + (t.amount || 0), 0)
//   );

//   const totalExpenses = Math.abs(
//     transactions
//       .filter((t) => t.type === "expense")
//       .reduce((sum, t) => sum + (t.amount || 0), 0)
//   );

//   const netBalance = totalIncome - totalExpenses;

//   const getFilteredTransactions = () => {
//     return transactions.filter((transaction) => {
//       const search = filters.search.toLowerCase();

//       const matchesSearch =
//         transaction.description.toLowerCase().includes(search) ||
//         transaction.merchant.toLowerCase().includes(search) ||
//         String(transaction.amount).includes(search);

//       const matchesCategory =
//         filters.category === "All" || transaction.category === filters.category;

//       const matchesType =
//         filters.type === "All" || transaction.type === filters.type;

//       let matchesTime = true;
//       if (filters.time !== "All") {
//         const transactionDate = new Date(transaction.date);
//         const today = new Date();
//         const daysDiff = Math.floor(
//           (today - transactionDate) / (1000 * 60 * 60 * 24)
//         );

//         switch (filters.time) {
//           case "Today":
//             matchesTime = daysDiff === 0;
//             break;
//           case "7 Days":
//             matchesTime = daysDiff <= 7;
//             break;
//           case "30 Days":
//             matchesTime = daysDiff <= 30;
//             break;
//           default:
//             matchesTime = true;
//         }
//       }

//       return matchesSearch && matchesCategory && matchesType && matchesTime;
//     });
//   };

//   const filteredTransactions = getFilteredTransactions();

//   const completedTodos = todoData.filter(
//     (todo) => todo.completed === true
//   ).length;
//   const todoCompletionRate = (completedTodos / todoData.length) * 100;

//   const generateInsightsData = () => {
//     // === Daily Trend (Income vs Expenses by Date) ===
//     const trendMap = {};

//     transactions.forEach(({ date, type, amount }) => {
//       if (!trendMap[date]) {
//         trendMap[date] = { date, income: 0, expenses: 0 };
//       }
//       if (type === "income") {
//         trendMap[date].income += amount;
//       } else {
//         trendMap[date].expenses += Math.abs(amount);
//       }
//     });

//     const trendData = Object.values(trendMap).sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );

//     // === Category Breakdown (Pie Chart Data) ===
//     const categoryMap = {};

//     transactions.forEach(({ category, amount, color }) => {
//       if (!categoryMap[category]) {
//         categoryMap[category] = { category, amount: 0, color };
//       }
//       categoryMap[category].amount += Math.abs(amount);
//     });

//     const pieData = Object.values(categoryMap);

//     // === Budget vs Actual Comparison ===
//     const budgetComparison = budgetData.map((item) => ({
//       ...item,
//       variance:
//         item.category === "Income"
//           ? item.actual - item.budgeted
//           : item.budgeted - item.spent,
//     }));

//     return { trendData, pieData, budgetComparison };
//   };

//   const { trendData, pieData, budgetComparison } = generateInsightsData();

//   // const generateInsightsData = () => {
//   //   // Use all transactions directly
//   //   const allTransactions = transactions;

//   //   // Daily spending trend
//   //   const dailyData = allTransactions.reduce((acc, transaction) => {
//   //     const date = transaction.date;
//   //     if (!acc[date]) {
//   //       acc[date] = { date, income: 0, expenses: 0 };
//   //     }
//   //     if (transaction.type === "income") {
//   //       acc[date].income += transaction.amount;
//   //     } else {
//   //       acc[date].expenses += Math.abs(transaction.amount);
//   //     }
//   //     return acc;
//   //   }, {});

//   //   const trendData = Object.values(dailyData).sort(
//   //     (a, b) => new Date(a.date) - new Date(b.date)
//   //   );

//   //   // Category breakdown
//   //   const categoryData = allTransactions.reduce((acc, transaction) => {
//   //     if (!acc[transaction.category]) {
//   //       acc[transaction.category] = {
//   //         category: transaction.category,
//   //         amount: 0,
//   //         color: transaction.color,
//   //       };
//   //     }
//   //     acc[transaction.category].amount += Math.abs(transaction.amount);
//   //     return acc;
//   //   }, {});

//   //   const pieData = Object.values(categoryData);

//   //   // Budget vs Actual
//   //   const budgetComparison = budgetData.map((item) => ({
//   //     ...item,
//   //     variance:
//   //       item.category === "Income"
//   //         ? item.actual - item.budgeted
//   //         : item.budgeted - item.spent,
//   //   }));

//   //   return { trendData, pieData, budgetComparison };
//   // };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)",
//       }}
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)",
//           }}
//         ></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)",
//           }}
//         ></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
//         <FinancialInsightsHeader
//           activeView={activeView}
//           setActiveView={setActiveView}
//         />

//         <SummaryCard
//           totalIncome={totalIncome}
//           totalExpenses={totalExpenses}
//           netBalance={netBalance}
//         />

//         <FinancialInsightFilterBar
//           transactions={transactions}
//           activeView={activeView}
//           filters={filters}
//           setFilters={setFilters}
//         />

//         {/* <FinancialInsightFilterBar
//           transactions={transactions}
//           activeView={activeView}
//         /> */}

//         {/* Main View */}
//         {activeView === "insights" ? (
//           <RenderInsightsContent
//             totalIncome={totalIncome}
//             totalExpenses={totalExpenses}
//             netBalance={netBalance}
//             todoCompletionRate={todoCompletionRate}
//             trendData={trendData}
//             pieData={pieData}
//             budgetComparison={budgetComparison}
//             todoData={todoData}
//           />
//         ) : (
//           <RenderTransactionContent
//             filteredTransactions={filteredTransactions}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FinancialInsightsDashboard;

// // import React, { useState, useEffect } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   ResponsiveContainer,
// //   Area,
// //   AreaChart,
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ComposedChart,
// // } from "recharts";
// // import {
// //   ArrowLeft,
// //   Search,
// //   Plus,
// //   TrendingUp,
// //   BookOpen,
// //   AlertTriangle,
// //   Home,
// //   RefreshCw,
// //   BarChart3,
// //   DollarSign,
// //   Sparkles,
// //   Filter,
// //   ArrowUpRight,
// //   ArrowDownLeft,
// //   Calendar,
// //   ChevronDown,
// //   Eye,
// //   Download,
// //   Target,
// //   CheckCircle,
// //   Clock,
// //   Activity,
// //   PieChart as PieChartIcon,
// //   TrendingDown,
// // } from "lucide-react";
// // import FinancialInsightsHeader from "./FinancialInsightsHeader";

// // const FinancialInsightsDashboard = () => {
// //   const [activeView, setActiveView] = useState("insights"); // 'insights' or 'transactions'
// //   const [activeTimeFilter, setActiveTimeFilter] = useState("30 Days");
// //   const [activeCategoryFilter, setCategoryFilter] = useState("All");
// //   const [activeTypeFilter, setTypeFilter] = useState("All");
// //   const [activeInsightFilter, setInsightFilter] = useState("All");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);

// //   const [transactions] = useState([
// //     {
// //       id: 1,
// //       description: "Online Course - React Mastery",
// //       amount: -199,
// //       category: "Education",
// //       type: "expense",
// //       date: "2025-06-18",
// //       time: "14:30",
// //       merchant: "Udemy",
// //       icon: BookOpen,
// //       color: "#F4C542",
// //     },
// //     {
// //       id: 2,
// //       description: "Emergency Fund Deposit",
// //       amount: +500,
// //       category: "Emergency",
// //       type: "income",
// //       date: "2025-06-17",
// //       time: "09:15",
// //       merchant: "Bank Transfer",
// //       icon: AlertTriangle,
// //       color: "#8B1C22",
// //     },
// //     {
// //       id: 3,
// //       description: "Monthly Rent Payment",
// //       amount: -1200,
// //       category: "Housing",
// //       type: "expense",
// //       date: "2025-06-15",
// //       time: "08:00",
// //       merchant: "Property Management",
// //       icon: Home,
// //       color: "#22543D",
// //     },
// //     {
// //       id: 4,
// //       description: "Freelance Payment",
// //       amount: +850,
// //       category: "Income",
// //       type: "income",
// //       date: "2025-06-14",
// //       time: "16:45",
// //       merchant: "Client ABC",
// //       icon: DollarSign,
// //       color: "#059669",
// //     },
// //     {
// //       id: 5,
// //       description: "Programming Books",
// //       amount: -89,
// //       category: "Education",
// //       type: "expense",
// //       date: "2025-06-13",
// //       time: "11:20",
// //       merchant: "Amazon",
// //       icon: BookOpen,
// //       color: "#F4C542",
// //     },
// //     {
// //       id: 6,
// //       description: "Utilities Bill",
// //       amount: -145,
// //       category: "Housing",
// //       type: "expense",
// //       date: "2025-06-12",
// //       time: "10:30",
// //       merchant: "Electric Company",
// //       icon: Home,
// //       color: "#22543D",
// //     },
// //     {
// //       id: 7,
// //       description: "Side Project Income",
// //       amount: +320,
// //       category: "Income",
// //       type: "income",
// //       date: "2025-06-11",
// //       time: "19:15",
// //       merchant: "App Store",
// //       icon: DollarSign,
// //       color: "#059669",
// //     },
// //     {
// //       id: 8,
// //       description: "Certification Course",
// //       amount: -299,
// //       category: "Education",
// //       type: "expense",
// //       date: "2025-06-10",
// //       time: "13:45",
// //       merchant: "Coursera",
// //       icon: BookOpen,
// //       color: "#F4C542",
// //     },
// //     {
// //       id: 9,
// //       description: "Home Insurance",
// //       amount: -180,
// //       category: "Housing",
// //       type: "expense",
// //       date: "2025-06-09",
// //       time: "15:20",
// //       merchant: "Insurance Co.",
// //       icon: Home,
// //       color: "#22543D",
// //     },
// //     {
// //       id: 10,
// //       description: "Emergency Withdrawal",
// //       amount: -75,
// //       category: "Emergency",
// //       type: "expense",
// //       date: "2025-06-08",
// //       time: "12:10",
// //       merchant: "ATM",
// //       icon: AlertTriangle,
// //       color: "#8B1C22",
// //     },
// //   ]);

// //   const [budgetData] = useState([
// //     { category: "Housing", budgeted: 1400, spent: 1525, color: "#22543D" },
// //     { category: "Education", budgeted: 300, spent: 587, color: "#F4C542" },
// //     { category: "Emergency", budgeted: 200, spent: 75, color: "#8B1C22" },
// //     { category: "Income", budgeted: 2000, actual: 1670, color: "#059669" },
// //   ]);

// //   const [todoData] = useState([
// //     {
// //       id: 1,
// //       task: "Set up emergency fund",
// //       category: "Financial Goals",
// //       completed: true,
// //       priority: "high",
// //       date: "2025-06-15",
// //     },
// //     {
// //       id: 2,
// //       task: "Review investment portfolio",
// //       category: "Investments",
// //       completed: false,
// //       priority: "medium",
// //       date: "2025-06-20",
// //     },
// //     {
// //       id: 3,
// //       task: "Pay rent",
// //       category: "Bills",
// //       completed: true,
// //       priority: "high",
// //       date: "2025-06-15",
// //     },
// //     {
// //       id: 4,
// //       task: "Complete React course",
// //       category: "Education",
// //       completed: false,
// //       priority: "medium",
// //       date: "2025-06-25",
// //     },
// //     {
// //       id: 5,
// //       task: "Update budget plan",
// //       category: "Planning",
// //       completed: false,
// //       priority: "low",
// //       date: "2025-06-22",
// //     },
// //   ]);

// //   const getFilteredTransactions = () => {
// //     return transactions.filter((transaction) => {
// //       const matchesSearch =
// //         transaction.description
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase()) ||
// //         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
// //       const matchesCategory =
// //         activeCategoryFilter === "All" ||
// //         transaction.category === activeCategoryFilter;
// //       const matchesType =
// //         activeTypeFilter === "All" || transaction.type === activeTypeFilter;

// //       let matchesTime = true;
// //       if (activeTimeFilter !== "All") {
// //         const transactionDate = new Date(transaction.date);
// //         const today = new Date();
// //         const daysDiff = Math.floor(
// //           (today - transactionDate) / (1000 * 60 * 60 * 24)
// //         );

// //         switch (activeTimeFilter) {
// //           case "Today":
// //             matchesTime = daysDiff === 0;
// //             break;
// //           case "7 Days":
// //             matchesTime = daysDiff <= 7;
// //             break;
// //           case "30 Days":
// //             matchesTime = daysDiff <= 30;
// //             break;
// //           default:
// //             matchesTime = true;
// //         }
// //       }

// //       return matchesSearch && matchesCategory && matchesType && matchesTime;
// //     });
// //   };

// //   const generateInsightsData = () => {
// //     const filteredTransactions = getFilteredTransactions();

// //     // Daily spending trend
// //     const dailyData = filteredTransactions.reduce((acc, transaction) => {
// //       const date = transaction.date;
// //       if (!acc[date]) {
// //         acc[date] = { date, income: 0, expenses: 0 };
// //       }
// //       if (transaction.type === "income") {
// //         acc[date].income += transaction.amount;
// //       } else {
// //         acc[date].expenses += Math.abs(transaction.amount);
// //       }
// //       return acc;
// //     }, {});

// //     const trendData = Object.values(dailyData).sort(
// //       (a, b) => new Date(a.date) - new Date(b.date)
// //     );

// //     // Category breakdown
// //     const categoryData = filteredTransactions.reduce((acc, transaction) => {
// //       if (!acc[transaction.category]) {
// //         acc[transaction.category] = {
// //           category: transaction.category,
// //           amount: 0,
// //           color: transaction.color,
// //         };
// //       }
// //       acc[transaction.category].amount += Math.abs(transaction.amount);
// //       return acc;
// //     }, {});

// //     const pieData = Object.values(categoryData);

// //     // Budget vs Actual
// //     const budgetComparison = budgetData.map((item) => ({
// //       ...item,
// //       variance:
// //         item.category === "Income"
// //           ? item.actual - item.budgeted
// //           : item.budgeted - item.spent,
// //     }));

// //     return { trendData, pieData, budgetComparison };
// //   };

// //   const { trendData, pieData, budgetComparison } = generateInsightsData();
// //   const filteredTransactions = getFilteredTransactions();
// //   const totalIncome = filteredTransactions
// //     .filter((t) => t.type === "income")
// //     .reduce((sum, t) => sum + t.amount, 0);
// //   const totalExpenses = Math.abs(
// //     filteredTransactions
// //       .filter((t) => t.type === "expense")
// //       .reduce((sum, t) => sum + t.amount, 0)
// //   );
// //   const netBalance = totalIncome - totalExpenses;

// //   const completedTodos = todoData.filter((todo) => todo.completed).length;
// //   const todoCompletionRate = (completedTodos / todoData.length) * 100;

// //   const categories = ["All", ...new Set(transactions.map((t) => t.category))];
// //   const timeFilters = ["All", "Today", "7 Days", "30 Days"];
// //   const typeFilters = ["All", "income", "expense"];
//   // const insightFilters = [
//   //   "All",
//   //   "Spending",
//   //   "Income",
//   //   "Budget",
//   //   "Tasks",
//   //   "Goals",
//   // ];

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const renderInsightsContent = () => {
// //     return (
// //       <div className="space-y-8">
// //         {/* Key Metrics */}
// //         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(5, 150, 105, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(5, 150, 105, 0.2)" }}
// //               >
// //                 <TrendingUp className="w-6 h-6" style={{ color: "#059669" }} />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Avg Daily Spending
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#059669" }}>
// //                   ₹{(totalExpenses / 30).toFixed(0)}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(244, 197, 66, 0.2)" }}
// //               >
// //                 <Target className="w-6 h-6" style={{ color: "#F4C542" }} />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Budget Efficiency
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#F4C542" }}>
// //                   78%
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(139, 28, 34, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(139, 28, 34, 0.2)" }}
// //               >
// //                 <CheckCircle className="w-6 h-6" style={{ color: "#8B1C22" }} />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Tasks Completed
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#8B1C22" }}>
// //                   {todoCompletionRate.toFixed(0)}%
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(168, 85, 247, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(168, 85, 247, 0.2)" }}
// //               >
// //                 <Activity className="w-6 h-6" style={{ color: "#A855F7" }} />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Active Goals
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#A855F7" }}>
// //                   5
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Charts Grid */}
// //         <div className="grid lg:grid-cols-2 gap-8">
// //           {/* Spending Trend */}
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.2)",
// //             }}
// //           >
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-xl font-bold" style={{ color: "#FAFAFA" }}>
// //                 Daily Spending Trend
// //               </h3>
// //               <div className="flex items-center gap-2">
// //                 <div
// //                   className="w-3 h-3 rounded-full"
// //                   style={{ background: "#059669" }}
// //                 ></div>
// //                 <span
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Income
// //                 </span>
// //                 <div
// //                   className="w-3 h-3 rounded-full ml-4"
// //                   style={{ background: "#EF4444" }}
// //                 ></div>
// //                 <span
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Expenses
// //                 </span>
// //               </div>
// //             </div>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <ComposedChart data={trendData}>
// //                 <XAxis
// //                   dataKey="date"
// //                   tickFormatter={formatDate}
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
// //                 />
// //                 <YAxis
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
// //                 />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="income"
// //                   fill="rgba(5, 150, 105, 0.2)"
// //                   stroke="#059669"
// //                   strokeWidth={3}
// //                 />
// //                 <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
// //               </ComposedChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Category Breakdown */}
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.2)",
// //             }}
// //           >
// //             <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
// //               Spending by Category
// //             </h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <PieChart>
// //                 <Pie
// //                   data={pieData}
// //                   cx="50%"
// //                   cy="50%"
// //                   innerRadius={60}
// //                   outerRadius={120}
// //                   paddingAngle={5}
// //                   dataKey="amount"
// //                 >
// //                   {pieData.map((entry, index) => (
// //                     <Cell key={`cell-₹{index}`} fill={entry.color} />
// //                   ))}
// //                 </Pie>
// //               </PieChart>
// //             </ResponsiveContainer>
// //             <div className="grid grid-cols-2 gap-4 mt-4">
// //               {pieData.map((item, index) => (
// //                 <div key={index} className="flex items-center gap-2">
// //                   <div
// //                     className="w-3 h-3 rounded-full"
// //                     style={{ background: item.color }}
// //                   ></div>
// //                   <span
// //                     className="text-sm"
// //                     style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                   >
// //                     {item.category}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Budget vs Actual */}
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.2)",
// //             }}
// //           >
// //             <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
// //               Budget Performance
// //             </h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={budgetComparison} layout="horizontal">
// //                 <XAxis type="number" hide />
// //                 <YAxis
// //                   dataKey="category"
// //                   type="category"
// //                   width={80}
// //                   tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
// //                 />
// //                 <Bar
// //                   dataKey="budgeted"
// //                   fill="rgba(244, 197, 66, 0.3)"
// //                   radius={[0, 4, 4, 0]}
// //                 />
// //                 <Bar dataKey="spent" fill="#F4C542" radius={[0, 4, 4, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //             <div className="flex items-center justify-center gap-6 mt-4">
// //               <div className="flex items-center gap-2">
// //                 <div
// //                   className="w-3 h-3 rounded-full"
// //                   style={{ background: "rgba(244, 197, 66, 0.3)" }}
// //                 ></div>
// //                 <span
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Budgeted
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <div
// //                   className="w-3 h-3 rounded-full"
// //                   style={{ background: "#F4C542" }}
// //                 ></div>
// //                 <span
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Actual
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Task Progress */}
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.2)",
// //             }}
// //           >
// //             <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
// //               Task & Goal Progress
// //             </h3>
// //             <div className="space-y-4">
// //               {todoData.map((todo) => (
// //                 <div
// //                   key={todo.id}
// //                   className="flex items-center justify-between p-4 rounded-2xl"
// //                   style={{ background: "rgba(250, 250, 250, 0.05)" }}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div
// //                       className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ₹{todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
// //                     >
// //                       {todo.completed && (
// //                         <CheckCircle className="w-3 h-3 text-white" />
// //                       )}
// //                     </div>
// //                     <div>
// //                       <p
// //                         className={`text-sm font-medium ₹{todo.completed ? 'line-through opacity-60' : ''}`}
// //                         style={{ color: "#FAFAFA" }}
// //                       >
// //                         {todo.task}
// //                       </p>
// //                       <p
// //                         className="text-xs"
// //                         style={{ color: "rgba(250, 250, 250, 0.5)" }}
// //                       >
// //                         {todo.category}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div
// //                     className={`px-2 py-1 rounded-full text-xs ₹{
// //                     todo.priority === 'high' ? 'bg-red-500 bg-opacity-20 text-red-400' :
// //                     todo.priority === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
// //                     'bg-green-500 bg-opacity-20 text-green-400'
// //                   }`}
// //                   >
// //                     {todo.priority}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderTransactionsContent = () => {
// //     return (
// //       <div
// //         className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //         style={{
// //           background: "rgba(250, 250, 250, 0.08)",
// //           borderColor: "rgba(244, 197, 66, 0.2)",
// //         }}
// //       >
// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="text-2xl font-bold" style={{ color: "#FAFAFA" }}>
// //             Recent Transactions ({filteredTransactions.length})
// //           </h2>
// //           <div
// //             className="flex items-center gap-2 text-sm"
// //             style={{ color: "rgba(250, 250, 250, 0.6)" }}
// //           >
// //             <Calendar className="w-4 h-4" />
// //             Last 30 days
// //           </div>
// //         </div>

// //         <div className="space-y-4 max-h-96 overflow-y-auto">
// //           {filteredTransactions.length === 0 ? (
// //             <div className="text-center py-12">
// //               <div
// //                 className="p-4 rounded-2xl mx-auto w-fit mb-4"
// //                 style={{ background: "rgba(244, 197, 66, 0.1)" }}
// //               >
// //                 <Search className="w-8 h-8" style={{ color: "#F4C542" }} />
// //               </div>
// //               <p className="text-lg font-medium" style={{ color: "#FAFAFA" }}>
// //                 No transactions found
// //               </p>
// //               <p
// //                 className="text-sm"
// //                 style={{ color: "rgba(250, 250, 250, 0.6)" }}
// //               >
// //                 Try adjusting your filters or search terms
// //               </p>
// //             </div>
// //           ) : (
// //             filteredTransactions.map((transaction) => {
// //               const IconComponent = transaction.icon;
// //               return (
// //                 <div
// //                   key={transaction.id}
// //                   className="flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
// //                   style={{ background: "rgba(250, 250, 250, 0.05)" }}
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div
// //                       className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
// //                       style={{ background: `₹{transaction.color}20` }}
// //                     >
// //                       <IconComponent
// //                         className="w-6 h-6"
// //                         style={{ color: transaction.color }}
// //                       />
// //                     </div>
// //                     <div>
// //                       <h3
// //                         className="font-semibold"
// //                         style={{ color: "#FAFAFA" }}
// //                       >
// //                         {transaction.description}
// //                       </h3>
// //                       <div
// //                         className="flex items-center gap-3 text-sm"
// //                         style={{ color: "rgba(250, 250, 250, 0.6)" }}
// //                       >
// //                         <span>{transaction.merchant}</span>
// //                         <span>•</span>
// //                         <span>
// //                           {formatDate(transaction.date)} at {transaction.time}
// //                         </span>
// //                         <span
// //                           className="px-2 py-1 rounded-full text-xs"
// //                           style={{
// //                             background: `₹{transaction.color}20`,
// //                             color: transaction.color,
// //                           }}
// //                         >
// //                           {transaction.category}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <div
// //                       className={`text-lg font-bold ₹{transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}
// //                     >
// //                       {transaction.amount > 0 ? "+" : ""}₹
// //                       {Math.abs(transaction.amount).toLocaleString()}
// //                     </div>
// //                     <div
// //                       className="text-xs"
// //                       style={{ color: "rgba(250, 250, 250, 0.5)" }}
// //                     >
// //                       {transaction.type === "income" ? "Credit" : "Debit"}
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div
// //       className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden"
// //       style={{
// //         background:
// //           "linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)",
// //       }}
// //     >
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div
// //           className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
// //           style={{
// //             background:
// //               "radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)",
// //           }}
// //         ></div>
// //         <div
// //           className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
// //           style={{
// //             background:
// //               "radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)",
// //           }}
// //         ></div>
// //       </div>

// //       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
// //         {/* Header */}
// //         {/* <FinancialInsightsHeader /> */}
// //         <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl mt-8 md:mt-12" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center gap-4">
// //               <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                 {activeView === 'insights' ? <BarChart3 className="w-8 h-8 text-white" /> : <RefreshCw className="w-8 h-8 text-white" />}
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
// //                   {activeView === 'insights' ? 'Financial Insights' : 'Transaction History'}
// //                   <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#F4C542'}} />
// //                 </h1>
// //                 <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
// //                   {activeView === 'insights' ? 'Analyze your financial patterns and goals' : 'Track all your financial activities'}
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setActiveView(activeView === 'insights' ? 'transactions' : 'insights')}
// //                 className="flex items-center gap-2 px-4 py-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300"
// //                 style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}
// //               >
// //                 {activeView === 'insights' ? <RefreshCw className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
// //                 <span>{activeView === 'insights' ? 'Transactions' : 'Insights'}</span>
// //               </button>
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <Download className="w-5 h-5" />
// //               </button>
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <Eye className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Summary Cards */}
// //         <div className="grid md:grid-cols-3 gap-6 mb-8">
// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(5, 150, 105, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(5, 150, 105, 0.2)" }}
// //               >
// //                 <ArrowDownLeft
// //                   className="w-6 h-6"
// //                   style={{ color: "#059669" }}
// //                 />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Total Income
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#059669" }}>
// //                   +₹{totalIncome.toLocaleString()}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(239, 68, 68, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(239, 68, 68, 0.2)" }}
// //               >
// //                 <ArrowUpRight
// //                   className="w-6 h-6"
// //                   style={{ color: "#EF4444" }}
// //                 />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Total Expenses
// //                 </p>
// //                 <p className="text-2xl font-bold" style={{ color: "#EF4444" }}>
// //                   -₹{totalExpenses.toLocaleString()}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
// //             style={{
// //               background: "rgba(250, 250, 250, 0.08)",
// //               borderColor: "rgba(244, 197, 66, 0.3)",
// //             }}
// //           >
// //             <div className="flex items-center gap-4">
// //               <div
// //                 className="p-3 rounded-2xl"
// //                 style={{ background: "rgba(244, 197, 66, 0.2)" }}
// //               >
// //                 <TrendingUp className="w-6 h-6" style={{ color: "#F4C542" }} />
// //               </div>
// //               <div>
// //                 <p
// //                   className="text-sm"
// //                   style={{ color: "rgba(250, 250, 250, 0.7)" }}
// //                 >
// //                   Net Balance
// //                 </p>
// //                 <p
// //                   className={`text-2xl font-bold ₹{netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}
// //                 >
// //                   {netBalance >= 0 ? "+" : ""}₹{netBalance.toLocaleString()}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters and Search */}
// //         <div
// //           className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl"
// //           style={{
// //             background: "rgba(250, 250, 250, 0.08)",
// //             borderColor: "rgba(244, 197, 66, 0.2)",
// //           }}
// //         >
// //           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
// //             {/* Search */}
// //             <div className="relative flex-1 max-w-md">
// //               <Search
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
// //                 style={{ color: "rgba(250, 250, 250, 0.5)" }}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Search transactions..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
// //                 style={{
// //                   background: "rgba(250, 250, 250, 0.1)",
// //                   borderColor: "rgba(244, 197, 66, 0.3)",
// //                   color: "#FAFAFA",
// //                 }}
// //               />
// //             </div>

// //             {/* Filter Toggle */}
// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105"
// //               style={{
// //                 background: showFilters
// //                   ? "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)"
// //                   : "rgba(250, 250, 250, 0.1)",
// //                 borderColor: "rgba(244, 197, 66, 0.3)",
// //                 color: showFilters ? "#FFFFFF" : "#FAFAFA",
// //               }}
// //             >
// //               <Filter className="w-5 h-5" />
// //               <span>Filters</span>
// //               <ChevronDown
// //                 className={`w-4 h-4 transition-transform duration-300 ₹{showFilters ? 'rotate-180' : ''}`}
// //               />
// //             </button>
// //           </div>

// //           {/* Filter Options */}
// //           {showFilters && (
// //             <div
// //               className="mt-6 grid md:grid-cols-4 gap-4 pt-6 border-t"
// //               style={{ borderColor: "rgba(244, 197, 66, 0.2)" }}
// //             >
// //               {/* Time Filter */}
// //               <div>
// //                 <label
// //                   className="block text-sm font-medium mb-2"
// //                   style={{ color: "#FAFAFA" }}
// //                 >
// //                   Time Period
// //                 </label>
// //                 <select
// //                   value={activeTimeFilter}
// //                   onChange={(e) => setActiveTimeFilter(e.target.value)}
// //                   className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
// //                   style={{
// //                     background: "rgba(250, 250, 250, 0.1)",
// //                     borderColor: "rgba(244, 197, 66, 0.3)",
// //                     color: "#FAFAFA",
// //                   }}
// //                 >
// //                   {timeFilters.map((filter) => (
// //                     <option
// //                       key={filter}
// //                       value={filter}
// //                       style={{ background: "#1A4B35", color: "#FAFAFA" }}
// //                     >
// //                       {filter}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Category Filter */}
// //               <div>
// //                 <label
// //                   className="block text-sm font-medium mb-2"
// //                   style={{ color: "#FAFAFA" }}
// //                 >
// //                   Category
// //                 </label>
// //                 <select
// //                   value={activeCategoryFilter}
// //                   onChange={(e) => setCategoryFilter(e.target.value)}
// //                   className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
// //                   style={{
// //                     background: "rgba(250, 250, 250, 0.1)",
// //                     borderColor: "rgba(244, 197, 66, 0.3)",
// //                     color: "#FAFAFA",
// //                   }}
// //                 >
// //                   {categories.map((category) => (
// //                     <option
// //                       key={category}
// //                       value={category}
// //                       style={{ background: "#1A4B35", color: "#FAFAFA" }}
// //                     >
// //                       {category}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Type Filter */}
// //               <div>
// //                 <label
// //                   className="block text-sm font-medium mb-2"
// //                   style={{ color: "#FAFAFA" }}
// //                 >
// //                   Type
// //                 </label>
// //                 <select
// //                   value={activeTypeFilter}
// //                   onChange={(e) => setTypeFilter(e.target.value)}
// //                   className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
// //                   style={{
// //                     background: "rgba(250, 250, 250, 0.1)",
// //                     borderColor: "rgba(244, 197, 66, 0.3)",
// //                     color: "#FAFAFA",
// //                   }}
// //                 >
// //                   {typeFilters.map((type) => (
// //                     <option
// //                       key={type}
// //                       value={type}
// //                       style={{ background: "#1A4B35", color: "#FAFAFA" }}
// //                     >
// //                       {type === "All"
// //                         ? "All Types"
// //                         : type.charAt(0).toUpperCase() + type.slice(1)}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Insight Filter - Only show in insights view */}
// //               {activeView === "insights" && (
// //                 <div>
// //                   <label
// //                     className="block text-sm font-medium mb-2"
// //                     style={{ color: "#FAFAFA" }}
// //                   >
// //                     Insight Type
// //                   </label>
// //                   <select
// //                     value={activeInsightFilter}
// //                     onChange={(e) => setInsightFilter(e.target.value)}
// //                     className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
// //                     style={{
// //                       background: "rgba(250, 250, 250, 0.1)",
// //                       borderColor: "rgba(244, 197, 66, 0.3)",
// //                       color: "#FAFAFA",
// //                     }}
// //                   >
// //                     {insightFilters.map((filter) => (
// //                       <option
// //                         key={filter}
// //                         value={filter}
// //                         style={{ background: "#1A4B35", color: "#FAFAFA" }}
// //                       >
// //                         {filter}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Main Content - Switch between Insights and Transactions */}
// //         {activeView === "insights"
// //           ? renderInsightsContent()
// //           : renderTransactionsContent()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FinancialInsightsDashboard;
