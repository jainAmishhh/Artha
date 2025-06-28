import React, { useState } from "react";
import { X } from "lucide-react";

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    description: "",
    merchant: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.category) return;

    onSubmit({
      ...form,
      amount: form.type === "expense" ? -Math.abs(parseFloat(form.amount)) : Math.abs(parseFloat(form.amount)),
      id: Date.now(),
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      icon: () => <></>, // You can replace with category-specific icon logic
      color: form.type === "income" ? "#34D399" : "#EF4444",
    });

    setForm({
      description: "",
      merchant: "",
      amount: "",
      type: "expense",
      category: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/40">
      <div
        className="bg-[#1F2937] rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-fade-in"
        style={{
          border: "1px solid rgba(244, 197, 66, 0.2)",
          background: "rgba(250, 250, 250, 0.05)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">Add Transaction</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Merchant (optional)</label>
            <input
              type="text"
              name="merchant"
              value={form.merchant}
              onChange={handleChange}
              placeholder="e.g. Big Bazaar"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option className="text-red-700" value="expense">Expense</option>
              <option className="text-green-700" value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Food, Salary"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;


// import React, { useState } from "react";
// import { X } from "lucide-react";

// const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     description: "",
//     merchant: "",
//     amount: "",
//     type: "expense",
//     category: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.description || !form.amount || !form.category) return;

//     onSubmit({
//       ...form,
//       amount: parseFloat(form.amount),
//       id: Date.now(),
//       date: new Date().toISOString(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       icon: () => <></>, // Replace with logic/icon if needed
//       color: form.type === "income" ? "#34D399" : "#EF4444",
//     });
//     setForm({ description: "", merchant: "", amount: "", type: "expense", category: "" });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
//       <div className="bg-[#1A1A1A] text-white w-full max-w-md p-6 rounded-3xl shadow-2xl border border-[#34D39933] relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
//         >
//           <X />
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full p-3 bg-[#2A2A2A] rounded-xl border border-gray-700 focus:outline-none focus:border-green-400"
//           />
//           <input
//             type="text"
//             name="merchant"
//             placeholder="Merchant (optional)"
//             value={form.merchant}
//             onChange={handleChange}
//             className="w-full p-3 bg-[#2A2A2A] rounded-xl border border-gray-700"
//           />
//           <input
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={handleChange}
//             className="w-full p-3 bg-[#2A2A2A] rounded-xl border border-gray-700"
//           />
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="w-full p-3 bg-[#2A2A2A] rounded-xl border border-gray-700"
//           >
//             <option value="expense">Expense</option>
//             <option value="income">Income</option>
//           </select>
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full p-3 bg-[#2A2A2A] rounded-xl border border-gray-700"
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-500 hover:bg-green-600 transition text-white p-3 rounded-xl font-semibold"
//           >
//             Add Transaction
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TransactionModal;
