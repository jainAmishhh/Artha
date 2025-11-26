import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Plus,
  Bell,
  UserRound,
  LogOut,
  X,
  Menu,
  Wallet,
  BarChart3,
  CreditCard,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: BarChart3, path: "/" },
    { name: "Budgets", icon: Wallet, path: "/budgets" },
    { name: "Transaction", icon: CreditCard, path: "/transaction" },
    { name: "To-Do", icon: Calendar, path: "/to-do" },
    { name: "Insights", icon: TrendingUp, path: "/insights" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    localStorage.removeItem("token"); // remove JWT
    localStorage.removeItem("user"); // remove user data if stored
    navigate("/authUser"); // redirect to login
  };

  return (
    <div className="bg-white text-[#1A2E28] font-sans scroll-smooth fixed z-50 w-full">
      <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
        <div className="relative flex justify-between items-center w-full">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2.5 text-[#0F4C3A] group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
              <span className="relative text-3xl bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent font-black">
                अ
              </span>
            </div>
            <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
              rtha
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-[#1A2E28]">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group flex items-center rounded-2xl gap-2 px-2 py-1 transition-all duration-300 ${
                      isActive
                        ? "text-[#22543D] font-semibold"
                        : "hover:text-[#22543D]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        className={isActive ? "text-amber-500" : ""}
                      />
                      {item.name}

                      <span
                        className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#22543D] to-[#F4C542] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Section */}
          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Add Button with Enhanced Dropdown */}
            <button className="hidden md:flex relative items-center gap-2 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-200 group">
              <Plus
                size={18}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Quick Add
              {/* Enhanced Dropdown */}
              <div className="absolute top-full right-0 mt-3 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50 border border-slate-100">
                <div className="p-2 space-y-1">
                  <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-200 group/item">
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover/item:bg-emerald-200 transition-colors">
                      <CreditCard size={18} className="text-emerald-700" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">Add Transaction</p>
                      <p className="text-xs text-slate-500">
                        Record income or expense
                      </p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 transition-all duration-200 group/item">
                    <div className="p-2 bg-amber-100 rounded-lg group-hover/item:bg-amber-200 transition-colors">
                      <Calendar size={18} className="text-amber-700" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">Add To-Do Task</p>
                      <p className="text-xs text-slate-500">Plan your day</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group/item">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors">
                      <Wallet size={18} className="text-blue-700" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">Set Budget Goal</p>
                      <p className="text-xs text-slate-500">Control spending</p>
                    </div>
                  </button>
                </div>
              </div>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-all duration-300 group shadow-sm">
              <Bell size={18} className="group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                3
              </span>

              {/* Notifications Dropdown */}
              <div className="absolute top-full right-0 mt-3 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50 border border-slate-100">
                <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Bell size={16} className="text-emerald-600" />
                    Notifications
                  </h3>
                </div>
                <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                  <div className="p-3 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl border-l-4 border-rose-500 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="text-sm font-semibold text-rose-900">
                      Budget Alert
                    </p>
                    <p className="text-xs text-rose-700 mt-1">
                      Groceries budget exceeded by ₹500
                    </p>
                    <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="text-sm font-semibold text-emerald-900">
                      Income Received
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Salary credited: ₹50,000
                    </p>
                    <p className="text-xs text-slate-500 mt-2">1 day ago</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-l-4 border-amber-500 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="text-sm font-semibold text-amber-900">
                      Upcoming Payment
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Rent due in 3 days: ₹15,000
                    </p>
                    <p className="text-xs text-slate-500 mt-2">2 days ago</p>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                  <button className="w-full text-center text-sm text-emerald-700 font-semibold hover:text-emerald-800">
                    View All Notifications
                  </button>
                </div>
              </div>
            </button>

            {/* Quick Balance Display - Desktop */}
            <div className="hidden xl:flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-xl shadow-sm">
              <Wallet size={16} className="text-emerald-700" />
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-600 font-medium">
                  Current Balance
                </span>
                <span className="text-sm font-bold text-emerald-900">
                  ₹320.50
                </span>
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative group">
              <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-200">
                <UserRound size={18} />
              </button>

              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-3 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50 border border-slate-100">
                <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      U
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">User Name</p>
                      <p className="text-xs text-slate-500">user@example.com</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-white rounded-lg border border-emerald-200">
                    <p className="text-xs text-slate-600">Monthly Savings</p>
                    <p className="text-lg font-bold text-emerald-700">₹8,450</p>
                  </div>
                </div>

                <div className="py-2">
                  <NavLink
                  to='/account-section'
                  className="relative group flex items-center rounded-2xl gap-3 px-4 py-3 w-full  hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300 text-left">
                    <UserRound size={16} />
                    Profile Settings
                  </NavLink>
                  <NavLink
                  to='/preferences-section' className="w-full flex items-center gap-3 px-4 py-3 hover:text-emerald-700 hover:bg-emerald-50 transition-all text-left">
                    <BarChart3 size={16} />
                    Account Preferences
                  </NavLink>
                  <hr className="border-slate-100 my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 transition-all font-medium text-left"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border border-slate-200 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#F4C542] border-b border-[#22543D] shadow-2xl transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <nav className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="block py-2 px-4 hover:text-[#22543D] hover:bg-white rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-[#22543D]">
              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-200 group/item">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover/item:bg-emerald-200 transition-colors">
                  <CreditCard size={18} className="text-emerald-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Add Transaction</p>
                  <p className="text-xs text-slate-500">
                    Record income or expense
                  </p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 transition-all duration-200 group/item">
                <div className="p-2 bg-amber-100 rounded-lg group-hover/item:bg-amber-200 transition-colors">
                  <Calendar size={18} className="text-amber-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Add To-Do Task</p>
                  <p className="text-xs text-slate-500">Plan your day</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group/item">
                <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors">
                  <Wallet size={18} className="text-blue-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Set Budget Goal</p>
                  <p className="text-xs text-slate-500">Control spending</p>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
