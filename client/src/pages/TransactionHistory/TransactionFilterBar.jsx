import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const TransactionFilterBar = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  activeTimeFilter,
  setActiveTimeFilter,
  activeCategoryFilter,
  setCategoryFilter,
  activeTypeFilter,
  setTypeFilter,
  timeFilters,
  categories,
  typeFilters,
}) => {
  return (
    <div
      className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
      }}
    >
      {/* Search and Toggle */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              borderColor: "rgba(244, 197, 66, 0.3)",
              color: "#FAFAFA",
            }}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105"
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
            className={`w-4 h-4 transition-transform duration-300 ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div
          className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t"
          style={{ borderColor: "rgba(244, 197, 66, 0.2)" }}
        >
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Time Period
            </label>
            <select
              value={activeTimeFilter}
              onChange={(e) => setActiveTimeFilter(e.target.value)}
              className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
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

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Category
            </label>
            <select
              value={activeCategoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  style={{ background: "#1A4B35", color: "#FAFAFA" }}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Type
            </label>
            <select
              value={activeTypeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
            >
              {typeFilters.map((type) => (
                <option
                  key={type}
                  value={type}
                  style={{ background: "#1A4B35", color: "#FAFAFA" }}
                >
                  {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilterBar;
