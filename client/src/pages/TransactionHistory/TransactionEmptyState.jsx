import React from "react";
import { Search } from "lucide-react";

const TransactionEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="p-4 rounded-2xl mx-auto w-fit mb-4" style={{ background: 'rgba(244, 197, 66, 0.1)' }}>
        <Search className="w-8 h-8" style={{ color: '#F4C542' }} />
      </div>
      <p className="text-lg font-medium" style={{ color: '#FAFAFA' }}>No transactions found</p>
      <p className="text-sm" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>Try adjusting your filters or search terms</p>
    </div>
  );
};

export default TransactionEmptyState;
