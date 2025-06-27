import React from "react";
import { Search, Sparkles, SquarePen } from "lucide-react";
import { LuBadgeIndianRupee } from "react-icons/lu";

const BudgetHeader = () => {
  return (
    <div className="bg-[rgba(250,250,250,0.08)] border border-[#f4c54233] backdrop-blur-2xl rounded-3xl p-6 mb-8 shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-[linear-gradient(135deg,_#F4C542_0%,_#E6B73A_100%)] p-3 rounded-2xl shadow-lg">
            <LuBadgeIndianRupee className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-[#fafafa]">
              Budget Dashboard
              <Sparkles className="w-6 h-6 animate-pulse text-[#f4c542]" />
            </h1>
            <p className="text-sm text-[#fafafa99]">
              Manage your finances intelligently
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.08)",
              borderColor: "rgba(244, 197, 66, 0.2)",
              color: "#FAFAFA",
            }}
          >
            {" "}
            <SquarePen />{" "}
          </button>
          <button
            className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.08)",
              borderColor: "rgba(244, 197, 66, 0.2)",
              color: "#FAFAFA",
            }}
          >
            {" "}
            <Search className="w-5 h-5" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetHeader;
