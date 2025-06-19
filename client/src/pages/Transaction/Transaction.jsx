import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ArrowLeft, Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, RefreshCw, BarChart3, DollarSign, Sparkles, Filter, ArrowUpRight, ArrowDownLeft, Calendar, ChevronDown, Eye, Download } from 'lucide-react';

const TransactionDashboard = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('All');
  const [activeCategoryFilter, setCategoryFilter] = useState('All');
  const [activeTypeFilter, setTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [transactions] = useState([
    {
      id: 1,
      description: 'Online Course - React Mastery',
      amount: -199,
      category: 'Education',
      type: 'expense',
      date: '2025-06-18',
      time: '14:30',
      merchant: 'Udemy',
      icon: BookOpen,
      color: '#F4C542'
    },
    {
      id: 2,
      description: 'Emergency Fund Deposit',
      amount: +500,
      category: 'Emergency',
      type: 'income',
      date: '2025-06-17',
      time: '09:15',
      merchant: 'Bank Transfer',
      icon: AlertTriangle,
      color: '#8B1C22'
    },
    {
      id: 3,
      description: 'Monthly Rent Payment',
      amount: -1200,
      category: 'Housing',
      type: 'expense',
      date: '2025-06-15',
      time: '08:00',
      merchant: 'Property Management',
      icon: Home,
      color: '#22543D'
    },
    {
      id: 4,
      description: 'Freelance Payment',
      amount: +850,
      category: 'Income',
      type: 'income',
      date: '2025-06-14',
      time: '16:45',
      merchant: 'Client ABC',
      icon: DollarSign,
      color: '#059669'
    },
    {
      id: 5,
      description: 'Programming Books',
      amount: -89,
      category: 'Education',
      type: 'expense',
      date: '2025-06-13',
      time: '11:20',
      merchant: 'Amazon',
      icon: BookOpen,
      color: '#F4C542'
    },
    {
      id: 6,
      description: 'Utilities Bill',
      amount: -145,
      category: 'Housing',
      type: 'expense',
      date: '2025-06-12',
      time: '10:30',
      merchant: 'Electric Company',
      icon: Home,
      color: '#22543D'
    },
    {
      id: 7,
      description: 'Side Project Income',
      amount: +320,
      category: 'Income',
      type: 'income',
      date: '2025-06-11',
      time: '19:15',
      merchant: 'App Store',
      icon: DollarSign,
      color: '#059669'
    },
    {
      id: 8,
      description: 'Certification Course',
      amount: -299,
      category: 'Education',
      type: 'expense',
      date: '2025-06-10',
      time: '13:45',
      merchant: 'Coursera',
      icon: BookOpen,
      color: '#F4C542'
    },
    {
      id: 9,
      description: 'Home Insurance',
      amount: -180,
      category: 'Housing',
      type: 'expense',
      date: '2025-06-09',
      time: '15:20',
      merchant: 'Insurance Co.',
      icon: Home,
      color: '#22543D'
    },
    {
      id: 10,
      description: 'Emergency Withdrawal',
      amount: -75,
      category: 'Emergency',
      type: 'expense',
      date: '2025-06-08',
      time: '12:10',
      merchant: 'ATM',
      icon: AlertTriangle,
      color: '#8B1C22'
    }
  ]);

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategoryFilter === 'All' || transaction.category === activeCategoryFilter;
      const matchesType = activeTypeFilter === 'All' || transaction.type === activeTypeFilter;
      
      let matchesTime = true;
      if (activeTimeFilter !== 'All') {
        const transactionDate = new Date(transaction.date);
        const today = new Date();
        const daysDiff = Math.floor((today - transactionDate) / (1000 * 60 * 60 * 24));
        
        switch (activeTimeFilter) {
          case 'Today':
            matchesTime = daysDiff === 0;
            break;
          case '7 Days':
            matchesTime = daysDiff <= 7;
            break;
          case '30 Days':
            matchesTime = daysDiff <= 30;
            break;
          default:
            matchesTime = true;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesTime;
    });
  };

  const filteredTransactions = getFilteredTransactions();
  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalIncome - totalExpenses;

  const categories = ['All', ...new Set(transactions.map(t => t.category))];
  const timeFilters = ['All', 'Today', '7 Days', '30 Days'];
  const typeFilters = ['All', 'income', 'expense'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
                  Transaction History
                  <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#F4C542'}} />
                </h1>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Track all your financial activities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(5, 150, 105, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(5, 150, 105, 0.2)'}}>
                <ArrowDownLeft className="w-6 h-6" style={{color: '#059669'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Total Income</p>
                <p className="text-2xl font-bold" style={{color: '#059669'}}>+${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(239, 68, 68, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(239, 68, 68, 0.2)'}}>
                <ArrowUpRight className="w-6 h-6" style={{color: '#EF4444'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Total Expenses</p>
                <p className="text-2xl font-bold" style={{color: '#EF4444'}}>-${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                <TrendingUp className="w-6 h-6" style={{color: '#F4C542'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Net Balance</p>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {netBalance >= 0 ? '+' : ''}${netBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                style={{
                  background: 'rgba(250, 250, 250, 0.1)',
                  borderColor: 'rgba(244, 197, 66, 0.3)',
                  color: '#FAFAFA'
                }}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105"
              style={{
                background: showFilters ? 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)' : 'rgba(250, 250, 250, 0.1)',
                borderColor: 'rgba(244, 197, 66, 0.3)',
                color: showFilters ? '#FFFFFF' : '#FAFAFA'
              }}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t" style={{borderColor: 'rgba(244, 197, 66, 0.2)'}}>
              {/* Time Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Time Period</label>
                <select
                  value={activeTimeFilter}
                  onChange={(e) => setActiveTimeFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {timeFilters.map(filter => (
                    <option key={filter} value={filter} style={{background: '#1A4B35', color: '#FAFAFA'}}>{filter}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Category</label>
                <select
                  value={activeCategoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category} style={{background: '#1A4B35', color: '#FAFAFA'}}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Type</label>
                <select
                  value={activeTypeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {typeFilters.map(type => (
                    <option key={type} value={type} style={{background: '#1A4B35', color: '#FAFAFA'}}>
                      {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Transaction List */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>
              Recent Transactions ({filteredTransactions.length})
            </h2>
            <div className="flex items-center gap-2 text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
              <Calendar className="w-4 h-4" />
              Last 30 days
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 rounded-2xl mx-auto w-fit mb-4" style={{background: 'rgba(244, 197, 66, 0.1)'}}>
                  <Search className="w-8 h-8" style={{color: '#F4C542'}} />
                </div>
                <p className="text-lg font-medium" style={{color: '#FAFAFA'}}>No transactions found</p>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => {
                const IconComponent = transaction.icon;
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
                    style={{background: 'rgba(250, 250, 250, 0.05)'}}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{background: `${transaction.color}20`}}
                      >
                        <IconComponent className="w-6 h-6" style={{color: transaction.color}} />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{color: '#FAFAFA'}}>{transaction.description}</h3>
                        <div className="flex items-center gap-3 text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
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
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <div className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>
                        {transaction.type === 'income' ? 'Credit' : 'Debit'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Navigation - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4" style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(244, 197, 66, 0.2)'
        }}>
          <div className="flex justify-around max-w-md mx-auto">
            {[
              { icon: Home, label: 'Home', active: false },
              { icon: RefreshCw, label: 'Transaction', active: true },
              { icon: BarChart3, label: 'Plan', active: false },
              { icon: DollarSign, label: 'Budget', active: false }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                    item.active ? 'scale-110' : ''
                  }`}
                  style={item.active 
                    ? {
                        background: 'rgba(244, 197, 66, 0.2)',
                        color: '#FAFAFA'
                      }
                    : {
                        color: 'rgba(250, 250, 250, 0.6)'
                      }
                  }
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;