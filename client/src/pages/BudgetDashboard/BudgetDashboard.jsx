// How Frontend Will Connect

// Create Budget
// axios.post("/api/budget/create", {
//   category,
//   name,
//   budget,
//   spentAmount,
//   colorTheme,
//   icon
// });

// Fetch Budgets
// axios.get("/api/budget/all");

// Update Budget
// axios.put(`/api/budget/${id}`, updatedItem);

// Delete Budget
// axios.delete(`/api/budget/${id}`);

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  BookOpen,
  Home,
  Plus,
  Wallet,
  Edit2,
  Trash2,
  X,
  BarChart3,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Utensils,
  Car,
  Heart,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import axios from "../../api/axios";

const BudgetDashboard = () => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const [chartData, setChartData] = useState([]);
  const [activeTimeFilter, setActiveTimeFilter] = useState("1Y");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "",
    budgetName: "",
    date: "",
    budget: "",
    spentAmount: "",
    icon: "",
    colorTheme: "emerald",
  });

  const iconOptions = [
    { icon: BookOpen, name: "Education" },
    { icon: AlertTriangle, name: "Emergency" },
    { icon: Home, name: "Housing" },
    { icon: ShoppingCart, name: "Shopping" },
    { icon: Utensils, name: "Food" },
    { icon: Car, name: "Transport" },
    { icon: Heart, name: "Health" },
  ];

  const colorOptions = [
    {
      name: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      hex: "#10b981",
    },
    { name: "blue", gradient: "from-blue-500 to-blue-600", hex: "#3b82f6" },
    {
      name: "purple",
      gradient: "from-purple-500 to-purple-600",
      hex: "#a855f7",
    },
    { name: "rose", gradient: "from-rose-500 to-rose-600", hex: "#f43f5e" },
    { name: "amber", gradient: "from-amber-500 to-amber-600", hex: "#f59e0b" },
    { name: "cyan", gradient: "from-cyan-500 to-cyan-600", hex: "#06b6d4" },
  ];

  // Chart data for different time filters
  const timeFilterData = {
    "1D": [
      { name: "6AM", value: 380, budget: 500 },
      { name: "12PM", value: 420, budget: 500 },
      { name: "6PM", value: 400, budget: 500 },
      { name: "12AM", value: 450, budget: 500 },
    ],
    "1W": [
      { name: "Mon", value: 200, budget: 450 },
      { name: "Tue", value: 350, budget: 450 },
      { name: "Wed", value: 300, budget: 450 },
      { name: "Thu", value: 400, budget: 450 },
      { name: "Fri", value: 350, budget: 450 },
      { name: "Sat", value: 400, budget: 450 },
      { name: "Sun", value: 320, budget: 450 },
    ],
    "1M": [
      { name: "Week 1", value: 100, budget: 400 },
      { name: "Week 2", value: 250, budget: 400 },
      { name: "Week 3", value: 200, budget: 400 },
      { name: "Week 4", value: 350, budget: 400 },
    ],
    "1Y": [
      { name: "Feb", value: 300, budget: 600 },
      { name: "Mar", value: 150, budget: 600 },
      { name: "Apr", value: 400, budget: 600 },
      { name: "May", value: 200, budget: 600 },
      { name: "Jun", value: 600, budget: 600 },
      { name: "Jul", value: 400, budget: 600 },
    ],
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/budgets");
      setBudgetItems(response.data.data);
    } catch (error) {
      console.log("Error fetching budgets:", error);
      alert("Failed to fetch budgets");
    } finally {
      setLoading(false);
    }
  };

  const createBudgetItem = async () => {
    try {
      setLoading(true);

      const IconComponent =
        iconOptions.find((opt) => opt.name === newItem.category)?.icon ||
        BookOpen;

      const response = await axios.post("/api/budgets", {
        category: newItem.category,
        budgetName: newItem.budgetName,
        budgetAmount: Number(newItem.budget),
        spentAmount: Number(newItem.spentAmount),
        colorTheme: newItem.colorTheme,
        icon: IconComponent.name, // backend expects string, not component
      });

      setBudgetItems((prev) => [response.data.data, ...prev]);

      setShowModal(false);

      setNewItem({
        category: "",
        budgetName: "",
        budget: "",
        spentAmount: "",
        colorTheme: "emerald",
      });
    } catch (error) {
      console.error("Error creating budget:", error);
      alert("Error creating budget");
    } finally {
      setLoading(false);
    }
  };

  // const createBudgetItem = async (data) => {
  //   try {
  //     const response = await axios.post(`${backendURL}/api/budget/create`, {
  //       category,
  //       name,
  //       budget,
  //       spentAmount,
  //       remaining: budget - spentAmount,
  //       percentageSpent: Math.min(Math.round((spentAmount / budget) * 100), 100),
  //       colorTheme,
  //       icon,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching budget:", error);
  //     alert("Error creating Budget");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const handleRemoveItem = async (id) => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`/api/budgets/${id}`);
  //     setBudgetItems((prev) => prev.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.error("Error deleting budget:", error);
  //     alert("Failed deleting budget");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`/api/budgets/${id}`);
      setBudgetItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Failed deleting budget");
    } finally {
      setLoading(false);
    }
  };
  // const handleRemoveItem = (id) => {
  //   const updated = budgetItems.filter((item) => item.id !== id);
  //   setBudgetItems(updated);
  // };

  const handleAddNewItem = () => {
    if (!newItem.budgetName || !newItem.budget || !newItem.spentAmount) return;

    const IconComponent =
      iconOptions.find((opt) => opt.budgetName === newItem.category)?.icon ||
      BookOpen;
    const item = createBudgetItem(
      newItem.category,
      newItem.budgetName,
      Date.now(),
      Number(newItem.budget),
      Number(newItem.spentAmount),
      IconComponent,
      newItem.colorTheme
    );

    setBudgetItems((prev) => [...prev, item]);
    setNewItem({
      category: "",
      budgetName: "",
      budget: "",
      spentAmount: "",
      icon: "",
      colorTheme: "emerald",
    });
    setShowModal(false);
  };

  const handleEditItem = async () => {
    if (!editingItem) return;

    try {
      setLoading(true);

      const updatedPayload = {
        category: editingItem.category,
        budgetName: editingItem.budgetName,
        budgetAmount: editingItem.budgetAmount,
        spentAmount: editingItem.spentAmount,
        colorTheme: editingItem.colorTheme,
        icon: editingItem.icon,
      };

      const response = await axios.put(`/api/budgets/${editingItem._id}`, updatedPayload);

      const updated = response.data.data;;

      setBudgetItems((prev) => prev.map((item) => (item._id === updated._id? updated: item)));

      setEditingItem(null);
      setShowModal(false);
    } catch (error) {
      console.error("Failed editing budget");
      alert("Failed editing Budget.");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setNewItem({
      category: "Education",
      budgetName: "",
      budget: "",
      spentAmount: "",
      colorTheme: "emerald",
    });
    setShowModal(true);
  };

  useEffect(() => {
    setChartData(timeFilterData[activeTimeFilter]);
  }, [activeTimeFilter]);

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;

  const getColorClasses = (color) => {
    const colorThemeMap = {
      emerald: {
        bg: "bg-emerald-500",
        text: "text-emerald-600",
        gradient: "from-emerald-500 to-emerald-600",
      },
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-600",
        gradient: "from-blue-500 to-blue-600",
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-600",
        gradient: "from-purple-500 to-purple-600",
      },
      rose: {
        bg: "bg-rose-500",
        text: "text-rose-600",
        gradient: "from-rose-500 to-rose-600",
      },
      amber: {
        bg: "bg-amber-500",
        text: "text-amber-600",
        gradient: "from-amber-500 to-amber-600",
      },
      cyan: {
        bg: "bg-cyan-500",
        text: "text-cyan-600",
        gradient: "from-cyan-500 to-cyan-600",
      },
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
              <Wallet className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Budget Dashboard
              </h1>
              <p className="text-slate-600">
                Track and manage your spending goals
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <DollarSign className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Total Budget
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-800">
                  ₹{totalBudget.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-rose-100 rounded-xl">
                    <CreditCard className="text-rose-600" size={20} />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Total Spent
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-800">
                  ₹{totalSpent.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {Math.round((totalSpent / totalBudget) * 100)}% of budget
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Wallet className="text-blue-600" size={20} />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Remaining
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-800">
                  ₹{totalRemaining.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  Available to spend
                </p>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-emerald-600" size={20} />
                  <h3 className="text-lg font-bold text-slate-800">
                    Spending Analytics
                  </h3>
                </div>

                {/* Time Filters */}
                <div className="flex gap-2">
                  {["1D", "1W", "1M", "1Y"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveTimeFilter(filter)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        activeTimeFilter === filter
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorBudget"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="budget"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#colorBudget)"
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Spent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Budget</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Cards Column */}
          <div className="flex flex-col gap-4">
            {budgetItems.map((item) => {
              const Icon = item.icon;
              const colors = getColorClasses(item.color);
              const isOverBudget = item.percentageSpent >= 100;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 bg-gradient-to-br ${colors.gradient} rounded-xl shadow-lg`}
                      >
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">
                          {item.budgetName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowModal(true);
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} className="text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} className="text-rose-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Spent</span>
                      <span className="font-bold text-slate-800">
                        ₹{item.spentAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Budget</span>
                      <span className="font-bold text-slate-800">
                        ₹{item.budgetAmount.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOverBudget
                              ? "bg-gradient-to-r from-rose-500 to-rose-600"
                              : `bg-gradient-to-r ${colors.gradient}`
                          }`}
                          style={{
                            width: `${Math.min(item.percentageSpent, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`text-xs font-semibold ${
                            isOverBudget ? "text-rose-600" : colors.text
                          }`}
                        >
                          {item.percentageSpent}% used
                        </span>
                        <span className="text-xs text-slate-600">
                          ₹{item.remaining.toLocaleString()} left
                        </span>
                      </div>
                    </div>

                    {isOverBudget && (
                      <div className="flex items-center gap-2 p-2 bg-rose-50 border border-rose-200 rounded-lg">
                        <AlertTriangle size={14} className="text-rose-600" />
                        <span className="text-xs text-rose-700 font-medium">
                          Over budget!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add New Card */}
            <button
              onClick={openAddModal}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-dashed border-emerald-300 rounded-2xl p-8 hover:border-emerald-400 hover:from-emerald-100 hover:to-emerald-200 transition-all group"
            >
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <p className="font-bold text-slate-800">Add New Budget</p>
                <p className="text-sm text-slate-600 mt-1">
                  Create a new budget category
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingItem ? "Edit Budget" : "Add New Budget"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={editingItem ? editingItem.category : newItem.category}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      });
                    } else {
                      setNewItem({ ...newItem, category: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.budgetName} value={opt.budgetName}>
                      {opt.budgetName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Budget Name
                </label>
                <input
                  type="text"
                  value={editingItem ? editingItem.budgetName : newItem.budgetName}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, budgetName: e.target.value });
                    } else {
                      setNewItem({ ...newItem, budgetName: e.target.value });
                    }
                  }}
                  placeholder="e.g., Monthly Groceries"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Budget Amount (₹)
                </label>
                <input
                  type="number"
                  value={editingItem ? editingItem.budget : newItem.budget}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({
                        ...editingItem,
                        budget: e.target.value,
                      });
                    } else {
                      setNewItem({ ...newItem, budget: e.target.value });
                    }
                  }}
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Amount Spent (₹)
                </label>
                <input
                  type="number"
                  value={editingItem ? editingItem.spentAmount : newItem.spentAmount}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, spentAmount: e.target.value });
                    } else {
                      setNewItem({ ...newItem, spentAmount: e.target.value });
                    }
                  }}
                  placeholder="2500"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        if (editingItem) {
                          setEditingItem({ ...editingItem, color: color.name });
                        } else {
                          setNewItem({ ...newItem, color: color.name });
                        }
                      }}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                        color.gradient
                      } shadow-lg hover:scale-110 transition-transform ${
                        (editingItem ? editingItem.color : newItem.color) ===
                        color.name
                          ? "ring-2 ring-offset-2 ring-slate-400"
                          : ""
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingItem ? handleEditItem : createBudgetItem}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all"
              >
                {editingItem ? "Save Changes" : "Add Budget"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetDashboard;
