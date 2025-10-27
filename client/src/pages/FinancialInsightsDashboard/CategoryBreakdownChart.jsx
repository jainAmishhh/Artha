import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CategoryBreakdownChart = ({ pieData }) => {
  return (
    <div
      className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
      }}
    >
      <h3 className="text-xl font-bold text-white mb-6">
        Spending by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            dataKey="amount"
            paddingAngle={5}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: item.color }}
            ></div>
            <span className="text-sm text-white/70">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
