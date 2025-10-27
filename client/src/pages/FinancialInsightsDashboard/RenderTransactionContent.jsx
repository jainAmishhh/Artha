import React from "react";
import { Calendar, Search } from "lucide-react";

// Date formatter utility
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RenderTransactionContent = ({ filteredTransactions }) => {
  return (
    <div
      className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "#FAFAFA" }}>
          Recent Transactions ({filteredTransactions.length})
        </h2>
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "rgba(250, 250, 250, 0.6)" }}
        >
          <Calendar className="w-4 h-4" />
          Last 30 days
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div
              className="p-4 rounded-2xl mx-auto w-fit mb-4"
              style={{ background: "rgba(244, 197, 66, 0.1)" }}
            >
              <Search className="w-8 h-8" style={{ color: "#F4C542" }} />
            </div>
            <p className="text-lg font-medium" style={{ color: "#FAFAFA" }}>
              No transactions found
            </p>
            <p className="text-sm" style={{ color: "rgba(250, 250, 250, 0.6)" }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const IconComponent = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
                style={{ background: "rgba(250, 250, 250, 0.05)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${transaction.color}20` }}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      style={{ color: transaction.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: "#FAFAFA" }}>
                      {transaction.description}
                    </h3>
                    <div
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(250, 250, 250, 0.6)" }}
                    >
                      <span>{transaction.merchant}</span>
                      <span>•</span>
                      <span>
                        {formatDate(transaction.date)} at {transaction.time}
                      </span>
                      <span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: `${transaction.color}20`,
                          color: transaction.color,
                        }}
                      >
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      transaction.amount > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}₹
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(250, 250, 250, 0.5)" }}
                  >
                    {transaction.type === "income" ? "Credit" : "Debit"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RenderTransactionContent;


// import React from 'react'

// const RenderTransactionContent = () => {
//     return (
//       <div
//         className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
//         style={{
//           background: "rgba(250, 250, 250, 0.08)",
//           borderColor: "rgba(244, 197, 66, 0.2)",
//         }}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold" style={{ color: "#FAFAFA" }}>
//             Recent Transactions ({filteredTransactions.length})
//           </h2>
//           <div
//             className="flex items-center gap-2 text-sm"
//             style={{ color: "rgba(250, 250, 250, 0.6)" }}
//           >
//             <Calendar className="w-4 h-4" />
//             Last 30 days
//           </div>
//         </div>

//         <div className="space-y-4 max-h-96 overflow-y-auto">
//           {filteredTransactions.length === 0 ? (
//             <div className="text-center py-12">
//               <div
//                 className="p-4 rounded-2xl mx-auto w-fit mb-4"
//                 style={{ background: "rgba(244, 197, 66, 0.1)" }}
//               >
//                 <Search className="w-8 h-8" style={{ color: "#F4C542" }} />
//               </div>
//               <p className="text-lg font-medium" style={{ color: "#FAFAFA" }}>
//                 No transactions found
//               </p>
//               <p
//                 className="text-sm"
//                 style={{ color: "rgba(250, 250, 250, 0.6)" }}
//               >
//                 Try adjusting your filters or search terms
//               </p>
//             </div>
//           ) : (
//             filteredTransactions.map((transaction) => {
//               const IconComponent = transaction.icon;
//               return (
//                 <div
//                   key={transaction.id}
//                   className="flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
//                   style={{ background: "rgba(250, 250, 250, 0.05)" }}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
//                       style={{ background: `₹{transaction.color}20` }}
//                     >
//                       <IconComponent
//                         className="w-6 h-6"
//                         style={{ color: transaction.color }}
//                       />
//                     </div>
//                     <div>
//                       <h3
//                         className="font-semibold"
//                         style={{ color: "#FAFAFA" }}
//                       >
//                         {transaction.description}
//                       </h3>
//                       <div
//                         className="flex items-center gap-3 text-sm"
//                         style={{ color: "rgba(250, 250, 250, 0.6)" }}
//                       >
//                         <span>{transaction.merchant}</span>
//                         <span>•</span>
//                         <span>
//                           {formatDate(transaction.date)} at {transaction.time}
//                         </span>
//                         <span
//                           className="px-2 py-1 rounded-full text-xs"
//                           style={{
//                             background: `₹{transaction.color}20`,
//                             color: transaction.color,
//                           }}
//                         >
//                           {transaction.category}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div
//                       className={`text-lg font-bold ₹{transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}
//                     >
//                       {transaction.amount > 0 ? "+" : ""}₹
//                       {Math.abs(transaction.amount).toLocaleString()}
//                     </div>
//                     <div
//                       className="text-xs"
//                       style={{ color: "rgba(250, 250, 250, 0.5)" }}
//                     >
//                       {transaction.type === "income" ? "Credit" : "Debit"}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     );
//   };

// export default RenderTransactionContent