import React from "react";
import TransactionItem from "./TransactionItem";
import TransactionEmptyState from "./TransactionEmptyState";

const TransactionList = ({ transactions = [], formatDate }) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {transactions.length === 0 ? (
        <TransactionEmptyState />
      ) : (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            formatDate={formatDate}
          />
        ))
      )}
    </div>
  );
};

export default TransactionList;


// import React from "react";
// import TransactionItem from "./TransactionItem";
// import TransactionEmptyState from "./TransactionEmptyState";

// const TransactionList = ({ transactions = [], formatDate }) => {
//   return (
//     <div className="space-y-4 max-h-96 overflow-y-auto">
//       {transactions.length === 0 ? (
//         transactions.map((transaction) => (
//           <TransactionItem
//             key={transaction.id}
//             transaction={transaction}
//             formatDate={formatDate}
//           />
//         ))
//       ) : (
//         <TransactionEmptyState />
//       )}
//     </div>
//   );
// };

// export default TransactionList;


// // import React from "react";
// // import TransactionItem from "./TransactionItem";
// // import TransactionEmptyState from "./TransactionEmptyState";

// // const TransactionList = ({ transactions, formatDate }) => {
// //   return (
// //     <div className="space-y-4 max-h-96 overflow-y-auto">
// //       {transactions.length === 0 ? (
// //         <TransactionEmptyState />
// //       ) : (
// //         transactions.map(transaction => (
// //           <TransactionItem key={transaction.id} transaction={transaction} formatDate={formatDate} />
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default TransactionList;
