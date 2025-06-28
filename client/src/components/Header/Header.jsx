import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Plus, Bell, UserRound, LogOut, X, Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Budgets", path: "/budgets" },
    { name: "Transaction", path: "/transaction" },
    { name: "To-Do", path: "/to-do" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <div className="bg-white text-[#1A2E28] font-sans scroll-smooth fixed z-50 w-full">
      <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
        <div className="relative flex justify-between items-center w-full">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2 text-[#22543D]">
            <span className="text-[#F4C542] text-3xl">अ</span>rtha
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-[#1A2E28]">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative group px-2 py-1 transition-colors ${
                    isActive
                      ? "text-[#22543D] font-semibold"
                      : "hover:text-[#22543D]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#22543D] to-[#F4C542] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      } `}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Add Button */}
            <button className="invisible md:visible relative md:flex items-center gap-2 bg-[#22543D] hover:bg-[#1A3D30] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg  p-2.5 hover:text-[#f4c542] border boder-[#14a2e28] group">
              <Plus size={18} /> Add
              <div className="absolute top-full right-0 mt-2 w-80 bg-white text-[#1A2E28] border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-4 z-50 space-y-3">
                <button className="p-3 w-full bg-gray-100 rounded-lg border-l-4 border-[#22543D] hover:bg-gray-200 hover:text-[#22543D] hover:scale-105 transition-all duration-300">
                  <p className="flex flex-row justify-center items-center gap-x-3 "><Plus size={18} /> Add Transactions</p>                  
                </button>
                <button className="p-3 w-full bg-gray-100 rounded-lg border-l-4 border-[#22543D] hover:bg-gray-200 hover:text-[#22543D] hover:scale-105 transition-all duration-300">
                  <p className="flex flex-row justify-center items-center gap-x-3 "><Plus size={18} /> Add To-Do</p>
                </button>
              </div>
            </button>

            {/* Notification */}
            <button className="relative p-2.5 rounded-lg bg-[#1A2E28] hover:bg-[#1f3a31] text-white hover:text-[#F4C542] border border-[#1A2E28] transition-all duration-300 group">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                3
              </span>
              <div className="absolute top-full right-0 mt-2 w-80 bg-white text-[#1A2E28] border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-4 z-50">
                <h3 className="font-semibold mb-3">Recent Notifications</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-100 rounded-lg border-l-4 border-[#22543D]">
                    <p className="text-sm">
                      Budget limit reached for groceries
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg border-l-4 border-[#F4C542]">
                    <p className="text-sm">New transaction detected</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Profile */}
            <div className="relative group">
              <button className="w-10 h-10 rounded-lg bg-[#22543D] hover:bg-[#1A3D30] hover:text-[#f4c542] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                <UserRound size={18} />
              </button>
              <div className="absolute right-0 mt-3 w-48 bg-white text-[#1A2E28] border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold">User</p>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
                <div className="py-2">
                  <a
                    href="#profile"
                    className="block px-4 py-3 hover:text-[#22543D] hover:bg-gray-100 transition-colors"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="#settings"
                    className="block px-4 py-3 hover:text-[#22543D] hover:bg-gray-100 transition-colors"
                  >
                    Preferences
                  </a>
                  <hr className="border-gray-200 my-2" />
                  <a
                    href="#logout"
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-[#1A2E28] hover:bg-[#1f3a31] text-white border border-[#1A2E28] transition-all duration-300"
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
              <button className="w-full flex items-center justify-center gap-2 bg-[#22543D] hover:bg-[#1A3D30] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
                <Plus size={16} /> Add Transaction
              </button>
              <br />
              <button className="w-full flex items-center justify-center gap-2 bg-[#22543D] hover:bg-[#1A3D30] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
                <Plus size={16} /> Add To Do
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
