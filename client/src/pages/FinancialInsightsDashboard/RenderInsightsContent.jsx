// import React from "react";
// import { TrendingUp, Target, CheckCircle, Activity, PieChart as PieChartIcon, } from "lucide-react";
// import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Area, Bar, PieChart, Pie, Cell, BarChart } from "recharts";

// const RenderInsightsContent = ({
//   trendData,
//   pieData,
//   budgetComparison,
//   totalExpenses,
//   todoData,
//   todoCompletionRate,
//   formatDate,
// }) => {
//   return (
//     <div className="space-y-8">
//       {/* Key Metrics */}
//       <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
//         {[
//           {
//             icon: <TrendingUp className="w-6 h-6" style={{ color: "#059669" }} />,
//             label: "Avg Daily Spending",
//             value: `₹${(totalExpenses / 30).toFixed(0)}`,
//             bg: "rgba(5, 150, 105, 0.2)",
//             border: "rgba(5, 150, 105, 0.3)",
//           },
//           {
//             icon: <Target className="w-6 h-6" style={{ color: "#F4C542" }} />,
//             label: "Budget Efficiency",
//             value: "78%",
//             bg: "rgba(244, 197, 66, 0.2)",
//             border: "rgba(244, 197, 66, 0.3)",
//           },
//           {
//             icon: <CheckCircle className="w-6 h-6" style={{ color: "#8B1C22" }} />,
//             label: "Tasks Completed",
//             value: `${todoCompletionRate.toFixed(0)}%`,
//             bg: "rgba(139, 28, 34, 0.2)",
//             border: "rgba(139, 28, 34, 0.3)",
//           },
//           {
//             icon: <Activity className="w-6 h-6" style={{ color: "#A855F7" }} />,
//             label: "Active Goals",
//             value: "5",
//             bg: "rgba(168, 85, 247, 0.2)",
//             border: "rgba(168, 85, 247, 0.3)",
//           },
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//             style={{ background: "rgba(250, 250, 250, 0.08)", borderColor: card.border }}
//           >
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-2xl" style={{ background: card.bg }}>
//                 {card.icon}
//               </div>
//               <div>
//                 <p className="text-sm text-white/70">{card.label}</p>
//                 <p className="text-2xl font-bold text-white">{card.value}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Daily Trend */}
//         <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//           style={{ background: "rgba(250, 250, 250, 0.08)", borderColor: "rgba(244, 197, 66, 0.2)" }}
//         >
//           <h3 className="text-xl font-bold text-white mb-6">Daily Spending Trend</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={trendData}>
//               <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#ddd" }} />
//               <YAxis tick={{ fill: "#ddd" }} />
//               <Area dataKey="income" fill="rgba(5, 150, 105, 0.2)" stroke="#059669" strokeWidth={3} />
//               <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category Pie Chart */}
//         <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//           style={{ background: "rgba(250, 250, 250, 0.08)", borderColor: "rgba(244, 197, 66, 0.2)" }}
//         >
//           <h3 className="text-xl font-bold text-white mb-6">Spending by Category</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="amount">
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="grid grid-cols-2 gap-4 mt-4">
//             {pieData.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
//                 <span className="text-sm text-white/70">{item.category}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Budget Chart */}
//         <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//           style={{ background: "rgba(250, 250, 250, 0.08)", borderColor: "rgba(244, 197, 66, 0.2)" }}
//         >
//           <h3 className="text-xl font-bold text-white mb-6">Budget Performance</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={budgetComparison} layout="horizontal">
//               <XAxis type="number" hide />
//               <YAxis dataKey="category" type="category" width={80} tick={{ fill: "#ddd" }} />
//               <Bar dataKey="budgeted" fill="rgba(244, 197, 66, 0.3)" radius={[0, 4, 4, 0]} />
//               <Bar dataKey="spent" fill="#F4C542" radius={[0, 4, 4, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Task Progress */}
//         <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//           style={{ background: "rgba(250, 250, 250, 0.08)", borderColor: "rgba(244, 197, 66, 0.2)" }}
//         >
//           <h3 className="text-xl font-bold text-white mb-6">Task & Goal Progress</h3>
//           <div className="space-y-4">
//             {todoData.map((todo) => (
//               <div
//                 key={todo.id}
//                 className="flex items-center justify-between p-4 rounded-2xl"
//                 style={{ background: "rgba(250, 250, 250, 0.05)" }}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
//                       todo.completed ? "bg-green-500 border-green-500" : "border-gray-400"
//                     }`}
//                   >
//                     {todo.completed && <CheckCircle className="w-3 h-3 text-white" />}
//                   </div>
//                   <div>
//                     <p className={`text-sm font-medium ${todo.completed ? "line-through opacity-60" : ""} text-white`}>
//                       {todo.task}
//                     </p>
//                     <p className="text-xs text-white/50">{todo.category}</p>
//                   </div>
//                 </div>
//                 <div
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     todo.priority === "high"
//                       ? "bg-red-500 bg-opacity-20 text-red-400"
//                       : todo.priority === "medium"
//                       ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
//                       : "bg-green-500 bg-opacity-20 text-green-400"
//                   }`}
//                 >
//                   {todo.priority}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RenderInsightsContent;


