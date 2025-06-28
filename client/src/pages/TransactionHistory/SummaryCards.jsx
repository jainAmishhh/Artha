import React from 'react';
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';

const SummaryCards = ({ totalIncome, totalExpenses, netBalance }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Total Income */}
      <div
        className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
        style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(5, 150, 105, 0.3)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(5, 150, 105, 0.2)' }}>
            <ArrowDownLeft className="w-6 h-6" style={{ color: '#059669' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: 'rgba(250, 250, 250, 0.7)' }}>
              Total Income
            </p>
            <p className="text-2xl font-bold" style={{ color: '#059669' }}>
              +₹{totalIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div
        className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
        style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
            <ArrowUpRight className="w-6 h-6" style={{ color: '#EF4444' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: 'rgba(250, 250, 250, 0.7)' }}>
              Total Expenses
            </p>
            <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
              -₹{totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Net Balance */}
      <div
        className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl"
        style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(244, 197, 66, 0.3)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(244, 197, 66, 0.2)' }}>
            <TrendingUp className="w-6 h-6" style={{ color: '#F4C542' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: 'rgba(250, 250, 250, 0.7)' }}>
              Net Balance
            </p>
            <p
              className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {netBalance >= 0 ? '+' : '-'}₹{Math.abs(netBalance).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;


// import React from 'react';
// import { ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';

// const SummaryCards = ({ totalIncome, totalExpenses, netBalance }) => {
//   return (
//     <div className="grid md:grid-cols-3 gap-6 mb-8">
//       {/* Income */}
//       <div className="card green">
//         <ArrowDownLeft className="icon" style={{ color: '#059669' }} />
//         <div>
//           <p className="label">Total Income</p>
//           <p className="amount text-green-400">+₹{totalIncome.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Expenses */}
//       <div className="card red">
//         <ArrowUpRight className="icon" style={{ color: '#EF4444' }} />
//         <div>
//           <p className="label">Total Expenses</p>
//           <p className="amount text-red-400">-₹{totalExpenses.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Net Balance */}
//       <div className="card yellow">
//         <TrendingUp className="icon" style={{ color: '#F4C542' }} />
//         <div>
//           <p className="label">Net Balance</p>
//           <p className={`amount ${netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//             {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryCards;
