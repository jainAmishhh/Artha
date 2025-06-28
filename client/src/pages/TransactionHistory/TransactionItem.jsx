import React from "react";

const TransactionItem = ({ transaction, formatDate }) => {
  const IconComponent = transaction.icon;

  return (
    <div
      className="flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
      style={{ background: 'rgba(250, 250, 250, 0.05)' }}
    >
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
          style={{ background: `${transaction.color}20` }}
        >
          <IconComponent className="w-6 h-6" style={{ color: transaction.color }} />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: '#FAFAFA' }}>{transaction.description}</h3>
          <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            <span>{transaction.merchant}</span>
            <span>•</span>
            <span>{formatDate(transaction.date)} at {transaction.time}</span>
            <span className="px-2 py-1 rounded-full text-xs" style={{
              background: `${transaction.color}20`,
              color: transaction.color
            }}>
              {transaction.category}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
        </div>
        <div className="text-xs" style={{ color: 'rgba(250, 250, 250, 0.5)' }}>
          {transaction.type === 'income' ? 'Credit' : 'Debit'}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
