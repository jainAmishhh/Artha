import React, { useState } from "react";
import { 
  Wallet, TrendingUp, TrendingDown, CreditCard, Building2, 
  Eye, EyeOff, RefreshCw, Download, Plus, ArrowUpRight, 
  ArrowDownRight, Calendar, PieChart, Target, AlertCircle,
  CheckCircle, Clock, DollarSign, Sparkles, User, Settings,
  Bell, Lock, Globe, Moon, Sun, LogOut, Mail, Phone,
  MapPin, Camera, Edit3, Shield, Trash2, Save, X
} from "lucide-react";

const AccountSection = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    transactions: true,
    budgetAlerts: true,
    dailyDigest: false,
    marketing: false
  });

  // User data
  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    avatar: "P",
    joinedDate: "January 2024",
    membershipTier: "Premium"
  });

  // Mock data
  const bankAccounts = [
    {
      id: 1,
      bankName: "HDFC Bank",
      accountNumber: "****7890",
      balance: 45750.50,
      type: "Savings",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      accountNumber: "****4521",
      balance: 23400.00,
      type: "Current",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const monthlyBudget = {
    total: 50000,
    spent: 32450.50,
    remaining: 17549.50,
    categories: [
      { name: "Food & Dining", budget: 10000, spent: 8450, color: "emerald" },
      { name: "Transportation", budget: 5000, spent: 4200, color: "blue" },
      { name: "Shopping", budget: 15000, spent: 12800, color: "purple" },
      { name: "Bills & Utilities", budget: 8000, spent: 7000.50, color: "amber" },
      { name: "Entertainment", budget: 7000, spent: 0, color: "rose" },
      { name: "Others", budget: 5000, spent: 0, color: "slate" }
    ]
  };

  const recentTransactions = [
    {
      id: 1,
      type: "expense",
      category: "Food & Dining",
      description: "Swiggy Order",
      amount: 450,
      date: "2025-11-16",
      time: "02:30 PM",
      icon: "🍽️"
    },
    {
      id: 2,
      type: "income",
      category: "Salary",
      description: "Monthly Salary Credited",
      amount: 65000,
      date: "2025-11-15",
      time: "09:00 AM",
      icon: "💰"
    },
    {
      id: 3,
      type: "expense",
      category: "Shopping",
      description: "Amazon Purchase",
      amount: 2499,
      date: "2025-11-14",
      time: "05:45 PM",
      icon: "🛍️"
    },
    {
      id: 4,
      type: "expense",
      category: "Transportation",
      description: "Uber Ride",
      amount: 250,
      date: "2025-11-14",
      time: "11:20 AM",
      icon: "🚗"
    }
  ];

  const insights = [
    {
      title: "Spending Alert",
      description: "You've spent 80% of your Shopping budget",
      type: "warning",
      icon: AlertCircle,
      color: "amber"
    },
    {
      title: "Great Job!",
      description: "You're under budget in Transportation",
      type: "success",
      icon: CheckCircle,
      color: "emerald"
    },
    {
      title: "Savings Goal",
      description: "Save ₹5,000 more to reach your monthly target",
      type: "info",
      icon: Target,
      color: "blue"
    }
  ];

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const budgetPercentage = (monthlyBudget.spent / monthlyBudget.total) * 100;

  const tabs = [
    { id: "overview", label: "Overview", icon: Wallet },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="text-white" size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">My Account</h1>
          </div>
          <p className="text-slate-600 ml-13">Manage your profile, finances, and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Total Balance Card */}
            <div className="relative mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium mb-2">Total Balance</p>
                    <div className="flex items-center gap-4">
                      <h2 className="text-4xl md:text-5xl font-black text-white">
                        {showBalance ? `₹${totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '₹••••••'}
                      </h2>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
                      <RefreshCw size={20} className="text-white" />
                    </button>
                    <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
                      <Download size={20} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-emerald-200" />
                      <p className="text-emerald-100 text-xs font-medium">Income</p>
                    </div>
                    <p className="text-white text-xl font-bold">₹80,000</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown size={16} className="text-rose-200" />
                      <p className="text-emerald-100 text-xs font-medium">Expenses</p>
                    </div>
                    <p className="text-white text-xl font-bold">₹32,451</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-amber-200" />
                      <p className="text-emerald-100 text-xs font-medium">Saved</p>
                    </div>
                    <p className="text-white text-xl font-bold">₹47,549</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Building2 className="text-emerald-600" size={24} />
                  Linked Bank Accounts
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all">
                  <Plus size={18} />
                  Add Account
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="group bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className={`h-2 bg-gradient-to-r ${account.color}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-slate-600 text-sm mb-1">{account.type} Account</p>
                          <h3 className="text-xl font-bold text-slate-800">{account.bankName}</h3>
                          <p className="text-slate-500 text-sm mt-1">{account.accountNumber}</p>
                        </div>
                        <CreditCard className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={28} />
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-slate-500 text-xs mb-1">Available Balance</p>
                          <p className="text-2xl font-bold text-slate-800">
                            ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Overview */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Target className="text-emerald-600" size={24} />
                  Monthly Budget
                </h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-xl bg-white text-slate-700 font-medium"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-600 text-sm mb-1">Budget Status</p>
                    <p className="text-3xl font-bold text-slate-800">
                      ₹{monthlyBudget.spent.toLocaleString('en-IN')} / ₹{monthlyBudget.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600 text-sm mb-1">Remaining</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{monthlyBudget.remaining.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                
                <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                      budgetPercentage > 90 ? 'bg-gradient-to-r from-rose-500 to-rose-600' :
                      budgetPercentage > 75 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                      'bg-gradient-to-r from-emerald-500 to-emerald-600'
                    }`}
                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-slate-500 text-sm text-right">
                  {budgetPercentage.toFixed(1)}% of budget used
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyBudget.categories.map((category, i) => {
                  const percentage = (category.spent / category.budget) * 100;
                  const isOverBudget = category.spent > category.budget;
                  
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-slate-800 mb-1">{category.name}</h4>
                          <p className="text-sm text-slate-500">
                            ₹{category.spent.toLocaleString('en-IN')} / ₹{category.budget.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isOverBudget ? 'bg-rose-100 text-rose-700' :
                          percentage > 75 ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                      
                      <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full rounded-full transition-all bg-gradient-to-r from-${category.color}-500 to-${category.color}-600`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights & Recent Transactions */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* AI Insights */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <PieChart className="text-emerald-600" size={24} />
                  AI Insights
                </h2>
                
                <div className="space-y-4">
                  {insights.map((insight, i) => {
                    const Icon = insight.icon;
                    return (
                      <div
                        key={i}
                        className={`bg-white rounded-xl border border-${insight.color}-200 p-4 hover:shadow-lg transition-all`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 bg-${insight.color}-100 rounded-lg`}>
                            <Icon className={`text-${insight.color}-600`} size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 mb-1">{insight.title}</h4>
                            <p className="text-sm text-slate-600">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="text-emerald-600" size={24} />
                    Recent Transactions
                  </h2>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                    View All →
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{transaction.icon}</div>
                          <div>
                            <h4 className="font-bold text-slate-800">{transaction.description}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-500">{transaction.category}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-500">{transaction.date}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-500">{transaction.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`flex items-center gap-1 ${
                            transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {transaction.type === 'income' ? (
                              <ArrowDownRight size={18} />
                            ) : (
                              <ArrowUpRight size={18} />
                            )}
                            <span className="text-lg font-bold">
                              {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                    {userData.avatar}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                    <Camera size={18} className="text-slate-600" />
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-slate-800">{userData.name}</h2>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full">
                      <Sparkles size={12} />
                      {userData.membershipTier}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">Member since {userData.joinedDate}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={16} />
                      <span className="text-sm">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={16} />
                      <span className="text-sm">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      <span className="text-sm">{userData.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Edit Profile Form */}
            {isEditingProfile && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={userData.location}
                      onChange={(e) => setUserData({...userData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Account Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                <Wallet size={32} className="mb-4 opacity-80" />
                <p className="text-emerald-100 text-sm mb-1">Total Savings</p>
                <p className="text-3xl font-bold">₹2.4L</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <TrendingUp size={32} className="mb-4 opacity-80" />
                <p className="text-blue-100 text-sm mb-1">Monthly Growth</p>
                <p className="text-3xl font-bold">+12.5%</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <Target size={32} className="mb-4 opacity-80" />
                <p className="text-amber-100 text-sm mb-1">Goals Achieved</p>
                <p className="text-3xl font-bold">8/10</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-emerald-600" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Notifications</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {key === 'transactions' && 'Get notified about every transaction'}
                        {key === 'budgetAlerts' && 'Receive alerts when nearing budget limits'}
                        {key === 'dailyDigest' && 'Daily summary of your financial activity'}
                        {key === 'marketing' && 'Promotional offers and updates'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [key]: !value})}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        value ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                        value ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                {theme === 'light' ? <Sun className="text-emerald-600" size={24} /> : <Moon className="text-emerald-600" size={24} />}
                <h3 className="text-2xl font-bold text-slate-800">Appearance</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'auto'].map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => setTheme(themeOption)}
                        className={`p-4 border-2 rounded-xl transition-all capitalize ${
                          theme === themeOption
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {themeOption === 'light' && <Sun size={24} className="text-slate-600" />}
                          {themeOption === 'dark' && <Moon size={24} className="text-slate-600" />}
                          {themeOption === 'auto' && <Globe size={24} className="text-slate-600" />}
                          <span className="font-semibold text-slate-800">{themeOption}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Language</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>English</option>
                    <option>हिंदी (Hindi)</option>
                    <option>मराठी (Marathi)</option>
                    <option>বাংলা (Bengali)</option>
                    <option>தமிழ் (Tamil)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Currency</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>₹ INR - Indian Rupee</option>
                    <option>$ USD - US Dollar</option>
                    <option>€ EUR - Euro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-emerald-600" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Security & Privacy</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Change Password</h4>
                      <p className="text-sm text-slate-600">Update your password regularly</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    Recommended
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Eye size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Privacy Settings</h4>
                      <p className="text-sm text-slate-600">Manage your data and privacy</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Login History</h4>
                      <p className="text-sm text-slate-600">View recent account activity</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Download className="text-emerald-600" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Data Management</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Export Data</h4>
                      <p className="text-sm text-slate-600">Download all your financial data</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <RefreshCw size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Sync Settings</h4>
                      <p className="text-sm text-slate-600">Manage bank account synchronization</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-emerald-600" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Support & Help</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Contact Support</h4>
                      <p className="text-sm text-slate-600">Get help from our team</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Help Center</h4>
                      <p className="text-sm text-slate-600">Browse FAQs and guides</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-slate-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">Terms & Privacy</h4>
                      <p className="text-sm text-slate-600">Read our policies</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl border-2 border-rose-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="text-rose-600" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Danger Zone</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors border border-rose-200">
                  <div className="flex items-center gap-3">
                    <LogOut size={20} className="text-rose-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-rose-700">Log Out</h4>
                      <p className="text-sm text-rose-600">Sign out from your account</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-rose-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors border border-rose-200">
                  <div className="flex items-center gap-3">
                    <Trash2 size={20} className="text-rose-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-rose-700">Delete Account</h4>
                      <p className="text-sm text-rose-600">Permanently delete your account and data</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-rose-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;

// import React, { useState } from 'react';
// import { 
//   User, Mail, Lock, Bell, Shield, CreditCard, Globe, Moon, Sun, 
//   Camera, Edit3, Save, X, Eye, EyeOff, Trash2, Download, 
//   Smartphone, MapPin, Calendar, Phone, Building, AlertTriangle,
//   CheckCircle, Settings, LogOut, ArrowRight, Sparkles
// } from 'lucide-react';

// const AccountSection = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState({
//     email: true,
//     push: true,
//     sms: false,
//     marketing: false
//   });
  
//   const [profileData, setProfileData] = useState({
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@email.com',
//     phone: '+1 (555) 123-4567',
//     location: 'New York, NY',
//     company: 'Tech Solutions Inc.',
//     joinDate: 'January 2024',
//     bio: 'Financial analyst passionate about smart money management and AI-driven insights.'
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleProfileUpdate = () => {
//     setIsEditing(false);
//     // Handle profile update logic here
//     console.log('Profile updated:', profileData);
//   };

//   const handlePasswordChange = () => {
//     // Handle password change logic here
//     console.log('Password change requested');
//     setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   };

//   const handleNotificationToggle = (type) => {
//     setNotifications(prev => ({
//       ...prev,
//       [type]: !prev[type]
//     }));
//   };

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'preferences', label: 'Preferences', icon: Settings },
//     { id: 'billing', label: 'Billing', icon: CreditCard }
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="space-y-8">
//             {/* Profile Header */}
//             <div className="flex items-start gap-6">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
//                   <div className="w-full h-full flex items-center justify-center">
//                     <User className="w-12 h-12 text-white" />
//                   </div>
//                 </div>
//                 <button className="absolute -bottom-2 -right-2 p-2 rounded-xl shadow-lg hover:scale-105 transition-transform" 
//                         style={{background: 'rgba(244, 197, 66, 0.9)'}}>
//                   <Camera className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h2 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>{profileData.name}</h2>
//                   <button 
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="p-2 rounded-xl hover:scale-105 transition-all"
//                     style={{background: 'rgba(244, 197, 66, 0.2)'}}
//                   >
//                     {isEditing ? <X className="w-4 h-4" style={{color: '#F4C542'}} /> : <Edit3 className="w-4 h-4" style={{color: '#F4C542'}} />}
//                   </button>
//                 </div>
//                 <p className="text-sm mb-3" style={{color: 'rgba(250, 250, 250, 0.7)'}}>{profileData.bio}</p>
//                 <div className="flex items-center gap-4 text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
//                   <span className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     Joined {profileData.joinDate}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MapPin className="w-4 h-4" />
//                     {profileData.location}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Form */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Full Name</label>
//                 <input
//                   type="text"
//                   value={profileData.name}
//                   onChange={(e) => setProfileData({...profileData, name: e.target.value})}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Email Address</label>
//                 <input
//                   type="email"
//                   value={profileData.email}
//                   onChange={(e) => setProfileData({...profileData, email: e.target.value})}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Location</label>
//                 <input
//                   type="text"
//                   value={profileData.location}
//                   onChange={(e) => setProfileData({...profileData, location: e.target.value})}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Company</label>
//                 <input
//                   type="text"
//                   value={profileData.company}
//                   onChange={(e) => setProfileData({...profileData, company: e.target.value})}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Bio</label>
//                 <textarea
//                   value={profileData.bio}
//                   onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
//                   disabled={!isEditing}
//                   rows={3}
//                   className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 resize-none"
//                   style={{
//                     background: 'rgba(250, 250, 250, 0.1)',
//                     borderColor: 'rgba(244, 197, 66, 0.3)',
//                     color: '#FAFAFA'
//                   }}
//                 />
//               </div>
//             </div>

//             {isEditing && (
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleProfileUpdate}
//                   className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all"
//                   style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}
//                 >
//                   <Save className="w-4 h-4" />
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="px-6 py-3 rounded-2xl border hover:scale-105 transition-all"
//                   style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         );

//       case 'security':
//         return (
//           <div className="space-y-8">
//             {/* Password Change */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Change Password</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Current Password</label>
//                   <div className="relative">
//                     <input
//                       type={showCurrentPassword ? 'text' : 'password'}
//                       value={passwordData.currentPassword}
//                       onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
//                       className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
//                       style={{
//                         background: 'rgba(250, 250, 250, 0.1)',
//                         borderColor: 'rgba(244, 197, 66, 0.3)',
//                         color: '#FAFAFA'
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       {showCurrentPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>New Password</label>
//                   <div className="relative">
//                     <input
//                       type={showNewPassword ? 'text' : 'password'}
//                       value={passwordData.newPassword}
//                       onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
//                       className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
//                       style={{
//                         background: 'rgba(250, 250, 250, 0.1)',
//                         borderColor: 'rgba(244, 197, 66, 0.3)',
//                         color: '#FAFAFA'
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       {showNewPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Confirm New Password</label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       value={passwordData.confirmPassword}
//                       onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
//                       className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
//                       style={{
//                         background: 'rgba(250, 250, 250, 0.1)',
//                         borderColor: 'rgba(244, 197, 66, 0.3)',
//                         color: '#FAFAFA'
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handlePasswordChange}
//                   className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all"
//                   style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}
//                 >
//                   <Lock className="w-4 h-4" />
//                   Update Password
//                 </button>
//               </div>
//             </div>

//             {/* Two-Factor Authentication */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Two-Factor Authentication</h3>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Add an extra layer of security to your account</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5" style={{color: '#059669'}} />
//                   <span className="text-sm font-medium" style={{color: '#059669'}}>Enabled</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Smartphone className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.7)'}} />
//                 <span className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Authenticator app configured</span>
//                 <button className="ml-auto text-sm hover:underline" style={{color: '#F4C542'}}>
//                   Reconfigure
//                 </button>
//               </div>
//             </div>

//             {/* Active Sessions */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Active Sessions</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                       <Globe className="w-4 h-4" style={{color: '#F4C542'}} />
//                     </div>
//                     <div>
//                       <p className="font-medium" style={{color: '#FAFAFA'}}>Chrome on Windows</p>
//                       <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.6)'}}>New York, NY • Current session</p>
//                     </div>
//                   </div>
//                   <span className="text-xs px-2 py-1 rounded-lg" style={{background: 'rgba(5, 150, 105, 0.2)', color: '#059669'}}>
//                     Active
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                       <Smartphone className="w-4 h-4" style={{color: '#F4C542'}} />
//                     </div>
//                     <div>
//                       <p className="font-medium" style={{color: '#FAFAFA'}}>Mobile App</p>
//                       <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Last active 2 hours ago</p>
//                     </div>
//                   </div>
//                   <button className="text-xs px-3 py-1 rounded-lg hover:scale-105 transition-all" style={{background: 'rgba(220, 38, 127, 0.2)', color: '#DC2678'}}>
//                     Revoke
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'notifications':
//         return (
//           <div className="space-y-6">
//             {[
//               {
//                 key: 'email',
//                 title: 'Email Notifications',
//                 description: 'Receive notifications via email about account activity and updates',
//                 icon: Mail
//               },
//               {
//                 key: 'push',
//                 title: 'Push Notifications',
//                 description: 'Get real-time notifications on your devices',
//                 icon: Bell
//               },
//               {
//                 key: 'sms',
//                 title: 'SMS Notifications',
//                 description: 'Receive important alerts via text message',
//                 icon: Phone
//               },
//               {
//                 key: 'marketing',
//                 title: 'Marketing Communications',
//                 description: 'Updates about new features, tips, and promotional offers',
//                 icon: Sparkles
//               }
//             ].map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <div key={item.key} className="flex items-center justify-between p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                       <IconComponent className="w-5 h-5" style={{color: '#F4C542'}} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold" style={{color: '#FAFAFA'}}>{item.title}</h3>
//                       <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>{item.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleNotificationToggle(item.key)}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ₹{
//                       notifications[item.key] ? 'bg-yellow-400' : 'bg-gray-600'
//                     }`}
//                   >
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ₹{
//                         notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
//                       }`}
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         );

//       case 'preferences':
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                   {isDarkMode ? <Moon className="w-5 h-5" style={{color: '#F4C542'}} /> : <Sun className="w-5 h-5" style={{color: '#F4C542'}} />}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Dark Mode</h3>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Switch between light and dark themes</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsDarkMode(!isDarkMode)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ₹{
//                   isDarkMode ? 'bg-yellow-400' : 'bg-gray-600'
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ₹{
//                     isDarkMode ? 'translate-x-6' : 'translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                   <Globe className="w-5 h-5" style={{color: '#F4C542'}} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Language & Region</h3>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Set your preferred language and region</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Language</label>
//                   <select className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                           style={{
//                             background: 'rgba(250, 250, 250, 0.1)',
//                             borderColor: 'rgba(244, 197, 66, 0.3)',
//                             color: '#FAFAFA'
//                           }}>
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                     <option value="fr">French</option>
//                     <option value="de">German</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Currency</label>
//                   <select className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
//                           style={{
//                             background: 'rgba(250, 250, 250, 0.1)',
//                             borderColor: 'rgba(244, 197, 66, 0.3)',
//                             color: '#FAFAFA'
//                           }}>
//                     <option value="usd">USD (₹)</option>
//                     <option value="eur">EUR (€)</option>
//                     <option value="gbp">GBP (£)</option>
//                     <option value="jpy">JPY (¥)</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                   <Download className="w-5 h-5" style={{color: '#F4C542'}} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Data & Privacy</h3>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Manage your data and privacy settings</p>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:scale-105 transition-all" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                   <span style={{color: '#FAFAFA'}}>Download your data</span>
//                   <ArrowRight className="w-4 h-4" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
//                 </button>
//                 <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:scale-105 transition-all" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                   <span style={{color: '#FAFAFA'}}>Privacy settings</span>
//                   <ArrowRight className="w-4 h-4" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 'billing':
//         return (
//           <div className="space-y-8">
//             {/* Current Plan */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Current Plan</h3>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Pro Plan - ₹19.99/month</p>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-2xl font-bold" style={{color: '#F4C542'}}>₹19.99</span>
//                   <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>per month</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <CheckCircle className="w-5 h-5" style={{color: '#059669'}} />
//                 <span className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Next billing date: January 28, 2025</span>
//               </div>
//               <button className="px-6 py-3 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
//                 Change Plan
//               </button>
//             </div>

//             {/* Payment Method */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Payment Method</h3>
//               <div className="flex items-center justify-between p-4 rounded-2xl mb-4" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
//                     <CreditCard className="w-5 h-5" style={{color: '#F4C542'}} />
//                   </div>
//                   <div>
//                     <p className="font-medium" style={{color: '#FAFAFA'}}>•••• •••• •••• 4242</p>
//                     <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Expires 12/26</p>
//                   </div>
//                 </div>
//                 <button className="text-sm hover:underline" style={{color: '#F4C542'}}>
//                   Update
//                 </button>
//               </div>
//               <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
//                 <CreditCard className="w-4 h-4" />
//                 Add Payment Method
//               </button>
//             </div>

//             {/* Billing History */}
//             <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
//               <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Billing History</h3>
//               <div className="space-y-3">
//                 {[
//                   { date: 'Dec 28, 2024', amount: '₹19.99', status: 'Paid' },
//                   { date: 'Nov 28, 2024', amount: '₹19.99', status: 'Paid' },
//                   { date: 'Oct 28, 2024', amount: '₹19.99', status: 'Paid' }
//                 ].map((invoice, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
//                     <div>
//                       <p className="font-medium" style={{color: '#FAFAFA'}}>{invoice.date}</p>
//                       <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Pro Plan</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium" style={{color: '#FAFAFA'}}>{invoice.amount}</p>
//                       <span className="text-xs px-2 py-1 rounded-lg" style={{background: 'rgba(5, 150, 105, 0.2)', color: '#059669'}}>
//                         {invoice.status}
//                       </span>
//                     </div>
//                     <button className="text-sm hover:underline ml-4" style={{color: '#F4C542'}}>
//                       Download
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)'}}></div>
//       </div>

//       <div className="relative z-10 min-h-screen">
//         {/* Header */}
//         <div className="p-6 lg:p-8 border-b" style={{borderColor: 'rgba(244, 197, 66, 0.2)'}}>
//           <div className="max-w-6xl mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>Account Settings</h1>
//                 <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Manage your account and preferences</p>
//               </div>
//             </div>
//             <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
//               <LogOut className="w-4 h-4" />
//               Sign Out
//             </button>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto p-6 lg:p-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar */}
//             <div className="lg:w-1/4">
//               <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
//                 <nav className="space-y-2">
//                   {tabs.map((tab) => {
//                     const IconComponent = tab.icon;
//                     return (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ₹{
//                           activeTab === tab.id 
//                             ? 'scale-105 shadow-lg' 
//                             : 'hover:scale-105'
//                         }`}
//                         style={{
//                           background: activeTab === tab.id 
//                             ? 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)' 
//                             : 'rgba(250, 250, 250, 0.05)',
//                           color: activeTab === tab.id ? '#FFFFFF' : '#FAFAFA'
//                         }}
//                       >
//                         <IconComponent className="w-5 h-5" />
//                         <span className="font-medium">{tab.label}</span>
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:w-3/4">
//               <div className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
//                 {renderTabContent()}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Danger Zone */}
//         <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-8">
//           <div className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(220, 38, 127, 0.1)', borderColor: 'rgba(220, 38, 127, 0.3)'}}>
//             <div className="flex items-center gap-3 mb-4">
//               <AlertTriangle className="w-6 h-6" style={{color: '#DC2678'}} />
//               <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Danger Zone</h3>
//             </div>
//             <p className="text-sm mb-6" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
//               Once you delete your account, there is no going back. Please be certain.
//             </p>
//             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(220, 38, 127, 0.5)', color: '#DC2678'}}>
//               <Trash2 className="w-4 h-4" />
//               Delete Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSection;