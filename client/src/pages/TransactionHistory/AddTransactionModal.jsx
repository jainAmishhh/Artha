import React, { useState } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { CATEGORY_COLORS, getIconForCategory } from "../../utils/transactionConstants.js";

export const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    types: "Expense", // Matches backend schema 'types'
    description: "",
    merchant: "",
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    icon: "ShoppingBag",
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const icon = getIconForCategory(category);
    setFormData({ ...formData, category, icon });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.description || !formData.amount) {
      alert("Please fill in Description and Amount");
      return;
    }

    // Convert amount to number before sending
    const payload = {
      ...formData,
      amount: Number(formData.amount)
    };

    onAdd(payload);
    
    // Reset form
    setFormData({
      types: "Expense",
      description: "",
      merchant: "",
      amount: "",
      category: "Groceries",
      date: new Date().toISOString().split("T")[0],
      icon: "ShoppingBag",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Add Transaction</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="text-slate-500 w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, types: "Income" })}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                  formData.types === "Income"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md scale-[1.02]"
                    : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-600"
                }`}
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="font-semibold">Income</span>
              </button>
              
              <button
                onClick={() => setFormData({ ...formData, types: "Expense" })}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                  formData.types === "Expense"
                    ? "border-rose-500 bg-rose-50 text-rose-700 shadow-md scale-[1.02]"
                    : "border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 text-slate-600"
                }`}
              >
                <TrendingDown className="w-6 h-6 mb-2" />
                <span className="font-semibold">Expense</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="e.g. Monthly Salary, Grocery Shopping"
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Merchant <span className="text-slate-400 font-normal">(Optional)</span></label>
            <input
              type="text"
              placeholder="e.g. Amazon, Starbucks"
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
              value={formData.merchant}
              onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white font-mono"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <div className="relative">
              <select
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white appearance-none"
                value={formData.category}
                onChange={handleCategoryChange}
              >
                {Object.keys(CATEGORY_COLORS).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 mt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 px-6 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all transform active:scale-95"
            >
              Save Transaction
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import { X, TrendingUp, TrendingDown } from "lucide-react";
// import { CATEGORY_COLORS, getIconForCategory } from "../../utils/transactionConstants.js";

// export const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
//   const [formData, setFormData] = useState({
//     types: "Expense",
//     description: "",
//     merchant: "",
//     amount: "",
//     category: "Groceries",
//     date: new Date().toISOString().split("T")[0],
//     icon: "ShoppingBag",
//   });

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     const icon = getIconForCategory(category);
//     setFormData({ ...formData, category, icon });
//   };

//   const handleSubmit = () => {
//     if (!formData.description || !formData.amount) return; // Basic validation
//     onAdd(formData);
//     // Reset form
//     setFormData({
//       types: "Expense",
//       description: "",
//       merchant: "",
//       amount: "",
//       category: "Groceries",
//       date: new Date().toISOString().split("T")[0],
//       icon: "ShoppingBag",
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
//       <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all scale-100">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-slate-800">Add Transaction</h3>
//           <button 
//             onClick={onClose}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <X className="text-slate-500 w-6 h-6" />
//           </button>
//         </div>

//         <div className="space-y-5">
//           {/* Type Selector */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction Type</label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => setFormData({ ...formData, types: "Income" })}
//                 className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
//                   formData.types === "Income"
//                     ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md scale-[1.02]"
//                     : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-600"
//                 }`}
//               >
//                 <TrendingUp className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">Income</span>
//               </button>
              
//               <button
//                 onClick={() => setFormData({ ...formData, types: "Expense" })}
//                 className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
//                   formData.types === "Expense"
//                     ? "border-rose-500 bg-rose-50 text-rose-700 shadow-md scale-[1.02]"
//                     : "border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 text-slate-600"
//                 }`}
//               >
//                 <TrendingDown className="w-6 h-6 mb-2" />
//                 <span className="font-semibold">Expense</span>
//               </button>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
//             <input
//               type="text"
//               placeholder="e.g. Monthly Salary, Grocery Shopping"
//               className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             />
//           </div>

//           {/* Merchant */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Merchant <span className="text-slate-400 font-normal">(Optional)</span></label>
//             <input
//               type="text"
//               placeholder="e.g. Amazon, Starbucks"
//               className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
//               value={formData.merchant}
//               onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
//             />
//           </div>

//           {/* Amount & Date */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (₹)</label>
//               <input
//                 type="number"
//                 placeholder="0.00"
//                 className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white font-mono"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
//               <input
//                 type="date"
//                 className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white"
//                 value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//               />
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
//             <div className="relative">
//               <select
//                 className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-slate-50 focus:bg-white appearance-none"
//                 value={formData.category}
//                 onChange={handleCategoryChange}
//               >
//                 {Object.keys(CATEGORY_COLORS).map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//               {/* Custom Arrow for select */}
//               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                   <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4 mt-2">
//             <button
//               onClick={handleSubmit}
//               className="flex-1 py-3.5 px-6 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all transform active:scale-95"
//             >
//               Save Transaction
//             </button>
//             <button
//               onClick={onClose}
//               className="flex-1 py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all active:scale-95"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };