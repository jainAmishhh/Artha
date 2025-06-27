import React, { useState, useEffect } from "react";
import { AlertTriangle, BookOpen, Home, TrendingUp, Plus } from "lucide-react";
import BudgetHeader from "./BudgetHeader";
import BudgetCard from "./BudgetCard";
import TimeFilters from "./TimeFilters";
import BudgetModal from "./BudgetModal";
import BudgetChart from "./BudgetChart";
import TotalBudgetDisplay from "./TotalBudgetDisplay";

const BudgetDashboard = () => {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const [chartData, setChartData] = useState([]);
  const [activeTimeFilter, setActiveTimeFilter] = useState("1Y");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({
    category: "",
    name: "",
    date: "",
    budget: "",
    spent: "",
    icon: "",
    color: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
  });

  // Chart data for different time filters
  const timeFilterData = {
    "1D": [
      { name: "6AM", value: 380 },
      { name: "12PM", value: 420 },
      { name: "6PM", value: 400 },
      { name: "12AM", value: 450 },
    ],
    "1W": [
      { name: "Mon", value: 200 },
      { name: "Tue", value: 350 },
      { name: "Wed", value: 300 },
      { name: "Thu", value: 400 },
      { name: "Fri", value: 350 },
      { name: "Sat", value: 400 },
      { name: "Sun", value: 320 },
    ],
    "1M": [
      { name: "Week 1", value: 100 },
      { name: "Week 2", value: 250 },
      { name: "Week 3", value: 200 },
      { name: "Week 4", value: 350 },
    ],
    "1Y": [
      { name: "Feb", value: 300 },
      { name: "Mar", value: 150 },
      { name: "Apr", value: 400 },
      { name: "May", value: 200 },
      { name: "Jun", value: 600 },
      { name: "Jul", value: 400 },
    ],
  };

  useEffect(() => {
    const initialBudgets = [
      createBudgetItem(
        "Education",
        "Education",
        Date.now(),
        100000,
        25000,
        BookOpen,
        "linear-gradient(135deg, #22543d 0%, #2d5a41 100%)"
      ),
      createBudgetItem(
        "Emergency",
        "Emergency",
        Date.now(),
        250000,
        5000,
        AlertTriangle,
        "linear-gradient(135deg, #8B1C22 0%, #A52A2A 100%)"
      ),
      createBudgetItem(
        "Housing",
        "Housing",
        Date.now(),
        12000,
        2000,
        Home,
        "linear-gradient(135deg, #22543D 0%, #2D5A41 100%)"
      ),
    ];
    setBudgetItems(initialBudgets);
  }, []);

  const createBudgetItem = (
    category,
    name,
    date,
    budget,
    spent,
    icon,
    color
  ) => {
    const remaining = budget - spent;
    const percentageSpent = Math.min(Math.round((spent / budget) * 100), 100);
    return {
      id: generateId(),
      category,
      name,
      date,
      icon,
      budget,
      spent,
      remaining,
      percentageSpent,
      color,
    };
  };

  const handleRemoveItem = (id) => {
    const updated = budgetItems.filter((item) => item.id !== id);
    setBudgetItems(updated);
  };

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.budget || !newItem.spent) return;

    const item = createBudgetItem(
      newItem.name,
      newItem.icon,
      Number(newItem.budget),
      Number(newItem.spent),
      newItem.color
    );

    setBudgetItems((prev) => [...prev, item]);
    setNewItem({
      name: "",
      budget: "",
      spent: "",
      icon: BookOpen,
      color: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
    });
    setShowModal(false);
  };

  const handleEditItem = () => {
    if (!editingItem) return;

    const updatedItems = budgetItems.map((item) =>
      item.id === editingItem.id
        ? {
            ...editingItem,
            budget: Number(editingItem.budget),
            spent: Number(editingItem.spent),
            remaining: Number(editingItem.budget) - Number(editingItem.spent),
            percentageSpent: Math.min(
              Math.round(
                (Number(editingItem.spent) / Number(editingItem.budget)) * 100
              ),
              100
            ),
          }
        : item
    );

    setBudgetItems(updatedItems);
    setEditingItem(null);
    setShowModal(false);
  };

  // Open modal for adding new item
  const openAddModal = () => {
    setNewItem({
      name: "",
      budget: "",
      spent: "",
      icon: BookOpen,
      color: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
    });
    setShowModal(true);
  };

  useEffect(() => {
    setChartData(timeFilterData[activeTimeFilter]);
  }, [activeTimeFilter]);

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 bg-[linear-gradient(135deg,_#22543D_0%,_#2D5A41_50%,_#1A4B35_100%)] relative overflow-hidden mt-16 md:mt-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[radial-gradient(circle,_rgba(244,197,66,0.15)_0%,_transparent_70%)] absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"></div>
        <div className="bg-[radial-gradient(circle,_rgba(139,28,34,0.12)_0%,_transparent_70%)] absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="bg-[radial-gradient(circle,_rgba(244,197,66,0.1)_0%,_transparent_70%)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero section */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
        <BudgetHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[rgba(250,250,250,0.08)] backdrop-blur-2xl border border-[#f4c54233] rounded-3xl p-8 shadow-2xl">
            <TotalBudgetDisplay
              totalBudget={totalBudget}
              totalRemaining={totalRemaining}
            />
            <TimeFilters
              activeTimeFilter={activeTimeFilter}
              setActiveTimeFilter={setActiveTimeFilter}
            />
            <BudgetChart chartData={chartData} />
          </div>

          <div className="flex flex-col gap-6">
            {budgetItems.map((item, index) => (
              <BudgetCard
                key={item.id}
                item={item}
                onEdit={(item) => {
                  setEditingItem(item);
                  // setShowModal(true);
                }}
                onDelete={handleRemoveItem}
              />
            ))}
            <BudgetModal
              showModal={showModal}
              editingItem={editingItem}
              newItem={newItem}
              setEditingItem={setEditingItem}
              setNewItem={setNewItem}
              onClose={() => {
                setEditingItem(null);
                setShowModal(false);
              }}
              handleAddNewItem={handleAddNewItem}
              handleEditItem={handleEditItem}
            />
            <button
              onClick={openAddModal}
              className="backdrop-blur-2xl border-2 border-dashed rounded-3xl p-8 hover:border-opacity-70 transition-all duration-300 group"
              style={{
                background: "rgba(244, 197, 66, 0.05)",
                borderColor: "rgba(244, 197, 66, 0.3)",
              }}
            >
              <div className="text-center">
                <div
                  className="p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
                  }}
                >
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold" style={{ color: "#FAFAFA" }}>
                  Add New Category
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(250, 250, 250, 0.6)" }}
                >
                  Create a new budget category
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;

// import React, { useState, useEffect } from "react";
// import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
// import {
//   Plus,
//   TrendingUp,
//   BookOpen,
//   AlertTriangle,
//   Home,
//   RefreshCw,
//   BarChart3,
//   IndianRupee,
// } from "lucide-react";

// // Generate unique IDs without external library
//

// const BudgetDashboard = () => {

//   // Chart data for different time filters
//   const timeFilterData = {
//     "1D": [
//       { name: "6AM", value: 380 },
//       { name: "12PM", value: 420 },
//       { name: "6PM", value: 400 },
//       { name: "12AM", value: 450 },
//     ],
//     "1W": [
//       { name: "Mon", value: 200 },
//       { name: "Tue", value: 350 },
//       { name: "Wed", value: 300 },
//       { name: "Thu", value: 400 },
//       { name: "Fri", value: 350 },
//       { name: "Sat", value: 400 },
//       { name: "Sun", value: 320 },
//     ],
//     "1M": [
//       { name: "Week 1", value: 100 },
//       { name: "Week 2", value: 250 },
//       { name: "Week 3", value: 200 },
//       { name: "Week 4", value: 350 },
//     ],
//     "1Y": [
//       { name: "Feb", value: 300 },
//       { name: "Mar", value: 150 },
//       { name: "Apr", value: 400 },
//       { name: "May", value: 200 },
//       { name: "Jun", value: 600 },
//       { name: "Jul", value: 400 },
//     ],
//   };

//   // Update chart data when time filter changes
//   useEffect(() => {
//     setChartData(timeFilterData[activeTimeFilter]);
//   }, [activeTimeFilter]);

//   // Calculate totals
//   const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
//   const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
//   const totalRemaining = totalBudget - totalSpent;

//   // Handle adding a new budget item
//   const handleAddNewItem = () => {
//     if (!newItem.name || !newItem.budget || !newItem.spent) return;

//     const item = createBudgetItem(
//       newItem.name,
//       newItem.icon,
//       Number(newItem.budget),
//       Number(newItem.spent),
//       newItem.color
//     );

//     setBudgetItems((prev) => [...prev, item]);
//     setNewItem({
//       name: "",
//       budget: "",
//       spent: "",
//       icon: BookOpen,
//       color: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
//     });
//     setShowModal(false);
//   };

//   // Handle editing a budget item
//   const handleEditItem = () => {
//     if (!editingItem) return;

//     const updatedItems = budgetItems.map((item) =>
//       item.id === editingItem.id
//         ? {
//             ...editingItem,
//             budget: Number(editingItem.budget),
//             spent: Number(editingItem.spent),
//             remaining: Number(editingItem.budget) - Number(editingItem.spent),
//             percentageSpent: Math.min(
//               Math.round(
//                 (Number(editingItem.spent) / Number(editingItem.budget)) * 100
//               ),
//               100
//             ),
//           }
//         : item
//     );

//     setBudgetItems(updatedItems);
//     setEditingItem(null);
//     setShowModal(false);
//   };

//   // Open modal for adding new item
//   const openAddModal = () => {
//     setNewItem({
//       name: "",
//       budget: "",
//       spent: "",
//       icon: BookOpen,
//       color: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
//     });
//     setShowModal(true);
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden mt-16 md:mt-12"
//       style={{
//         background:
//           "linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)",
//       }}
//     >

//       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Budget Overview - Left Side */}
//           <div
//             className="lg:col-span-2 backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl"
//             style={{
//               background: "rgba(250, 250, 250, 0.08)",
//               borderColor: "rgba(244, 197, 66, 0.2)",
//             }}
//           >
//             {/* Total Budget Display */}
//             <div className="text-center mb-8">
//               <div
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
//                 style={{ background: "rgba(244, 197, 66, 0.15)" }}
//               >
//                 <TrendingUp className="w-4 h-4" style={{ color: "#F4C542" }} />
//                 <span
//                   className="text-sm font-medium uppercase tracking-wider"
//                   style={{ color: "#F4C542" }}
//                 >
//                   Total Budget (₹)
//                 </span>
//               </div>
//               <div
//                 className="text-6xl font-bold mb-2"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #F4C542 0%, #FAFAFA 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                 }}
//               >
//                 ₹ {totalBudget.toLocaleString()}.00
//               </div>
//               <div
//                 className="flex items-center justify-center gap-2 text-lg font-semibold"
//                 style={{ color: "#F4C542" }}
//               >
//                 <TrendingUp className="w-5 h-5" />
//                 <span>Remaining: ₹{totalRemaining.toLocaleString()}.00</span>
//               </div>
//             </div>

//             {/* Time Filter Buttons */}
//             <div className="flex justify-center gap-2 mb-8">
//               {["1D", "1W", "1M", "1Y"].map((filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => setActiveTimeFilter(filter)}
//                   className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
//                     activeTimeFilter === filter
//                       ? "text-white shadow-lg transform scale-105"
//                       : "hover:text-white"
//                   }`}
//                   style={
//                     activeTimeFilter === filter
//                       ? {
//                           background:
//                             "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
//                           boxShadow: "0 8px 25px rgba(244, 197, 66, 0.3)",
//                         }
//                       : {
//                           background: "rgba(250, 250, 250, 0.08)",
//                           color: "rgba(250, 250, 250, 0.7)",
//                         }
//                   }
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>

//             {/* Chart */}
//             <div className="relative h-80 mb-6">
//               <div
//                 className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
//                 }}
//               >
//                 ₹{chartData[chartData.length - 1]?.value || 400}
//               </div>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={chartData}>
//                   <defs>
//                     <linearGradient
//                       id="colorGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop offset="5%" stopColor="#F4C542" stopOpacity={0.3} />
//                       <stop
//                         offset="95%"
//                         stopColor="#F4C542"
//                         stopOpacity={0.0}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <XAxis
//                     dataKey="name"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: "#FAFAFA", fontSize: 12, opacity: 0.8 }}
//                   />
//                   <YAxis hide />
//                   <Area
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#F4C542"
//                     strokeWidth={4}
//                     fill="url(#colorGradient)"
//                     dot={{
//                       fill: "#F4C542",
//                       strokeWidth: 3,
//                       stroke: "#FAFAFA",
//                       r: 6,
//                     }}
//                     activeDot={{
//                       r: 8,
//                       stroke: "#FAFAFA",
//                       strokeWidth: 3,
//                       fill: "#F4C542",
//                     }}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Budget Items Sidebar - Right Side */}
//           <div className="flex flex-col gap-6">
//             {budgetItems.map((item, index) => {
//               const IconComponent = item.icon;
//               const { percentageSpent, remaining } = item;

//               return (
//                 <div
//                   key={item.id}
//                   className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group"
//                   style={{
//                     background: "rgba(250, 250, 250, 0.08)",
//                     borderColor: "rgba(244, 197, 66, 0.2)",
//                     animationDelay: `${index * 100}ms`,
//                   }}
//                 >
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex items-center gap-4">
//                       <div
//                         className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
//                         style={{ background: item.color }}
//                       >
//                         <IconComponent className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h3
//                           className="text-xl font-bold mb-1"
//                           style={{ color: "#FAFAFA" }}
//                         >
//                           {item.name}
//                         </h3>
//                         <p
//                           className="text-sm"
//                           style={{ color: "rgba(250, 250, 250, 0.6)" }}
//                         >
//                           Budget: ₹{item.budget.toLocaleString()}.00
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex justify-between text-sm">
//                       <span style={{ color: "rgba(250, 250, 250, 0.8)" }}>
//                         Spent ₹{item.spent.toLocaleString()}.00
//                       </span>
//                       <span
//                         className="font-semibold"
//                         style={{ color: "#F4C542" }}
//                       >
//                         Remaining ₹{remaining.toLocaleString()}.00
//                       </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="relative">
//                       <div
//                         className="w-full h-3 rounded-full overflow-hidden"
//                         style={{ background: "rgba(250, 250, 250, 0.1)" }}
//                       >
//                         <div
//                           className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
//                           style={{
//                             width: `${Math.min(percentageSpent, 100)}%`,
//                             background: item.color,
//                           }}
//                         ></div>
//                       </div>
//                       <div className="absolute -top-1 right-0 transform translate-x-1/2">
//                         <div
//                           className="w-5 h-5 rounded-full shadow-lg flex items-center justify-center"
//                           style={{ background: "#FAFAFA" }}
//                         >
//                           <div
//                             className="w-2 h-2 rounded-full"
//                             style={{ background: "#F4C542" }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <span
//                         className="text-xs"
//                         style={{ color: "rgba(250, 250, 250, 0.5)" }}
//                       >
//                         {percentageSpent.toFixed(1)}% used
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2 justify-end mt-4">
//                     <button
//                       onClick={() => {
//                         setEditingItem(item);
//                         setShowModal(true);
//                       }}
//                       className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
//                       style={{ background: "#F4C542" }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleRemoveItem(item.id)}
//                       className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
//                       style={{ background: "#B91C1C" }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Add New Category Button */}
//             <button
//               onClick={openAddModal}
//               className="backdrop-blur-2xl border-2 border-dashed rounded-3xl p-8 hover:border-opacity-70 transition-all duration-300 group"
//               style={{
//                 background: "rgba(244, 197, 66, 0.05)",
//                 borderColor: "rgba(244, 197, 66, 0.3)",
//               }}
//             >
//               <div className="text-center">
//                 <div
//                   className="p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
//                   }}
//                 >
//                   <Plus className="w-8 h-8 text-white" />
//                 </div>
//                 <p className="font-semibold" style={{ color: "#FAFAFA" }}>
//                   Add New Category
//                 </p>
//                 <p
//                   className="text-sm mt-1"
//                   style={{ color: "rgba(250, 250, 250, 0.6)" }}
//                 >
//                   Create a new budget category
//                 </p>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Bottom Navigation - Mobile */}
//         <div
//           className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4"
//           style={{
//             background: "rgba(250, 250, 250, 0.08)",
//             borderColor: "rgba(244, 197, 66, 0.2)",
//           }}
//         >
//           <div className="flex justify-around max-w-md mx-auto">
//             {[
//               { icon: Home, label: "Home", active: false },
//               { icon: RefreshCw, label: "Transaction", active: false },
//               { icon: BarChart3, label: "Plan", active: false },
//               { icon: IndianRupee, label: "Budget", active: true },
//             ].map((item, index) => {
//               const IconComponent = item.icon;
//               return (
//                 <button
//                   key={index}
//                   className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
//                     item.active ? "scale-110" : ""
//                   }`}
//                   style={
//                     item.active
//                       ? {
//                           background: "rgba(244, 197, 66, 0.2)",
//                           color: "#FAFAFA",
//                         }
//                       : {
//                           color: "rgba(250, 250, 250, 0.6)",
//                         }
//                   }
//                 >
//                   <IconComponent className="w-5 h-5" />
//                   <span className="text-xs font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Modal for Add/Edit */}
//       {(showModal || editingItem) && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-lg m-4">
//             <h2 className="text-xl font-bold text-gray-800">
//               {editingItem ? "Edit Budget Category" : "Add New Budget Category"}
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., Food, Transportation"
//                   value={editingItem ? editingItem.name : newItem.name}
//                   onChange={(e) => {
//                     if (editingItem) {
//                       setEditingItem({ ...editingItem, name: e.target.value });
//                     } else {
//                       setNewItem({ ...newItem, name: e.target.value });
//                     }
//                   }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Budget Amount (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="5000"
//                   value={editingItem ? editingItem.budget : newItem.budget}
//                   onChange={(e) => {
//                     if (editingItem) {
//                       setEditingItem({
//                         ...editingItem,
//                         budget: e.target.value,
//                       });
//                     } else {
//                       setNewItem({ ...newItem, budget: e.target.value });
//                     }
//                   }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Amount Spent (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="2000"
//                   value={editingItem ? editingItem.spent : newItem.spent}
//                   onChange={(e) => {
//                     if (editingItem) {
//                       setEditingItem({ ...editingItem, spent: e.target.value });
//                     } else {
//                       setNewItem({ ...newItem, spent: e.target.value });
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 className="px-6 py-2 rounded-lg text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
//                 onClick={() => {
//                   setEditingItem(null);
//                   setShowModal(false);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 rounded-lg text-sm text-white hover:opacity-90 transition-opacity"
//                 style={{ background: "#22543D" }}
//                 onClick={editingItem ? handleEditItem : handleAddNewItem}
//               >
//                 {editingItem ? "Save Changes" : "Add Category"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BudgetDashboard;

// // // Updated code with Add, Edit, and Delete functionality
// // import React, { useState, useEffect } from 'react';
// // import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
// // import {
// //   ArrowLeft, Search, Plus, TrendingUp, BookOpen,
// //   AlertTriangle, Home, RefreshCw, BarChart3,
// //   IndianRupee, Sparkles
// // } from 'lucide-react';
// // import { LuBadgeIndianRupee } from "react-icons/lu";
// // import { v4 as uuidv4 } from 'uuid';

// // const BudgetDashboard = () => {
// //   const [activeTimeFilter, setActiveTimeFilter] = useState('1Y');
// //   const [chartData, setChartData] = useState([]);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [budgetItems, setBudgetItems] = useState([]);
// //   const [newItem, setNewItem] = useState({
// //     name: '',
// //     budget: '',
// //     spent: '',
// //     icon: BookOpen,
// //     color: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)'
// //   });

// //   useEffect(() => {
// //     const initialBudgets = [
// //       createBudgetItem('Education', BookOpen, 1000, 100, 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'),
// //       createBudgetItem('Emergency', AlertTriangle, 1000, 200, 'linear-gradient(135deg, #8B1C22 0%, #A52A2A 100%)'),
// //       createBudgetItem('Housing', Home, 2500, 1300, 'linear-gradient(135deg, #22543D 0%, #2D5A41 100%)')
// //     ];
// //     setBudgetItems(initialBudgets);
// //   }, []);

// //   const createBudgetItem = (name, icon, budget, spent, color) => {
// //     const remaining = budget - spent;
// //     const percentageSpent = Math.min(Math.round((spent / budget) * 100), 100);
// //     return {
// //       id: uuidv4(),
// //       name,
// //       icon,
// //       budget,
// //       spent,
// //       remaining,
// //       percentageSpent,
// //       color
// //     };
// //   };

// //   const timeFilterData = {
// //     '1D': [
// //       { name: '6AM', value: 380 },
// //       { name: '12PM', value: 420 },
// //       { name: '6PM', value: 400 },
// //       { name: '12AM', value: 450 }
// //     ],
// //     '1W': [
// //       { name: 'Mon', value: 200 },
// //       { name: 'Tue', value: 350 },
// //       { name: 'Wed', value: 300 },
// //       { name: 'Thu', value: 400 },
// //       { name: 'Fri', value: 350 },
// //       { name: 'Sat', value: 400 },
// //       { name: 'Sun', value: 320 }
// //     ],
// //     '1M': [
// //       { name: 'Week 1', value: 100 },
// //       { name: 'Week 2', value: 250 },
// //       { name: 'Week 3', value: 200 },
// //       { name: 'Week 4', value: 350 }
// //     ],
// //     '1Y': [
// //       { name: 'Feb', value: 300 },
// //       { name: 'Mar', value: 150 },
// //       { name: 'Apr', value: 400 },
// //       { name: 'May', value: 200 },
// //       { name: 'Jun', value: 600 },
// //       { name: 'Jul', value: 400 }
// //     ]
// //   };

// //   useEffect(() => {
// //     setChartData(timeFilterData[activeTimeFilter]);
// //   }, [activeTimeFilter]);

// //   const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
// //   const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
// //   const totalRemaining = totalBudget - totalSpent;

// //   const handleRemoveItem = (id) => {
// //     const updated = budgetItems.filter(item => item.id !== id);
// //     setBudgetItems(updated);
// //   };

// //   const handleAddNewItem = () => {
// //     if (!newItem.name || !newItem.budget || !newItem.spent) return;
// //     const item = {
// //       ...newItem,
// //       id: uuidv4(),
// //       budget: Number(newItem.budget),
// //       spent: Number(newItem.spent),
// //       remaining: newItem.budget - newItem.spent,
// //       percentageSpent: Math.min(Math.round((newItem.spent / newItem.budget) * 100), 100),
// //     };
// //     setBudgetItems(prev => [...prev, item]);
// //     setNewItem({ name: '', budget: '', spent: '', icon: BookOpen, color: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)' });
// //     setShowModal(false);
// //   };

// //   const handleEditItem = () => {
// //     if (!editingItem) return;
// //     const updatedItems = budgetItems.map(item =>
// //       item.id === editingItem.id ? {
// //         ...editingItem,
// //         budget: Number(editingItem.budget),
// //         spent: Number(editingItem.spent),
// //         remaining: editingItem.budget - editingItem.spent,
// //         percentageSpent: Math.min(Math.round((editingItem.spent / editingItem.budget) * 100), 100),
// //       } : item
// //     );
// //     setBudgetItems(updatedItems);
// //     setEditingItem(null);
// //     setShowModal(false);
// //   };

// //   return (
// //     <div>
// //       <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden mt-12" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.1) 0%, transparent 70%)'}}></div>
// //       </div>

// //       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
// //         {/* Header */}
// //         <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center gap-4">
// //               <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                 <LuBadgeIndianRupee className="w-8 h-8 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
// //                   Budget Dashboard
// //                   <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#F4C542'}} />
// //                 </h1>
// //                 <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Manage your finances intelligently</p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <ArrowLeft className="w-5 h-5" />
// //               </button>
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <Search className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="grid lg:grid-cols-3 gap-8">
// //           {/* Budget Overview */}
// //           <div className="lg:col-span-2 backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
// //             {/* Total Budget */}
// //             <div className="text-center mb-8">
// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{background: 'rgba(244, 197, 66, 0.15)'}}>
// //                 <TrendingUp className="w-4 h-4" style={{color: '#F4C542'}} />
// //                 <span className="text-sm font-medium uppercase tracking-wider" style={{color: '#F4C542'}}>Total Budget (₹)</span>
// //               </div>
// //               <div className="text-6xl font-bold mb-2" style={{
// //                 background: 'linear-gradient(135deg, #F4C542 0%, #FAFAFA 100%)',
// //                 WebkitBackgroundClip: 'text',
// //                 WebkitTextFillColor: 'transparent',
// //                 backgroundClip: 'text'
// //               }}>
// //                 ₹ {totalBudget.toLocaleString()}.00
// //               </div>
// //               <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{color: '#F4C542'}}>
// //                 <TrendingUp className="w-5 h-5" />
// //                 + ₹{(totalBudget - 8800).toLocaleString()}.00
// //               </div>
// //             </div>

// //             {/* Time Filters */}
// //             <div className="flex justify-center gap-2 mb-8">
// //               {['1D', '1W', '1M', '1Y'].map((filter) => (
// //                 <button
// //                   key={filter}
// //                   onClick={() => setActiveTimeFilter(filter)}
// //                   className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ₹{
// //                     activeTimeFilter === filter
// //                       ? 'text-white shadow-lg transform scale-105'
// //                       : 'hover:text-white'
// //                   }`}
// //                   style={activeTimeFilter === filter
// //                     ? {
// //                         background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
// //                         boxShadow: '0 8px 25px rgba(244, 197, 66, 0.3)'
// //                       }
// //                     : {
// //                         background: 'rgba(250, 250, 250, 0.08)',
// //                         color: 'rgba(250, 250, 250, 0.7)'
// //                       }
// //                   }
// //                 >
// //                   {filter}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Chart */}
// //             <div className="relative h-80 mb-6">
// //               <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                 ₹{chartData[chartData.length - 1]?.value || 400}
// //               </div>
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <AreaChart data={chartData}>
// //                   <defs>
// //                     <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="#F4C542" stopOpacity={0.3}/>
// //                       <stop offset="95%" stopColor="#F4C542" stopOpacity={0.0}/>
// //                     </linearGradient>
// //                   </defs>
// //                   <XAxis
// //                     dataKey="name"
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tick={{ fill: '#FAFAFA', fontSize: 12, opacity: 0.8 }}
// //                   />
// //                   <YAxis hide />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="value"
// //                     stroke="#F4C542"
// //                     strokeWidth={4}
// //                     fill="url(#colorGradient)"
// //                     dot={{ fill: '#F4C542', strokeWidth: 3, stroke: '#FAFAFA', r: 6 }}
// //                     activeDot={{ r: 8, stroke: '#FAFAFA', strokeWidth: 3, fill: '#F4C542' }}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* Budget Items Sidebar */}
// //           <div className="flex flex-col gap-6">
// //             {budgetItems.map((item, index) => {
// //               const IconComponent = item.icon;
// //               const { percentageSpent: progressPercentage, remaining } = item;

// //               <div className="flex gap-2 justify-end mt-4">
// //   <button
// //     onClick={() => {
// //       setEditingItem(item);
// //       setShowModal(true);
// //     }}
// //     className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
// //     style={{ background: '#F4C542' }}
// //   >
// //     Edit
// //   </button>

// //   <button
// //     onClick={() => handleRemoveItem(item.id)}
// //     className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
// //     style={{ background: '#B91C1C' }}
// //   >
// //     Delete
// //   </button>
// // </div>

// //               return (
// //                 <div
// //                   key={item.id}
// //                   className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group"
// //                   style={{
// //                     background: 'rgba(250, 250, 250, 0.08)',
// //                     borderColor: 'rgba(244, 197, 66, 0.2)',
// //                     animationDelay: `₹{index * 100}ms`
// //                   }}
// //                 >
// //                   <div className="flex justify-between items-start mb-6">
// //                     <div className="flex items-center gap-4">
// //                       <div className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{background: item.color}}>
// //                         <IconComponent className="w-6 h-6 text-white" />
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xl font-bold mb-1" style={{color: '#FAFAFA'}}>{item.name}</h3>
// //                         <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Budget: ₹{item.budget.toLocaleString()}.00</p>
// //                       </div>
// //                     </div>
// //                     <button className="p-3 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg" style={{
// //                       background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
// //                       boxShadow: '0 4px 15px rgba(244, 197, 66, 0.3)'
// //                     }}>
// //                       <Plus className="w-5 h-5" />
// //                     </button>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <div className="flex justify-between text-sm">
// //                       <span style={{color: 'rgba(250, 250, 250, 0.8)'}}>Spent ₹{item.spent.toLocaleString()}.00</span>
// //                       <span className="font-semibold" style={{color: '#F4C542'}}>Remaining ₹{remaining.toLocaleString()}.00</span>
// //                     </div>

// //                     <div className="relative">
// //                       <div className="w-full h-3 rounded-full overflow-hidden" style={{background: 'rgba(250, 250, 250, 0.1)'}}>
// //                         <div
// //                           className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
// //                           style={{
// //                            width: `${Math.min(progressPercentage, 100)}%`,
// //                            background: item.color
// //                           }}
// //                         ></div>
// //                       </div>
// //                       <div className="absolute -top-1 right-0 transform translate-x-1/2">
// //                         <div className="w-5 h-5 rounded-full shadow-lg flex items-center justify-center" style={{background: '#FAFAFA'}}>
// //                           <div className="w-2 h-2 rounded-full" style={{background: '#F4C542'}}></div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="text-right">
// //                       <span className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>{progressPercentage.toFixed(1)}% used</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}

// //             {/* Add New Category Button */}
// //             <button className="backdrop-blur-2xl border-2 border-dashed rounded-3xl p-8 hover:border-opacity-70 transition-all duration-300 group" style={{
// //               background: 'rgba(244, 197, 66, 0.05)',
// //               borderColor: 'rgba(244, 197, 66, 0.3)'
// //             }}>
// //               <div className="text-center">
// //                 <div className="p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                   <Plus className="w-8 h-8 text-white" />
// //                 </div>
// //                 <p className="font-semibold" style={{color: '#FAFAFA'}}>Add New Category</p>
// //                 <p className="text-sm mt-1" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Create a new budget category</p>
// //               </div>
// //             </button>
// //           </div>
// //         </div>

// //                 {/* Bottom Navigation - Mobile */}
// //         <div className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4" style={{
// //           background: 'rgba(250, 250, 250, 0.08)',
// //           borderColor: 'rgba(244, 197, 66, 0.2)'
// //         }}>
// //           <div className="flex justify-around max-w-md mx-auto">
// //             {[
// //               { icon: Home, label: 'Home', active: false },
// //               { icon: RefreshCw, label: 'Transaction', active: false },
// //               { icon: BarChart3, label: 'Plan', active: false },
// //               { icon: IndianRupee , label: 'Budget', active: true }
// //             ].map((item, index) => {
// //               const IconComponent = item.icon;
// //               return (
// //                 <button
// //                   key={index}
// //                   className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ₹{
// //                     item.active ? 'scale-110' : ''
// //                   }`}
// //                   style={item.active
// //                     ? {
// //                         background: 'rgba(244, 197, 66, 0.2)',
// //                         color: '#FAFAFA'
// //                       }
// //                     : {
// //                         color: 'rgba(250, 250, 250, 0.6)'
// //                       }
// //                   }
// //                 >
// //                   <IconComponent className="w-5 h-5" />
// //                   <span className="text-xs font-medium">{item.label}</span>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //       {(showModal || editingItem) && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-lg">
// //             <h2 className="text-xl font-bold text-gray-800">
// //               {editingItem ? 'Edit Budget Category' : 'Add New Budget Category'}
// //             </h2>
// //             <div className="space-y-2">
// //               <input
// //                 type="text"
// //                 className="w-full border rounded-lg px-4 py-2"
// //                 placeholder="Category Name"
// //                 value={editingItem ? editingItem.name : newItem.name}
// //                 onChange={(e) => {
// //                   if (editingItem) setEditingItem({ ...editingItem, name: e.target.value });
// //                   else setNewItem({ ...newItem, name: e.target.value });
// //                 }}
// //               />
// //               <input
// //                 type="number"
// //                 className="w-full border rounded-lg px-4 py-2"
// //                 placeholder="Budget"
// //                 value={editingItem ? editingItem.budget : newItem.budget}
// //                 onChange={(e) => {
// //                   if (editingItem) setEditingItem({ ...editingItem, budget: e.target.value });
// //                   else setNewItem({ ...newItem, budget: e.target.value });
// //                 }}
// //               />
// //               <input
// //                 type="number"
// //                 className="w-full border rounded-lg px-4 py-2"
// //                 placeholder="Spent"
// //                 value={editingItem ? editingItem.spent : newItem.spent}
// //                 onChange={(e) => {
// //                   if (editingItem) setEditingItem({ ...editingItem, spent: e.target.value });
// //                   else setNewItem({ ...newItem, spent: e.target.value });
// //                 }}
// //               />
// //             </div>
// //             <div className="flex justify-end gap-2 pt-2">
// //               <button
// //                 className="px-4 py-2 rounded-lg text-sm text-gray-600 border"
// //                 onClick={() => {
// //                   setEditingItem(null);
// //                   setShowModal(false);
// //                 }}
// //               >Cancel</button>
// //               <button
// //                 className="px-4 py-2 rounded-lg text-sm text-white"
// //                 style={{ background: '#22543D' }}
// //                 onClick={editingItem ? handleEditItem : handleAddNewItem}
// //               >{editingItem ? 'Save Changes' : 'Add Category'}</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BudgetDashboard;

// // import React, { useState, useEffect } from 'react';
// // import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
// // import { ArrowLeft, Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, RefreshCw, BarChart3, IndianRupee, Sparkles } from 'lucide-react';
// // import { LuBadgeIndianRupee } from "react-icons/lu";
// // import { v4 as uuidv4 } from 'uuid'; // At the top of the file

// // const BudgetDashboard = () => {
// //   const [activeTimeFilter, setActiveTimeFilter] = useState('1Y');
// //   const [chartData, setChartData] = useState([]);
// //   const [editingItem, setEditingItem] = useState(null); // to hold item being edited
// // const [showModal, setShowModal] = useState(false);    // toggle modal

// // const createBudgetItem = (name, icon, budget, spent, color) => {
// //   const remaining = budget - spent;
// //   const percentageSpent = Math.min(Math.round((spent / budget) * 100), 100);
// //   return {
// //     id: uuidv4(),
// //     name,
// //     icon,
// //     budget,
// //     spent,
// //     remaining,
// //     percentageSpent,
// //     color
// //   };
// // };

// // const initialBudgets = [
// //   createBudgetItem('Education', BookOpen, 1000, 100, 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'),
// //   createBudgetItem('Emergency', AlertTriangle, 1000, 200, 'linear-gradient(135deg, #8B1C22 0%, #A52A2A 100%)'),
// //   createBudgetItem('Housing', Home, 2500, 1300, 'linear-gradient(135deg, #22543D 0%, #2D5A41 100%)'),
// // ];

// // const [budgetItems, setBudgetItems] = useState(initialBudgets);

// //   const timeFilterData = {
// //     '1D': [
// //       { name: '6AM', value: 380 },
// //       { name: '12PM', value: 420 },
// //       { name: '6PM', value: 400 },
// //       { name: '12AM', value: 450 }
// //     ],
// //     '1W': [
// //       { name: 'Mon', value: 200 },
// //       { name: 'Tue', value: 350 },
// //       { name: 'Wed', value: 300 },
// //       { name: 'Thu', value: 400 },
// //       { name: 'Fri', value: 350 },
// //       { name: 'Sat', value: 400 },
// //       { name: 'Sun', value: 320 }
// //     ],
// //     '1M': [
// //       { name: 'Week 1', value: 100 },
// //       { name: 'Week 2', value: 250 },
// //       { name: 'Week 3', value: 200 },
// //       { name: 'Week 4', value: 350 }
// //     ],
// //     '1Y': [
// //       { name: 'Feb', value: 300 },
// //       { name: 'Mar', value: 150 },
// //       { name: 'Apr', value: 400 },
// //       { name: 'May', value: 200 },
// //       { name: 'Jun', value: 600 },
// //       { name: 'Jul', value: 400 }
// //     ]
// //   };

// //   useEffect(() => {
// //     setChartData(timeFilterData[activeTimeFilter]);
// //   }, [activeTimeFilter]);

// //   const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
// //   const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
// //   const totalRemaining = totalBudget - totalSpent;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden mt-12" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.1) 0%, transparent 70%)'}}></div>
// //       </div>

// //       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
// //         {/* Header */}
// //         <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center gap-4">
// //               <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                 <LuBadgeIndianRupee className="w-8 h-8 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
// //                   Budget Dashboard
// //                   <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#F4C542'}} />
// //                 </h1>
// //                 <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Manage your finances intelligently</p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <ArrowLeft className="w-5 h-5" />
// //               </button>
// //               <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
// //                 <Search className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="grid lg:grid-cols-3 gap-8">
// //           {/* Budget Overview */}
// //           <div className="lg:col-span-2 backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
// //             {/* Total Budget */}
// //             <div className="text-center mb-8">
// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{background: 'rgba(244, 197, 66, 0.15)'}}>
// //                 <TrendingUp className="w-4 h-4" style={{color: '#F4C542'}} />
// //                 <span className="text-sm font-medium uppercase tracking-wider" style={{color: '#F4C542'}}>Total Budget (₹)</span>
// //               </div>
// //               <div className="text-6xl font-bold mb-2" style={{
// //                 background: 'linear-gradient(135deg, #F4C542 0%, #FAFAFA 100%)',
// //                 WebkitBackgroundClip: 'text',
// //                 WebkitTextFillColor: 'transparent',
// //                 backgroundClip: 'text'
// //               }}>
// //                 ₹ {totalBudget.toLocaleString()}.00
// //               </div>
// //               <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{color: '#F4C542'}}>
// //                 <TrendingUp className="w-5 h-5" />
// //                 + ₹{(totalBudget - 8800).toLocaleString()}.00
// //               </div>
// //             </div>

// //             {/* Time Filters */}
// //             <div className="flex justify-center gap-2 mb-8">
// //               {['1D', '1W', '1M', '1Y'].map((filter) => (
// //                 <button
// //                   key={filter}
// //                   onClick={() => setActiveTimeFilter(filter)}
// //                   className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ₹{
// //                     activeTimeFilter === filter
// //                       ? 'text-white shadow-lg transform scale-105'
// //                       : 'hover:text-white'
// //                   }`}
// //                   style={activeTimeFilter === filter
// //                     ? {
// //                         background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
// //                         boxShadow: '0 8px 25px rgba(244, 197, 66, 0.3)'
// //                       }
// //                     : {
// //                         background: 'rgba(250, 250, 250, 0.08)',
// //                         color: 'rgba(250, 250, 250, 0.7)'
// //                       }
// //                   }
// //                 >
// //                   {filter}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Chart */}
// //             <div className="relative h-80 mb-6">
// //               <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                 ₹{chartData[chartData.length - 1]?.value || 400}
// //               </div>
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <AreaChart data={chartData}>
// //                   <defs>
// //                     <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="#F4C542" stopOpacity={0.3}/>
// //                       <stop offset="95%" stopColor="#F4C542" stopOpacity={0.0}/>
// //                     </linearGradient>
// //                   </defs>
// //                   <XAxis
// //                     dataKey="name"
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tick={{ fill: '#FAFAFA', fontSize: 12, opacity: 0.8 }}
// //                   />
// //                   <YAxis hide />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="value"
// //                     stroke="#F4C542"
// //                     strokeWidth={4}
// //                     fill="url(#colorGradient)"
// //                     dot={{ fill: '#F4C542', strokeWidth: 3, stroke: '#FAFAFA', r: 6 }}
// //                     activeDot={{ r: 8, stroke: '#FAFAFA', strokeWidth: 3, fill: '#F4C542' }}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* Budget Items Sidebar */}
// //           <div className="flex flex-col gap-6">
// //             {budgetItems.map((item, index) => {
// //               const IconComponent = item.icon;
// //               const { percentageSpent: progressPercentage, remaining } = item;

// //               <div className="flex gap-2 justify-end mt-4">
// //   <button
// //     onClick={() => {
// //       setEditingItem(item);
// //       setShowModal(true);
// //     }}
// //     className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
// //     style={{ background: '#F4C542' }}
// //   >
// //     Edit
// //   </button>

// //   <button
// //     onClick={() => handleRemoveItem(item.id)}
// //     className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
// //     style={{ background: '#B91C1C' }}
// //   >
// //     Delete
// //   </button>
// // </div>

// //               return (
// //                 <div
// //                   key={item.id}
// //                   className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group"
// //                   style={{
// //                     background: 'rgba(250, 250, 250, 0.08)',
// //                     borderColor: 'rgba(244, 197, 66, 0.2)',
// //                     animationDelay: `₹{index * 100}ms`
// //                   }}
// //                 >
// //                   <div className="flex justify-between items-start mb-6">
// //                     <div className="flex items-center gap-4">
// //                       <div className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{background: item.color}}>
// //                         <IconComponent className="w-6 h-6 text-white" />
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xl font-bold mb-1" style={{color: '#FAFAFA'}}>{item.name}</h3>
// //                         <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Budget: ₹{item.budget.toLocaleString()}.00</p>
// //                       </div>
// //                     </div>
// //                     <button className="p-3 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg" style={{
// //                       background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
// //                       boxShadow: '0 4px 15px rgba(244, 197, 66, 0.3)'
// //                     }}>
// //                       <Plus className="w-5 h-5" />
// //                     </button>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <div className="flex justify-between text-sm">
// //                       <span style={{color: 'rgba(250, 250, 250, 0.8)'}}>Spent ₹{item.spent.toLocaleString()}.00</span>
// //                       <span className="font-semibold" style={{color: '#F4C542'}}>Remaining ₹{remaining.toLocaleString()}.00</span>
// //                     </div>

// //                     <div className="relative">
// //                       <div className="w-full h-3 rounded-full overflow-hidden" style={{background: 'rgba(250, 250, 250, 0.1)'}}>
// //                         <div
// //                           className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
// //                           style={{
// //                            width: `${Math.min(progressPercentage, 100)}%`,
// //                            background: item.color
// //                           }}
// //                         ></div>
// //                       </div>
// //                       <div className="absolute -top-1 right-0 transform translate-x-1/2">
// //                         <div className="w-5 h-5 rounded-full shadow-lg flex items-center justify-center" style={{background: '#FAFAFA'}}>
// //                           <div className="w-2 h-2 rounded-full" style={{background: '#F4C542'}}></div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="text-right">
// //                       <span className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>{progressPercentage.toFixed(1)}% used</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}

// //             {/* Add New Category Button */}
// //             <button className="backdrop-blur-2xl border-2 border-dashed rounded-3xl p-8 hover:border-opacity-70 transition-all duration-300 group" style={{
// //               background: 'rgba(244, 197, 66, 0.05)',
// //               borderColor: 'rgba(244, 197, 66, 0.3)'
// //             }}>
// //               <div className="text-center">
// //                 <div className="p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
// //                   <Plus className="w-8 h-8 text-white" />
// //                 </div>
// //                 <p className="font-semibold" style={{color: '#FAFAFA'}}>Add New Category</p>
// //                 <p className="text-sm mt-1" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Create a new budget category</p>
// //               </div>
// //             </button>
// //           </div>
// //         </div>

// //                 {/* Bottom Navigation - Mobile */}
// //         <div className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4" style={{
// //           background: 'rgba(250, 250, 250, 0.08)',
// //           borderColor: 'rgba(244, 197, 66, 0.2)'
// //         }}>
// //           <div className="flex justify-around max-w-md mx-auto">
// //             {[
// //               { icon: Home, label: 'Home', active: false },
// //               { icon: RefreshCw, label: 'Transaction', active: false },
// //               { icon: BarChart3, label: 'Plan', active: false },
// //               { icon: IndianRupee , label: 'Budget', active: true }
// //             ].map((item, index) => {
// //               const IconComponent = item.icon;
// //               return (
// //                 <button
// //                   key={index}
// //                   className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ₹{
// //                     item.active ? 'scale-110' : ''
// //                   }`}
// //                   style={item.active
// //                     ? {
// //                         background: 'rgba(244, 197, 66, 0.2)',
// //                         color: '#FAFAFA'
// //                       }
// //                     : {
// //                         color: 'rgba(250, 250, 250, 0.6)'
// //                       }
// //                   }
// //                 >
// //                   <IconComponent className="w-5 h-5" />
// //                   <span className="text-xs font-medium">{item.label}</span>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BudgetDashboard;
