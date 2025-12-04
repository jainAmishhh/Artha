import React, { useState, useEffect } from "react";
import api from "../../api/axios.js"; // Import the configured instance
import { Plus, User } from "lucide-react";
import { SummaryCards } from "./SummaryCards.jsx";
import { FilterBar } from "./FilterBar.jsx";
import { TransactionList } from "./TransactionList.jsx";
import { AddTransactionModal } from "./AddTransactionModal.jsx";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ fullname: "User" });

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    types: "All",
    category: "All",
    range: "All",
  });

  // Load User from Local Storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch Transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // We use 'api' here, so the Authorization header is auto-added
      const response = await api.get("/api/transactions/filter", {
        params: {
          search: filters.search,
          types: filters.types,
          category: filters.category,
          range: filters.range,
        },
      });

      if (response.data.success) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response?.status === 401) {
        // Optional: Redirect to login if token is expired
        alert("Session expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce effect for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTransactions();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await api.post("/api/transactions", newTransaction);
      
      if (response.data.success) {
        fetchTransactions(); 
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome back, <span className="text-emerald-600">{user.fullname}</span>
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your finances</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Transaction
          </button>
        </div>

        {/* Modular Components */}
        <SummaryCards transactions={transactions} />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onFilter={fetchTransactions}
        />

        <TransactionList transactions={transactions} loading={loading} />

        <AddTransactionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionHistory;

// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios.js";
// import { Plus } from "lucide-react";
// import { SummaryCards } from "./SummaryCards.jsx";
// import { FilterBar } from "./FilterBar.jsx";
// import { TransactionList } from "./TransactionList.jsx";
// import { AddTransactionModal } from "./AddTransactionModal.jsx";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  
//   // State for filters
//   const [filters, setFilters] = useState({
//     search: "",
//     types: "All",
//     category: "All",
//     range: "All",
//   });

//   // Fetch Transactions
//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "/api/transactions/filter",
//         {
//           params: {
//             search: filters.search,
//             types: filters.types,
//             category: filters.category,
//             range: filters.range,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         setTransactions(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchTransactions();
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [filters]);

//   const handleAddTransaction = async (newTransaction) => {
//     try {
//       const response = await axios.post("/api/transactions", 
//         newTransaction,
//         {
//           withCredentials: true
//         }
//       )
//       if (response.data.success) {
//         fetchTransactions();
//         setShowModal(false);
//       }
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//       alert("Failed to add transaction");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-24 pb-12">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800">
//               Transaction History
//             </h1>
//             <p className="text-slate-600">Track and manage your finances</p>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all"
//           >
//             <Plus size={20} /> Add Transaction
//           </button>
//         </div>

//         {/* Modular Components */}
//         <SummaryCards transactions={transactions} />

//         <FilterBar
//           filters={filters}
//           setFilters={setFilters}
//           onFilter={fetchTransactions}
//         />

//         <TransactionList transactions={transactions} loading={loading} />

//         <AddTransactionModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onAdd={handleAddTransaction}
//         />
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Plus,
//   X,
//   Search,
//   Filter,
//   ChevronDown,
//   Calendar,
//   Receipt,
//   TrendingUp,
//   TrendingDown,
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft,
// } from "lucide-react";
// import {
//   ICON_MAP,
//   CATEGORY_COLORS,
//   getIconForCategory,
// } from "../../utils/transactionConstants.js";
// import { SummaryCards } from "./SummaryCards.jsx";
// import { FilterBar } from "./FilterBar.jsx";
// import { TransactionList } from "./TransactionList.jsx";
// import { AddTransactionModal } from "./AddTransactionModal.jsx";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // State for filters
//   const [filters, setFilters] = useState({
//     search: "",
//     types: "All",
//     category: "All",
//     range: "All",
//   });

//   // Fetch Transactions (utilizing the Filter endpoint)
//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       // NOTE: Ensure your axios instance has the Authorization header set
//       // e.g., axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const response = await axios.get("/api/transactions/filter", {
//         params: {
//           search: filters.search,
//           types: filters.types,
//           category: filters.category,
//           range: filters.range,
//         },
//       });

//       if (response.data.success) {
//         setTransactions(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounce effect for fetching when filters change
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchTransactions();
//     }, 500); // 500ms debounce for search
//     return () => clearTimeout(timer);
//   }, [filters]);

//   const handleAddTransaction = async (newTransaction) => {
//     try {
//       const response = await axios.post("/api/transactions", newTransaction);
//       if (response.data.success) {
//         // Refresh list
//         fetchTransactions();
//         setShowModal(false);
//       }
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//       alert("Failed to add transaction");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-24 pb-12">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800">
//               Transaction History
//             </h1>
//             <p className="text-slate-600">Track and manage your finances</p>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all"
//           >
//             <Plus size={20} /> Add Transaction
//           </button>
//         </div>

//         {/* Modular Components */}
//         <SummaryCards transactions={transactions} />

//         <FilterBar
//           filters={filters}
//           setFilters={setFilters}
//           onFilter={fetchTransactions}
//         />

//         <TransactionList transactions={transactions} loading={loading} />

//         <AddTransactionModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onAdd={handleAddTransaction}
//         />
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;

// // import React, { useState } from "react";
// // import { Briefcase, ShoppingBasket } from "lucide-react";

// // const TransactionHistory = () => {
// //   // Sample transaction data
// //   const initialTransactions = [
// //     {
// //       id: 1,
// //       description: "Salary Deposit",
// //       merchant: "ABC Corporation",
// //       amount: 50000,
// //       type: "income",
// //       category: "Salary",
// //       date: "2025-06-15",
// //       icon: Briefcase,
// //       color: "#10B981",
// //     },
// //     {
// //       id: 2,
// //       description: "Grocery Shopping",
// //       merchant: "Big Bazaar",
// //       amount: -2500,
// //       type: "expense",
// //       category: "Groceries",
// //       date: "2025-06-14",
// //       icon: ShoppingBasket,
// //       color: "#F59E0B",
// //     },
// //     {
// //       id: 3,
// //       description: "Coffee with Friends",
// //       merchant: "Starbucks",
// //       amount: -450,
// //       type: "expense",
// //       category: "Food & Dining",
// //       date: "2025-06-13",
// //       icon: Coffee,
// //       color: "#8B5CF6",
// //     },
// //     {
// //       id: 4,
// //       description: "Rent Payment",
// //       merchant: "Landlord",
// //       amount: -15000,
// //       type: "expense",
// //       category: "Housing",
// //       date: "2025-06-10",
// //       icon: Home,
// //       color: "#3B82F6",
// //     },
// //     {
// //       id: 5,
// //       description: "Freelance Project",
// //       merchant: "XYZ Client",
// //       amount: 8000,
// //       type: "income",
// //       category: "Freelance",
// //       date: "2025-06-08",
// //       icon: Briefcase,
// //       color: "#10B981",
// //     },
// //     {
// //       id: 6,
// //       description: "Fuel",
// //       merchant: "Indian Oil",
// //       amount: -1200,
// //       type: "expense",
// //       category: "Transportation",
// //       date: "2025-06-07",
// //       icon: Car,
// //       color: "#EF4444",
// //     },
// //     {
// //       id: 7,
// //       description: "Movie Night",
// //       merchant: "PVR Cinemas",
// //       amount: -600,
// //       type: "expense",
// //       category: "Entertainment",
// //       date: "2025-06-05",
// //       icon: Film,
// //       color: "#EC4899",
// //     },
// //     {
// //       id: 8,
// //       description: "Mobile Recharge",
// //       merchant: "Jio",
// //       amount: -299,
// //       type: "expense",
// //       category: "Bills",
// //       date: "2025-06-03",
// //       icon: Smartphone,
// //       color: "#06B6D4",
// //     },
// //   ];

// //   const [transactions, setTransactions] = useState(initialTransactions);
// //   const [activeTimeFilter, setActiveTimeFilter] = useState("All");
// //   const [activeCategoryFilter, setCategoryFilter] = useState("All");
// //   const [activeTypeFilter, setTypeFilter] = useState("All");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   // New transaction state
// //   const [newTransaction, setNewTransaction] = useState({
// //     types: "expense",
// //     description: "",
// //     merchant: "",
// //     amount: "",
// //     category: "Groceries",
// //     date: new Date().toISOString().split("T")[0],
// //     icon: "ShoppingBag",
// //   });

// //   const handleAddTransaction = () => {
// //     if (!newTransaction.description || !newTransaction.amount) return;

// //     const categoryIcons = {
// //       // --- Income Categories ---
// //       Salary: Wallet,
// //       Freelance: Banknote,
// //       "Business Income": Briefcase,
// //       "Investments Income": TrendingUp,
// //       "Gifts Received": Gift,
// //       Refunds: RefreshCcw,
// //       "Other Income": CircleDollarSign,

// //       // --- Essential Expenses ---
// //       Groceries: ShoppingBag,
// //       "Food & Dining": Utensils,
// //       Housing: Home,
// //       Rent: Home,
// //       Utilities: Plug,
// //       Transportation: Car,
// //       Healthcare: HeartPulse,
// //       Insurance: ShieldCheck,
// //       Education: GraduationCap,
// //       Emergency: AlertTriangle,

// //       // --- Lifestyle & Optional Expenses ---
// //       Entertainment: Film,
// //       Shopping: ShoppingCart,
// //       Travel: Plane,
// //       "Personal Care": Sparkles,
// //       Fitness: Dumbbell,
// //       Subscriptions: Repeat,
// //       Pets: Dog,
// //       "Family & Kids": Users,

// //       // --- Financial Responsibilities ---
// //       Bills: Receipt,
// //       "Loan EMI": Landmark,
// //       "Credit Card Payment": CreditCard,
// //       Savings: PiggyBank,
// //       Investments: ChartBar,
// //       Charity: Handshake,

// //       // --- Others ---
// //       Miscellaneous: CircleHelp,
// //     };

// //     const categoryColors = {
// //     // Income
// //     "Salary": "#10B981", // Emerald
// //     "Freelance": "#059669",
// //     "Business Income": "#3B82F6", // Blue
// //     "Investments Income": "#8B5CF6", // Violet
// //     "Gifts Received": "#EC4899", // Pink
// //     "Refunds": "#6366F1", // Indigo
// //     "Other Income": "#64748B", // Slate

// //     // Essentials
// //     "Groceries": "#F59E0B", // Amber
// //     "Food & Dining": "#F97316", // Orange
// //     "Housing": "#3B82F6",
// //     "Rent": "#3B82F6",
// //     "Utilities": "#0EA5E9", // Sky
// //     "Transportation": "#EF4444", // Red
// //     "Healthcare": "#F43F5E", // Rose
// //     "Insurance": "#0D9488", // Teal
// //     "Education": "#8B5CF6",
// //     "Emergency": "#DC2626",

// //     // Lifestyle
// //     "Entertainment": "#EC4899",
// //     "Shopping": "#D946EF", // Fuchsia
// //     "Travel": "#06B6D4", // Cyan
// //     "Personal Care": "#FEF08A",
// //     "Fitness": "#84CC16", // Lime
// //     "Subscriptions": "#6366F1",
// //     "Pets": "#A855F7", // Purple
// //     "Family & Kids": "#FB7185",

// //     // Financial
// //     "Bills": "#64748B",
// //     "Loan EMI": "#94A3B8",
// //     "Credit Card Payment": "#F43F5E",
// //     "Savings": "#10B981",
// //     "Investments": "#14B8A6",
// //     "Charity": "#F59E0B",

// //     // Other
// //     "Miscellaneous": "#9CA3AF"
// //   };

// //     const transaction = {
// //       id: Date.now(),
// //       description: newTransaction.description,
// //       merchant: newTransaction.merchant,
// //       amount:
// //         newTransaction.type === "expense"
// //           ? -Math.abs(Number(newTransaction.amount))
// //           : Math.abs(Number(newTransaction.amount)),
// //       type: newTransaction.type,
// //       category: newTransaction.category,
// //       date: newTransaction.date,
// //       icon: categoryIcons[newTransaction.category] || ShoppingBag,
// //       color: categoryColors[newTransaction.category] || "#6B7280",
// //     };

// //     setTransactions([transaction, ...transactions]);
// //     setNewTransaction({
// //       description: "",
// //       merchant: "",
// //       amount: "",
// //       type: "expense",
// //       category: "Groceries",
// //       date: new Date().toISOString().split("T")[0],
// //     });
// //     setShowModal(false);
// //   };

// //   const filteredTransactions = transactions.filter((transaction) => {
// //     const matchesSearch =
// //       transaction.description
// //         .toLowerCase()
// //         .includes(searchTerm.toLowerCase()) ||
// //       transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesCategory =
// //       activeCategoryFilter === "All" ||
// //       transaction.category === activeCategoryFilter;

// //     const matchesType =
// //       activeTypeFilter === "All" || transaction.type === activeTypeFilter;

// //     let matchesTime = true;
// //     if (activeTimeFilter !== "All") {
// //       const transactionDate = new Date(transaction.date);
// //       const today = new Date();
// //       const daysDiff = Math.floor(
// //         (today - transactionDate) / (1000 * 60 * 60 * 24)
// //       );

// //       switch (activeTimeFilter) {
// //         case "Today":
// //           matchesTime = daysDiff === 0;
// //           break;
// //         case "7 Days":
// //           matchesTime = daysDiff <= 7;
// //           break;
// //         case "30 Days":
// //           matchesTime = daysDiff <= 30;
// //           break;
// //         default:
// //           matchesTime = true;
// //       }
// //     }

// //     return matchesSearch && matchesCategory && matchesType && matchesTime;
// //   });

// //   const timeFilters = ["All", "Today", "7 Days", "30 Days"];
// //   const categories = ["All", ...new Set(transactions.map((t) => t.category))];
// //   const typeFilters = ["All", "income", "expense"];

// //   const totalIncome = filteredTransactions
// //     .filter((t) => t.type === "income")
// //     .reduce((sum, t) => sum + t.amount, 0);

// //   const totalExpenses = Math.abs(
// //     filteredTransactions
// //       .filter((t) => t.type === "expense")
// //       .reduce((sum, t) => sum + t.amount, 0)
// //   );

// //   const netBalance = totalIncome - totalExpenses;
// //   const transactionCount = filteredTransactions.length;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-24 pb-12">
// //       <div className="max-w-7xl mx-auto px-4 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg">
// //                 <Receipt className="text-white" size={28} />
// //               </div>
// //               <div>
// //                 <h1 className="text-4xl font-bold text-slate-800">
// //                   Transaction History
// //                 </h1>
// //                 <p className="text-slate-600">
// //                   Track and manage all your transactions
// //                 </p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => setShowModal(true)}
// //               className="flex items-center gap-2 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
// //             >
// //               <Plus size={20} />
// //               Add Transaction
// //             </button>
// //           </div>
// //         </div>

// //         {/* Summary Cards Module */}
// //         <SummaryCards
// //           totalIncome={totalIncome}
// //           totalExpenses={totalExpenses}
// //           netBalance={netBalance}
// //           transactionCount={transactionCount}
// //         />

// //         {/* Filters Module */}
// //         <FilterBar
// //           searchTerm={searchTerm}
// //           setSearchTerm={setSearchTerm}
// //           activeTimeFilter={activeTimeFilter}
// //           setActiveTimeFilter={setActiveTimeFilter}
// //           showFilters={showFilters}
// //           setShowFilters={setShowFilters}
// //           activeCategoryFilter={activeCategoryFilter}
// //           setCategoryFilter={setCategoryFilter}
// //           activeTypeFilter={activeTypeFilter}
// //           setTypeFilter={setTypeFilter}
// //           categories={categories}
// //           timeFilters={timeFilters}
// //           typeFilters={typeFilters}
// //         />

// //         {/* Transaction List Module */}
// //         <TransactionList transactions={filteredTransactions} />

// //         {/* Modal Module */}
// //         <AddTransactionModal
// //           isOpen={showModal}
// //           onClose={() => setShowModal(false)}
// //           newTransaction={newTransaction}
// //           setNewTransaction={setNewTransaction}
// //           onAdd={handleAddTransaction}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransactionHistory;

// // // // Add Transaction
// // // // axios.post("/api/transactions/create", newTransaction);

// // // // Get All Transactions
// // // // axios.get("/api/transactions/all");

// // // // Filter Transactions
// // // // axios.get("/api/transactions/filter", {
// // // //   params: {
// // // //     search,
// // // //     type,
// // // //     category,
// // // //     range
// // // //   }
// // // // });

// // // // Update Transaction
// // // // axios.put(`/api/transactions/${id}`, updatedTransaction);

// // // // Delete Transaction
// // // // axios.delete(`/api/transactions/${id}`);

// // // import React, { useState } from "react";
// // // import {
// // //   Search,
// // //   Filter,
// // //   Calendar,
// // //   ChevronDown,
// // //   Plus,
// // //   TrendingUp,
// // //   TrendingDown,
// // //   CreditCard,
// // //   ShoppingBag,
// // //   Coffee,
// // //   Home,
// // //   Car,
// // //   Smartphone,
// // //   Heart,
// // //   Briefcase,
// // //   Film,
// // //   ArrowUpRight,
// // //   ArrowDownLeft,
// // //   Receipt,
// // //   Wallet,
// // //   X,
// // // } from "lucide-react";

// // // const TransactionHistory = () => {
// // //   // Sample transaction data
// // //   const initialTransactions = [
// // //     {
// // //       id: 1,
// // //       description: "Salary Deposit",
// // //       merchant: "ABC Corporation",
// // //       amount: 50000,
// // //       type: "income",
// // //       category: "Salary",
// // //       date: "2025-06-15",
// // //       icon: Briefcase,
// // //       color: "#10B981"
// // //     },
// // //     {
// // //       id: 2,
// // //       description: "Grocery Shopping",
// // //       merchant: "Big Bazaar",
// // //       amount: -2500,
// // //       type: "expense",
// // //       category: "Groceries",
// // //       date: "2025-06-14",
// // //       icon: ShoppingBag,
// // //       color: "#F59E0B"
// // //     },
// // //     {
// // //       id: 3,
// // //       description: "Coffee with Friends",
// // //       merchant: "Starbucks",
// // //       amount: -450,
// // //       type: "expense",
// // //       category: "Food & Dining",
// // //       date: "2025-06-13",
// // //       icon: Coffee,
// // //       color: "#8B5CF6"
// // //     },
// // //     {
// // //       id: 4,
// // //       description: "Rent Payment",
// // //       merchant: "Landlord",
// // //       amount: -15000,
// // //       type: "expense",
// // //       category: "Housing",
// // //       date: "2025-06-10",
// // //       icon: Home,
// // //       color: "#3B82F6"
// // //     },
// // //     {
// // //       id: 5,
// // //       description: "Freelance Project",
// // //       merchant: "XYZ Client",
// // //       amount: 8000,
// // //       type: "income",
// // //       category: "Freelance",
// // //       date: "2025-06-08",
// // //       icon: Briefcase,
// // //       color: "#10B981"
// // //     },
// // //     {
// // //       id: 6,
// // //       description: "Fuel",
// // //       merchant: "Indian Oil",
// // //       amount: -1200,
// // //       type: "expense",
// // //       category: "Transportation",
// // //       date: "2025-06-07",
// // //       icon: Car,
// // //       color: "#EF4444"
// // //     },
// // //     {
// // //       id: 7,
// // //       description: "Movie Night",
// // //       merchant: "PVR Cinemas",
// // //       amount: -600,
// // //       type: "expense",
// // //       category: "Entertainment",
// // //       date: "2025-06-05",
// // //       icon: Film,
// // //       color: "#EC4899"
// // //     },
// // //     {
// // //       id: 8,
// // //       description: "Mobile Recharge",
// // //       merchant: "Jio",
// // //       amount: -299,
// // //       type: "expense",
// // //       category: "Bills",
// // //       date: "2025-06-03",
// // //       icon: Smartphone,
// // //       color: "#06B6D4"
// // //     },
// // //   ];

// // //   const [transactions, setTransactions] = useState(initialTransactions);
// // //   const [activeTimeFilter, setActiveTimeFilter] = useState("All");
// // //   const [activeCategoryFilter, setCategoryFilter] = useState("All");
// // //   const [activeTypeFilter, setTypeFilter] = useState("All");
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [showFilters, setShowFilters] = useState(false);
// // //   const [showModal, setShowModal] = useState(false);

// // //   // New transaction state
// // //   const [newTransaction, setNewTransaction] = useState({
// // //     description: "",
// // //     merchant: "",
// // //     amount: "",
// // //     type: "expense",
// // //     category: "Groceries",
// // //     date: new Date().toISOString().split('T')[0],
// // //   });

// // //   const handleAddTransaction = () => {
// // //     if (!newTransaction.description || !newTransaction.amount) return;

// // //     const categoryIcons = {
// // //       "Salary": Briefcase,
// // //       "Freelance": Briefcase,
// // //       "Groceries": ShoppingBag,
// // //       "Food & Dining": Coffee,
// // //       "Housing": Home,
// // //       "Transportation": Car,
// // //       "Entertainment": Film,
// // //       "Bills": Smartphone,
// // //       "Healthcare": Heart,
// // //       "Shopping": ShoppingBag,
// // //     };

// // //     const categoryColors = {
// // //       "Salary": "#10B981",
// // //       "Freelance": "#10B981",
// // //       "Groceries": "#F59E0B",
// // //       "Food & Dining": "#8B5CF6",
// // //       "Housing": "#3B82F6",
// // //       "Transportation": "#EF4444",
// // //       "Entertainment": "#EC4899",
// // //       "Bills": "#06B6D4",
// // //       "Healthcare": "#F43F5E",
// // //       "Shopping": "#F59E0B",
// // //     };

// // //     const transaction = {
// // //       id: Date.now(),
// // //       description: newTransaction.description,
// // //       merchant: newTransaction.merchant,
// // //       amount: newTransaction.type === "expense" ? -Math.abs(Number(newTransaction.amount)) : Math.abs(Number(newTransaction.amount)),
// // //       type: newTransaction.type,
// // //       category: newTransaction.category,
// // //       date: newTransaction.date,
// // //       icon: categoryIcons[newTransaction.category] || ShoppingBag,
// // //       color: categoryColors[newTransaction.category] || "#6B7280"
// // //     };

// // //     setTransactions([transaction, ...transactions]);
// // //     setNewTransaction({
// // //       description: "",
// // //       merchant: "",
// // //       amount: "",
// // //       type: "expense",
// // //       category: "Groceries",
// // //       date: new Date().toISOString().split('T')[0],
// // //     });
// // //     setShowModal(false);
// // //   };

// // //   const filteredTransactions = transactions.filter((transaction) => {
// // //     const matchesSearch =
// // //       transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());

// // //     const matchesCategory =
// // //       activeCategoryFilter === "All" || transaction.category === activeCategoryFilter;

// // //     const matchesType =
// // //       activeTypeFilter === "All" || transaction.type === activeTypeFilter;

// // //     let matchesTime = true;
// // //     if (activeTimeFilter !== "All") {
// // //       const transactionDate = new Date(transaction.date);
// // //       const today = new Date();
// // //       const daysDiff = Math.floor((today - transactionDate) / (1000 * 60 * 60 * 24));

// // //       switch (activeTimeFilter) {
// // //         case "Today":
// // //           matchesTime = daysDiff === 0;
// // //           break;
// // //         case "7 Days":
// // //           matchesTime = daysDiff <= 7;
// // //           break;
// // //         case "30 Days":
// // //           matchesTime = daysDiff <= 30;
// // //           break;
// // //         default:
// // //           matchesTime = true;
// // //       }
// // //     }

// // //     return matchesSearch && matchesCategory && matchesType && matchesTime;
// // //   });

// // //   const timeFilters = ["All", "Today", "7 Days", "30 Days"];
// // //   const categories = ["All", ...new Set(transactions.map((t) => t.category))];
// // //   const typeFilters = ["All", "income", "expense"];

// // //   const totalIncome = filteredTransactions
// // //     .filter((t) => t.type === "income")
// // //     .reduce((sum, t) => sum + t.amount, 0);

// // //   const totalExpenses = Math.abs(
// // //     filteredTransactions
// // //       .filter((t) => t.type === "expense")
// // //       .reduce((sum, t) => sum + t.amount, 0)
// // //   );

// // //   const netBalance = totalIncome - totalExpenses;
// // //   const transactionCount = filteredTransactions.length;

// // //   const formatDate = (dateString) => {
// // //     const options = { day: "2-digit", month: "short", year: "numeric" };
// // //     return new Date(dateString).toLocaleDateString("en-IN", options);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-24 pb-12">
// // //       <div className="max-w-7xl mx-auto px-4 lg:px-8">

// // //         {/* Header */}
// // //         <div className="mb-8">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-4">
// // //               <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg">
// // //                 <Receipt className="text-white" size={28} />
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-4xl font-bold text-slate-800">Transaction History</h1>
// // //                 <p className="text-slate-600">Track and manage all your transactions</p>
// // //               </div>
// // //             </div>
// // //             <button
// // //               onClick={() => setShowModal(true)}
// // //               className="flex items-center gap-2 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
// // //             >
// // //               <Plus size={20} />
// // //               Add Transaction
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Summary Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// // //           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
// // //             <div className="flex items-center gap-3 mb-3">
// // //               <div className="p-2 bg-emerald-100 rounded-xl">
// // //                 <TrendingUp className="text-emerald-600" size={20} />
// // //               </div>
// // //               <p className="text-sm font-medium text-slate-600">Total Income</p>
// // //             </div>
// // //             <p className="text-3xl font-bold text-slate-800">₹{totalIncome.toLocaleString()}</p>
// // //             <p className="text-xs text-emerald-600 mt-1">Money received</p>
// // //           </div>

// // //           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
// // //             <div className="flex items-center gap-3 mb-3">
// // //               <div className="p-2 bg-rose-100 rounded-xl">
// // //                 <TrendingDown className="text-rose-600" size={20} />
// // //               </div>
// // //               <p className="text-sm font-medium text-slate-600">Total Expenses</p>
// // //             </div>
// // //             <p className="text-3xl font-bold text-slate-800">₹{totalExpenses.toLocaleString()}</p>
// // //             <p className="text-xs text-rose-600 mt-1">Money spent</p>
// // //           </div>

// // //           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
// // //             <div className="flex items-center gap-3 mb-3">
// // //               <div className="p-2 bg-cyan-100 rounded-xl">
// // //                 <Wallet className="text-cyan-600" size={20} />
// // //               </div>
// // //               <p className="text-sm font-medium text-slate-600">Net Balance</p>
// // //             </div>
// // //             <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
// // //               ₹{netBalance.toLocaleString()}
// // //             </p>
// // //             <p className="text-xs text-slate-500 mt-1">
// // //               {netBalance >= 0 ? 'Surplus' : 'Deficit'}
// // //             </p>
// // //           </div>

// // //           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
// // //             <div className="flex items-center gap-3 mb-3">
// // //               <div className="p-2 bg-blue-100 rounded-xl">
// // //                 <Receipt className="text-blue-600" size={20} />
// // //               </div>
// // //               <p className="text-sm font-medium text-slate-600">Transactions</p>
// // //             </div>
// // //             <p className="text-3xl font-bold text-slate-800">{transactionCount}</p>
// // //             <p className="text-xs text-slate-500 mt-1">Total records</p>
// // //           </div>
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-lg">
// // //           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
// // //             {/* Search */}
// // //             <div className="relative flex-1 max-w-md w-full">
// // //               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search transactions..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
// // //               />
// // //             </div>

// // //             {/* Time Filter Buttons */}
// // //             <div className="flex gap-2 flex-wrap">
// // //               {timeFilters.map((filter) => (
// // //                 <button
// // //                   key={filter}
// // //                   onClick={() => setActiveTimeFilter(filter)}
// // //                   className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
// // //                     activeTimeFilter === filter
// // //                       ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg"
// // //                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
// // //                   }`}
// // //                 >
// // //                   {filter}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             {/* Filter Button */}
// // //             <button
// // //               onClick={() => setShowFilters(!showFilters)}
// // //               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                 showFilters
// // //                   ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg'
// // //                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
// // //               }`}
// // //             >
// // //               <Filter size={18} />
// // //               Filters
// // //               <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
// // //             </button>
// // //           </div>

// // //           {/* Advanced Filters */}
// // //           {showFilters && (
// // //             <div className="mt-6 grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
// // //               <div>
// // //                 <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
// // //                 <select
// // //                   value={activeCategoryFilter}
// // //                   onChange={(e) => setCategoryFilter(e.target.value)}
// // //                   className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
// // //                 >
// // //                   {categories.map(cat => (
// // //                     <option key={cat} value={cat}>{cat}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
// // //                 <select
// // //                   value={activeTypeFilter}
// // //                   onChange={(e) => setTypeFilter(e.target.value)}
// // //                   className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
// // //                 >
// // //                   {typeFilters.map(type => (
// // //                     <option key={type} value={type}>
// // //                       {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Transaction List */}
// // //         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <h2 className="text-2xl font-bold text-slate-800">
// // //               Recent Transactions ({filteredTransactions.length})
// // //             </h2>
// // //           </div>

// // //           <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
// // //             {filteredTransactions.length === 0 ? (
// // //               <div className="text-center py-16">
// // //                 <div className="p-4 bg-cyan-100 rounded-2xl mx-auto w-fit mb-4">
// // //                   <Receipt className="w-12 h-12 text-cyan-600" />
// // //                 </div>
// // //                 <p className="text-xl font-semibold text-slate-800 mb-2">No transactions found</p>
// // //                 <p className="text-slate-600">Try adjusting your filters or add a new transaction</p>
// // //               </div>
// // //             ) : (
// // //               filteredTransactions.map((transaction) => {
// // //                 const IconComponent = transaction.icon;
// // //                 const isIncome = transaction.type === "income";

// // //                 return (
// // //                   <div
// // //                     key={transaction.id}
// // //                     className="group flex items-center justify-between p-5 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl hover:shadow-lg transition-all duration-300"
// // //                   >
// // //                     <div className="flex items-center gap-4 flex-1">
// // //                       {/* Icon */}
// // //                       <div
// // //                         className="p-3 rounded-xl group-hover:scale-110 transition-transform"
// // //                         style={{ backgroundColor: `${transaction.color}15` }}
// // //                       >
// // //                         <IconComponent className="w-6 h-6" style={{ color: transaction.color }} />
// // //                       </div>

// // //                       {/* Details */}
// // //                       <div className="flex-1 min-w-0">
// // //                         <h3 className="font-bold text-slate-800 mb-1">
// // //                           {transaction.description}
// // //                         </h3>
// // //                         <div className="flex items-center gap-3 text-sm text-slate-600">
// // //                           <span>{transaction.merchant}</span>
// // //                           <span className="text-slate-400">•</span>
// // //                           <span className="flex items-center gap-1">
// // //                             <Calendar size={14} />
// // //                             {formatDate(transaction.date)}
// // //                           </span>
// // //                         </div>
// // //                       </div>

// // //                       {/* Category Badge */}
// // //                       <span
// // //                         className="hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold"
// // //                         style={{
// // //                           backgroundColor: `${transaction.color}20`,
// // //                           color: transaction.color
// // //                         }}
// // //                       >
// // //                         {transaction.category}
// // //                       </span>
// // //                     </div>

// // //                     {/* Amount */}
// // //                     <div className="flex items-center gap-3">
// // //                       <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
// // //                         isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
// // //                       }`}>
// // //                         {isIncome ? (
// // //                           <ArrowUpRight size={18} className="text-emerald-600" />
// // //                         ) : (
// // //                           <ArrowDownLeft size={18} className="text-rose-600" />
// // //                         )}
// // //                         <span className="text-lg">
// // //                           {isIncome ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Add Transaction Modal */}
// // //         {showModal && (
// // //           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// // //             <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
// // //               <div className="flex items-center justify-between mb-6">
// // //                 <h3 className="text-2xl font-bold text-slate-800">Add Transaction</h3>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
// // //                 >
// // //                   <X size={20} className="text-slate-600" />
// // //                 </button>
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <div>
// // //                   <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
// // //                   <div className="grid grid-cols-2 gap-3">
// // //                     <button
// // //                       onClick={() => setNewTransaction({...newTransaction, type: 'income'})}
// // //                       className={`p-4 rounded-xl border-2 font-semibold transition-all ${
// // //                         newTransaction.type === 'income'
// // //                           ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
// // //                           : 'border-slate-300 hover:border-slate-400'
// // //                       }`}
// // //                     >
// // //                       <TrendingUp className="w-5 h-5 mx-auto mb-1" />
// // //                       Income
// // //                     </button>
// // //                     <button
// // //                       onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
// // //                       className={`p-4 rounded-xl border-2 font-semibold transition-all ${
// // //                         newTransaction.type === 'expense'
// // //                           ? 'border-rose-500 bg-rose-50 text-rose-700'
// // //                           : 'border-slate-300 hover:border-slate-400'
// // //                       }`}
// // //                     >
// // //                       <TrendingDown className="w-5 h-5 mx-auto mb-1" />
// // //                       Expense
// // //                     </button>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
// // //                   <input
// // //                     type="text"
// // //                     value={newTransaction.description}
// // //                     onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
// // //                     placeholder="Enter description..."
// // //                     className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-semibold text-slate-700 mb-2">Merchant</label>
// // //                   <input
// // //                     type="text"
// // //                     value={newTransaction.merchant}
// // //                     onChange={(e) => setNewTransaction({...newTransaction, merchant: e.target.value})}
// // //                     placeholder="Enter merchant name..."
// // //                     className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
// // //                   />
// // //                 </div>

// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (₹) *</label>
// // //                     <input
// // //                       type="number"
// // //                       value={newTransaction.amount}
// // //                       onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
// // //                       placeholder="0.00"
// // //                       className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
// // //                     <input
// // //                       type="date"
// // //                       value={newTransaction.date}
// // //                       onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
// // //                       className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
// // //                   <select
// // //                     value={newTransaction.category}
// // //                     onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
// // //                     className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
// // //                   >
// // //                     <option value="Salary">Salary</option>
// // //                     <option value="Freelance">Freelance</option>
// // //                     <option value="Groceries">Groceries</option>
// // //                     <option value="Food & Dining">Food & Dining</option>
// // //                     <option value="Housing">Housing</option>
// // //                     <option value="Transportation">Transportation</option>
// // //                     <option value="Entertainment">Entertainment</option>
// // //                     <option value="Bills">Bills</option>
// // //                     <option value="Healthcare">Healthcare</option>
// // //                     <option value="Shopping">Shopping</option>
// // //                   </select>
// // //                 </div>

// // //                 <div className="flex gap-3 pt-4">
// // //                   <button
// // //                     onClick={handleAddTransaction}
// // //                     className="flex-1 py-3 px-6 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
// // //                   >
// // //                     Add Transaction
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setShowModal(false)}
// // //                     className="flex-1 py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TransactionHistory;
