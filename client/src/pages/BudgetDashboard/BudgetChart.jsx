import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";

const BudgetChart = ({ chartData }) => {
  return (
    <div className="relative h-80 mb-6">
      <div
        className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
        style={{
          background: "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
        }}
      >
        ₹{chartData[chartData.length - 1]?.value || 0}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F4C542" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F4C542" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#FAFAFA", fontSize: 12, opacity: 0.8 }}
          />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#F4C542"
            strokeWidth={4}
            fill="url(#colorGradient)"
            dot={{
              fill: "#F4C542",
              strokeWidth: 3,
              stroke: "#FAFAFA",
              r: 6,
            }}
            activeDot={{
              r: 8,
              stroke: "#FAFAFA",
              strokeWidth: 3,
              fill: "#F4C542",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
