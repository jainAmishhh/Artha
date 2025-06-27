import React from "react";

const TimeFilters = ({ activeTimeFilter, setActiveTimeFilter }) => {
  const filters = ["1D", "1W", "1M", "1Y"];

  return (
    <div className="flex justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveTimeFilter(filter)}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
            activeTimeFilter === filter
              ? "text-white shadow-lg transform scale-105"
              : "hover:text-white"
          }`}
          style={
            activeTimeFilter === filter
              ? {
                  background: "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
                  boxShadow: "0 8px 25px rgba(244, 197, 66, 0.3)",
                }
              : {
                  background: "rgba(250, 250, 250, 0.08)",
                  color: "rgba(250, 250, 250, 0.7)",
                }
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TimeFilters;
