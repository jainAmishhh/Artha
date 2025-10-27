import React, { useState } from "react";
import { ChevronDown, Filter, Search } from "lucide-react";

const FinancialInsightFilterBar = ({ transactions, activeView, filters, setFilters }) => {
  // const [activeView, setActiveView] = useState("insights");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState("All");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const [activeInsightFilter, setActiveInsightFilter] = useState("All");

  const timeFilters = ["All", "Today", "7 Days", "30 Days"];
  const categoryFilter = [
    "All",
    ...new Set(transactions.map((t) => t.category)),
  ];
  const typeFilters = ["All", "Income", "Expense"];
  const insightFilters = ["All", "Spending", "Income", "Budget", "Tasks", "Goals"];

  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategoryFilter === "All" ||
        transaction.category === activeCategoryFilter;

      const matchesType =
        activeTypeFilter === "All" || transaction.type === activeTypeFilter;

      let matchesTime = true;
      if (activeTimeFilter !== "All") {
        const transactionDate = new Date(transaction.date);
        const today = new Date();
        const daysDiff = Math.floor(
          (today - transactionDate) / (1000 * 60 * 60 * 24)
        );

        switch (activeTimeFilter) {
          case "Today":
            matchesTime = daysDiff === 0;
            break;

          case "7 days":
            matchesTime = daysDiff <= 7;
            break;

          case "30 Days":
            matchesTime = daysDiff <= 30;
            break;

          default:
            matchesTime = true;
        }
      }
      return matchesSearch && matchesCategory && matchesType && matchesTime;
    });
  };

  return (
    <div
      className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "rgba(250, 250, 250, 0.5)" }}
          />
          <input
            type="text"
  value={filters.search}
  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
  placeholder="Search data..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              borderColor: "rgba(244, 197, 66, 0.3)",
              color: "#FAFAFA",
            }}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105 scroll-smooth"
          style={{
            background: showFilters
              ? "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)"
              : "rgba(250, 250, 250, 0.1)",
            borderColor: "rgba(244, 197, 66, 0.3)",
            color: showFilters ? "#FFFFFF" : "#FAFAFA",
          }}
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ₹{showFilters ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div
          className="w-full mt-6 grid md:grid-cols-4 gap-4 pt-6 border-t"
          style={{ borderColor: "rgba(244, 197, 66, 0.2)" }}
        >
          {/* Time Filter  */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#FAFAFA" }}
            >
              Time Period
            </label>
            <select
              value={filters.time}
  onChange={(e) => setFilters({ ...filters, time: e.target.value })}
              className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300 outline-none"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
            >
              {timeFilters.map((filter) => (
                <option
                  key={filter}
                  value={filter}
                  style={{ background: "#1A4B35", color: "#FAFAFA" }}
                >
                  {filter}
                </option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#FAFAFA" }}
            >
              Category
            </label>
            <select
              value={filters.time}
  onChange={(e) => setFilters({ ...filters, time: e.target.value })}
              className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300 outline-none"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
            >
              {categoryFilter.map((filter) => (
                <option
                  key={filter}
                  value={filter}
                  style={{ background: "#1A4B35", color: "#FAFAFA" }}
                >
                  {filter}
                </option>
              ))}
            </select>
          </div>

          {/* Types */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#FAFAFA" }}
            >
              Type
            </label>
            <select
              value={filters.time}
  onChange={(e) => setFilters({ ...filters, time: e.target.value })}
  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300 outline-none"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
            >
              {typeFilters.map((filter) => (
                <option
                  key={filter}
                  value={filter}
                  style={{ background: "#1A4B35", color: "#FAFAFA" }}
                >
                  {filter}
                </option>
              ))}
            </select>
          </div>

          {/* Insight Filter - Only show in insights view */}
          {activeView === "insights" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#FAFAFA" }}
              >
                Insights
              </label>
              <select
                value={filters.time}
  onChange={(e) => setFilters({ ...filters, time: e.target.value })}
  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300 outline-none"
                style={{
                  background: "rgba(250, 250, 250, 0.1)",
                  borderColor: "rgba(244, 197, 66, 0.3)",
                  color: "#FAFAFA",
                }}
              >
                {insightFilters.map((filter) => (
                  <option
                    key={filter}
                    value={filter}
                    style={{ background: "#1A4B35", color: "#FAFAFA" }}
                  >
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialInsightFilterBar;
