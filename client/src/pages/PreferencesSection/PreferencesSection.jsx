import React, { useState } from "react";
import { 
  Settings, Bell, Moon, Sun, Globe, DollarSign, Calendar,
  Palette, Lock, Eye, EyeOff, Smartphone, Mail, MessageSquare,
  CreditCard, PieChart, TrendingUp, Target, Zap, Shield,
  Clock, Volume2, VolumeX, Check, AlertCircle, Sparkles,
  Download, Upload, RefreshCw, Trash2, Save
} from "lucide-react";

const PreferencesSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [preferences, setPreferences] = useState({
    // General
    theme: "light",
    language: "english",
    currency: "inr",
    dateFormat: "dd/mm/yyyy",
    timeFormat: "12h",
    
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    budgetAlerts: true,
    savingsGoals: true,
    weeklyReports: true,
    monthlyDigest: true,
    promotionalEmails: false,
    soundEnabled: true,
    
    // Display
    showBalance: true,
    compactView: false,
    animations: true,
    highContrast: false,
    fontSize: "medium",
    chartType: "line",
    
    // Privacy
    dataSharing: false,
    analytics: true,
    marketingCookies: false,
    biometricAuth: false,
    autoLock: true,
    autoLockTime: "5",
    
    // Budget
    budgetCycle: "monthly",
    defaultBudgetCategory: "miscellaneous",
    overspendingWarning: 80,
    savingsPercentage: 20,
    
    // Transactions
    autoCategories: true,
    duplicateDetection: true,
    merchantNames: true,
    transactionNotes: true
  });

  const categories = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "display", label: "Display", icon: Palette },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "budget", label: "Budget Settings", icon: Target },
    { id: "transactions", label: "Transactions", icon: CreditCard }
  ];

  const togglePreference = (key) => {
    setPreferences({...preferences, [key]: !preferences[key]});
  };

  const updatePreference = (key, value) => {
    setPreferences({...preferences, [key]: value});
  };

  const handleSavePreferences = () => {
    alert("Preferences saved successfully!");
  };

  const handleResetPreferences = () => {
    if (confirm("Are you sure you want to reset all preferences to default?")) {
      alert("Preferences reset to default!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="text-white" size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Preferences</h1>
          </div>
          <p className="text-slate-600 ml-13">Customize your Artha experience</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-8">
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                        activeCategory === category.id
                          ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeCategory === "general" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Globe className="text-emerald-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">General Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'light', icon: Sun, label: 'Light' },
                          { value: 'dark', icon: Moon, label: 'Dark' },
                          { value: 'auto', icon: Sparkles, label: 'Auto' }
                        ].map((theme) => {
                          const Icon = theme.icon;
                          return (
                            <button
                              key={theme.value}
                              onClick={() => updatePreference('theme', theme.value)}
                              className={`p-4 border-2 rounded-xl transition-all ${
                                preferences.theme === theme.value
                                  ? 'border-emerald-600 bg-emerald-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <Icon size={24} className="mx-auto mb-2 text-slate-600" />
                              <span className="block font-semibold text-slate-800 text-sm">
                                {theme.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => updatePreference('language', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      >
                        <option value="english">English</option>
                        <option value="hindi">हिंदी (Hindi)</option>
                        <option value="marathi">मराठी (Marathi)</option>
                        <option value="bengali">বাংলা (Bengali)</option>
                        <option value="tamil">தமிழ் (Tamil)</option>
                        <option value="telugu">తెలుగు (Telugu)</option>
                        <option value="gujarati">ગુજરાતી (Gujarati)</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => updatePreference('currency', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      >
                        <option value="inr">₹ INR - Indian Rupee</option>
                        <option value="usd">$ USD - US Dollar</option>
                        <option value="eur">€ EUR - Euro</option>
                        <option value="gbp">£ GBP - British Pound</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Date Format
                        </label>
                        <select
                          value={preferences.dateFormat}
                          onChange={(e) => updatePreference('dateFormat', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        >
                          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Time Format
                        </label>
                        <select
                          value={preferences.timeFormat}
                          onChange={(e) => updatePreference('timeFormat', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        >
                          <option value="12h">12 Hour</option>
                          <option value="24h">24 Hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeCategory === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Bell className="text-blue-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Notification Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Notification Channels */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'pushNotifications', icon: Smartphone, label: 'Push Notifications', desc: 'Receive notifications on your device' },
                          { key: 'emailNotifications', icon: Mail, label: 'Email Notifications', desc: 'Get updates via email' },
                          { key: 'smsNotifications', icon: MessageSquare, label: 'SMS Notifications', desc: 'Receive text message alerts' },
                          { key: 'soundEnabled', icon: preferences.soundEnabled ? Volume2 : VolumeX, label: 'Notification Sound', desc: 'Play sound for notifications' }
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                  <Icon size={20} className="text-slate-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-800">{item.label}</h4>
                                  <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => togglePreference(item.key)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${
                                  preferences[item.key] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                                }`}
                              >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                                  preferences[item.key] ? 'translate-x-7' : 'translate-x-1'
                                }`}></div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notification Types */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'transactionAlerts', label: 'Transaction Alerts', desc: 'Every time money moves in/out' },
                          { key: 'budgetAlerts', label: 'Budget Alerts', desc: 'When approaching budget limits' },
                          { key: 'savingsGoals', label: 'Savings Goals', desc: 'Progress updates on your goals' },
                          { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Summary of your weekly activity' },
                          { key: 'monthlyDigest', label: 'Monthly Digest', desc: 'Comprehensive monthly overview' },
                          { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Special offers and updates' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div>
                              <h4 className="font-semibold text-slate-800">{item.label}</h4>
                              <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => togglePreference(item.key)}
                              className={`relative w-14 h-8 rounded-full transition-colors ${
                                preferences[item.key] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                              }`}
                            >
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                                preferences[item.key] ? 'translate-x-7' : 'translate-x-1'
                              }`}></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Display Settings */}
            {activeCategory === "display" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Palette className="text-purple-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Display Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Display Options */}
                    <div className="space-y-4">
                      {[
                        { key: 'showBalance', icon: preferences.showBalance ? Eye : EyeOff, label: 'Show Balance by Default', desc: 'Display account balance on dashboard' },
                        { key: 'compactView', icon: TrendingUp, label: 'Compact View', desc: 'Show more information in less space' },
                        { key: 'animations', icon: Zap, label: 'Enable Animations', desc: 'Smooth transitions and effects' },
                        { key: 'highContrast', icon: Palette, label: 'High Contrast Mode', desc: 'Better visibility and accessibility' }
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <Icon size={20} className="text-slate-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-800">{item.label}</h4>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => togglePreference(item.key)}
                              className={`relative w-14 h-8 rounded-full transition-colors ${
                                preferences[item.key] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                              }`}
                            >
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                                preferences[item.key] ? 'translate-x-7' : 'translate-x-1'
                              }`}></div>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Font Size
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['small', 'medium', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => updatePreference('fontSize', size)}
                            className={`p-4 border-2 rounded-xl transition-all capitalize ${
                              preferences.fontSize === size
                                ? 'border-emerald-600 bg-emerald-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className={`block font-semibold text-slate-800 ${
                              size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : ''
                            }`}>
                              {size}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart Type */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Default Chart Type
                      </label>
                      <select
                        value={preferences.chartType}
                        onChange={(e) => updatePreference('chartType', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      >
                        <option value="line">Line Chart</option>
                        <option value="bar">Bar Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="donut">Donut Chart</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security */}
            {activeCategory === "privacy" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Shield className="text-amber-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Privacy & Security</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Privacy Options */}
                    <div className="space-y-4">
                      {[
                        { key: 'dataSharing', label: 'Data Sharing', desc: 'Share anonymized data to improve services' },
                        { key: 'analytics', label: 'Analytics', desc: 'Help us improve with usage analytics' },
                        { key: 'marketingCookies', label: 'Marketing Cookies', desc: 'Allow cookies for personalized ads' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div>
                            <h4 className="font-semibold text-slate-800">{item.label}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => togglePreference(item.key)}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences[item.key] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                              preferences[item.key] ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Security Options */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Security Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div>
                            <h4 className="font-semibold text-slate-800">Biometric Authentication</h4>
                            <p className="text-sm text-slate-600">Use fingerprint or face ID to login</p>
                          </div>
                          <button
                            onClick={() => togglePreference('biometricAuth')}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences.biometricAuth ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                              preferences.biometricAuth ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div>
                            <h4 className="font-semibold text-slate-800">Auto Lock</h4>
                            <p className="text-sm text-slate-600">Automatically lock app after inactivity</p>
                          </div>
                          <button
                            onClick={() => togglePreference('autoLock')}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences.autoLock ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                              preferences.autoLock ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>

                        {preferences.autoLock && (
                          <div className="ml-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Auto Lock After
                            </label>
                            <select
                              value={preferences.autoLockTime}
                              onChange={(e) => updatePreference('autoLockTime', e.target.value)}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                            >
                              <option value="1">1 minute</option>
                              <option value="5">5 minutes</option>
                              <option value="10">10 minutes</option>
                              <option value="30">30 minutes</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Budget Settings */}
            {activeCategory === "budget" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Target className="text-rose-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Budget Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Budget Cycle */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Budget Cycle
                      </label>
                      <select
                        value={preferences.budgetCycle}
                        onChange={(e) => updatePreference('budgetCycle', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>

                    {/* Default Category */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Default Budget Category
                      </label>
                      <select
                        value={preferences.defaultBudgetCategory}
                        onChange={(e) => updatePreference('defaultBudgetCategory', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      >
                        <option value="food">Food & Dining</option>
                        <option value="transport">Transportation</option>
                        <option value="shopping">Shopping</option>
                        <option value="bills">Bills & Utilities</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="miscellaneous">Miscellaneous</option>
                      </select>
                    </div>

                    {/* Overspending Warning */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Overspending Warning at {preferences.overspendingWarning}%
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={preferences.overspendingWarning}
                        onChange={(e) => updatePreference('overspendingWarning', e.target.value)}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Savings Percentage */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Target Savings Percentage: {preferences.savingsPercentage}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={preferences.savingsPercentage}
                        onChange={(e) => updatePreference('savingsPercentage', e.target.value)}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Settings */}
            {activeCategory === "transactions" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="text-indigo-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Transaction Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Transaction Options */}
                    <div className="space-y-4">
                      {[
                        { key: 'autoCategories', label: 'Auto-Categorize Transactions', desc: 'Automatically assign categories based on merchant' },
                        { key: 'duplicateDetection', label: 'Duplicate Detection', desc: 'Alert when similar transactions are detected' },
                        { key: 'merchantNames', label: 'Show Merchant Names', desc: 'Display full merchant information' },
                        { key: 'transactionNotes', label: 'Enable Transaction Notes', desc: 'Add personal notes to transactions' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div>
                            <h4 className="font-semibold text-slate-800">{item.label}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => togglePreference(item.key)}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              preferences[item.key] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-300'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                              preferences[item.key] ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Smart Transaction Features</h4>
                          <p className="text-sm text-blue-700">
                            These AI-powered features help you manage transactions more efficiently by learning from your spending patterns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSavePreferences}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
              >
                <Save size={20} />
                Save All Preferences
              </button>
              
              <button
                onClick={handleResetPreferences}
                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
              >
                <RefreshCw size={20} />
                Reset to Default
              </button>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Your preferences are synced</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    All your preferences are automatically saved and synced across all your devices. You can access Artha from anywhere with your personalized settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;