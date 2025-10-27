import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import React from "react";

const SummaryCard = ({ totalIncome, totalExpenses, netBalance }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* 1st card */}
      <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#0596694d] rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-[#05966933] p-3 rounded-2xl">
            <ArrowDownLeft className="w-6 h-6" style={{ color: "#059669" }} />
          </div>
          <div>
            <p className=" text-[#fafafab3] text-sm">Total Income</p>
            <p className="text-2xl font-bold" style={{ color: "#059669" }}>
              +₹{totalIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* 2nd card */}
      <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#ef44444d] rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#ef444433]">
            <ArrowUpRight className="w-6 h-6 text-[#ef4444]" />
          </div>
          <div>
            <p className="text-[#fafafab3] text-sm">Total Expenses</p>
            <p className="text-2xl font-bold text-[#ef4444]">
              -₹{totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* 3rd card  */}
      <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#f4c5424d] rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-[#f4c54233] p-3 rounded-2xl">
            <TrendingUp className="text-[#f4c542] w-6 h-6" />
          </div>
          <div>
            <p className="text-[#fafafab3] text-sm">Net Balance</p>
            <p
              className={`text-2xl font-bold ${
                netBalance >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {netBalance >= 0 ? "+" : "-"}₹{netBalance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
