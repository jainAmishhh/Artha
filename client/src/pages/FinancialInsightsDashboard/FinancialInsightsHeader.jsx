import React, { useState } from "react";
import { BarChart3, Download, Eye, RefreshCw, Sparkles } from "lucide-react";

const FinancialInsightsHeader = ({ activeView, setActiveView }) => {
  // const [activeView, setActiveView] = useState("insights");
  return (
    <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#f4c54233] rounded-3xl p-6 mb-8 shadow-2xl mt-8 md:mt-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-[#F4C542] to-[#E6B73A] p-3 rounded-2xl shadow-lg">
            {activeView === "insights" ? ( <BarChart3 className="w-8 h-8 text-white" /> ) : ( <RefreshCw className="w-8 h-8 text-white" /> )}
          </div>
          <div>
            <h1 className="text-[#fafafa] text-3xl font-bold flex items-center gap-2">
              {activeView === "insights" ? "Financial Insights" : "Transaction History"}
              <Sparkles className="text-[#f4c542] w-6 h-6 animate-pulse" />
            </h1>
            <p className="text-[#fafafa99] text-sm">
              {activeView === "insights" ? "Analyze your financial patterns and goals" : "Track all your financial activities"}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveView(activeView === "insights" ? "transactions" : "insights")}
            className="bg-[#fafafa14] text-[#fafafa] flex items-center gap-2 px-4 py-3 backdrop-blur-xl border border-[#f4c54233] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {activeView === "insights" ? ( <RefreshCw className="w-5 h-5" /> ) : ( <BarChart3 className="w-5 h-5" /> )}
            <span>
              {activeView === "insights" ? "Transactions" : "Insights"}
            </span>
          </button>
          <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54233] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
            <Download className="w-5 h-5" />{" "}
          </button>
          <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54233] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
            <Eye className="w-5 h-5" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsightsHeader;
