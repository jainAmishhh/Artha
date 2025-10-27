import React from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TodoFilters = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 px-2">
      {/* Search Bar */}
      <div className="flex items-center w-full md:w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 bg-transparent"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center gap-4">
        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none"
        >
          <option value="">All</option>
          <option value="completed">✅ Completed</option>
          <option value="pending">🕒 Pending</option>
        </select>

        {/* Sort by Date */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-xl text-sm shadow-md hover:scale-105 transition"
        >
          {sortOrder === 'asc' ? (
            <>
              <ArrowDownLeft className="w-4 h-4" /> Oldest First
            </>
          ) : (
            <>
              <ArrowUpRight className="w-4 h-4" /> Newest First
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoFilters;
