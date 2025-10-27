import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#A78BFA", "#F472B6"];

const CategoryBreakdownChart = ({ data = [] }) => {
  // Safe fallback if `data` is not an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white/5 rounded-3xl p-6 shadow-xl text-white w-full max-w-xl">
      <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
      {safeData.length === 0 ? (
        <p className="text-white/50">No category data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={safeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
              nameKey="category"
            >
              {safeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryBreakdownChart;


// import React from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";

// const BudgetPerformanceChart = ({ budgetComparison }) => {
//   return (
//     <div
//       className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//       style={{
//         background: "rgba(250, 250, 250, 0.08)",
//         borderColor: "rgba(244, 197, 66, 0.2)",
//       }}
//     >
//       <h3 className="text-xl font-bold text-white mb-6">Budget Performance</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={budgetComparison} layout="horizontal">
//           <XAxis type="number" hide />
//           <YAxis
//             dataKey="category"
//             type="category"
//             tick={{ fill: "white", fontSize: 12 }}
//             width={80}
//           />
//           <Bar
//             dataKey="budgeted"
//             fill="rgba(244, 197, 66, 0.3)"
//             radius={[0, 4, 4, 0]}
//           />
//           <Bar dataKey="spent" fill="#F4C542" radius={[0, 4, 4, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BudgetPerformanceChart;