import React from "react";
import { Activity, CheckCircle, Target, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Area,
  Bar,
  PieChart,
  Pie,
  Cell,
  BarChart,
} from "recharts";


const RenderInsightsContent = ({
  totalIncome,
  totalExpenses,
  netBalance,
  todoCompletionRate,
  trendData,
  pieData,
  budgetComparison,
  todoData,
}) => {

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(5, 150, 105, 0.3)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-2xl"
              style={{ background: "rgba(5, 150, 105, 0.2)" }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: "#059669" }} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Avg Daily Spending
              </p>
              <p className="text-2xl font-bold" style={{ color: "#059669" }}>
                ₹{(totalExpenses / 30).toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(244, 197, 66, 0.3)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-2xl"
              style={{ background: "rgba(244, 197, 66, 0.2)" }}
            >
              <Target className="w-6 h-6" style={{ color: "#F4C542" }} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Budget Efficiency
              </p>
              <p className="text-2xl font-bold" style={{ color: "#F4C542" }}>
                78%
              </p>
            </div>
          </div>
        </div>

        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(139, 28, 34, 0.3)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-2xl"
              style={{ background: "rgba(139, 28, 34, 0.2)" }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: "#8B1C22" }} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Tasks Completed
              </p>
              <p className="text-2xl font-bold" style={{ color: "#8B1C22" }}>
                {todoCompletionRate.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(168, 85, 247, 0.3)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-2xl"
              style={{ background: "rgba(168, 85, 247, 0.2)" }}
            >
              <Activity className="w-6 h-6" style={{ color: "#A855F7" }} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Active Goals
              </p>
              <p className="text-2xl font-bold" style={{ color: "#A855F7" }}>
                5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Spending Trend */}
        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(244, 197, 66, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold" style={{ color: "#FAFAFA" }}>
              Daily Spending Trend
            </h3>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#059669" }}
              ></div>
              <span
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Income
              </span>
              <div
                className="w-3 h-3 rounded-full ml-4"
                style={{ background: "#EF4444" }}
              ></div>
              <span
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={trendData}>
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="income"
                fill="rgba(5, 150, 105, 0.2)"
                stroke="#059669"
                strokeWidth={3}
              />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(244, 197, 66, 0.2)",
          }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
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
                paddingAngle={5}
                dataKey="amount"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-₹{index}`} fill={entry.color} />
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
                <span
                  className="text-sm"
                  style={{ color: "rgba(250, 250, 250, 0.7)" }}
                >
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget vs Actual */}
        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(244, 197, 66, 0.2)",
          }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
            Budget Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetComparison} layout="horizontal">
              <XAxis type="number" hide />
              <YAxis
                dataKey="category"
                type="category"
                width={80}
                tick={{ fill: "rgba(250, 250, 250, 0.7)", fontSize: 12 }}
              />
              <Bar
                dataKey="budgeted"
                fill="rgba(244, 197, 66, 0.3)"
                radius={[0, 4, 4, 0]}
              />
              <Bar dataKey="spent" fill="#F4C542" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "rgba(244, 197, 66, 0.3)" }}
              ></div>
              <span
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Budgeted
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#F4C542" }}
              ></div>
              <span
                className="text-sm"
                style={{ color: "rgba(250, 250, 250, 0.7)" }}
              >
                Actual
              </span>
            </div>
          </div>
        </div>

        {/* Task Progress */}
        <div
          className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(244, 197, 66, 0.2)",
          }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: "#FAFAFA" }}>
            Task & Goal Progress
          </h3>
          <div className="space-y-4">
            {todoData.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background: "rgba(250, 250, 250, 0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
  todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
}`}
                  >
                    {todo.completed && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ₹{todo.completed ? 'line-through opacity-60' : ''}`}
                      style={{ color: "#FAFAFA" }}
                    >
                      {todo.task}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(250, 250, 250, 0.5)" }}
                    >
                      {todo.category}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ₹{
                    todo.priority === 'high' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                    todo.priority === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                    'bg-green-500 bg-opacity-20 text-green-400'
                  }`}
                >
                  {todo.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderInsightsContent;
