import React from "react";
import { TrendingUp } from "lucide-react";

const TotalBudgetDisplay = ({ totalBudget, totalRemaining }) => {
  return (
    <div className="text-center mb-8">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
        style={{ background: "rgba(244, 197, 66, 0.15)" }}
      >
        <TrendingUp className="w-4 h-4" style={{ color: "#F4C542" }} />
        <span
          className="text-sm font-medium uppercase tracking-wider"
          style={{ color: "#F4C542" }}
        >
          Total Budget (₹)
        </span>
      </div>
      <div
        className="text-6xl font-bold mb-2"
        style={{
          background: "linear-gradient(135deg, #F4C542 0%, #FAFAFA 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ₹ {totalBudget.toLocaleString()}.00
      </div>
      <div
        className="flex items-center justify-center gap-2 text-lg font-semibold"
        style={{ color: "#F4C542" }}
      >
        <TrendingUp className="w-5 h-5" />
        <span>Remaining: ₹{totalRemaining.toLocaleString()}.00</span>
      </div>
    </div>
  );
};

export default TotalBudgetDisplay;
