
// import React from 'react'

// const Header = () => {

//   const headerItem = [
//     { name: "Dashboard", href: "#dashboard" },
//     { name: "Budgets", href: "#budgets" },
//     { name: "Transaction", href: "#Transactions" },
//     { name: "To-Do", href: "#todo" },
//     { name: "Insights", href: "#insights" },
//   ]

//   return (
//     <div className="bg-white text-[#1A2E28] font-sans scroll-smooth">
//       <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
//         {/* Logo */}
//         <div className="text-2xl font-bold flex items-center gap-2 text-[#22543D]">
//           {/* <img src="#" alt="" /> */}
//           <span className="text-[#F4C542] text-3xl">अ</span>rtha
//         </div>

//         {/* Main components */}
//         <nav>

//         </nav>

//         {/* Other options like [Today ▼] [ + Add ] [Dark/Light Mode] [🔔 Notifications] [👤 Profile] */}
//         <div>

//         </div>
//       </header>
//     </div>
//   )
// }

// export default Header

export default function ArthaLandingPage() {
  const navItems = [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Transactions", href: "#transactions" },
    { name: "Budgets", href: "#budgets" },
    { name: "Invoices", href: "#invoices" },
    { name: "To-Do", href: "#todo" },
  ];

  return (
    <div className="bg-[#fafafa] text-[#1A2E28] font-sans scroll-smooth">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-[#fafafa] z-50">
        <div className="text-2xl font-bold flex items-center gap-2 text-[#22543D]">
          <span className="text-[#F4C542] text-3xl">अ</span>rtha
        </div>
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-[#1A2E28]">
          {navItems.map((item, index) => (
            <a key={index} href={item.href} className="hover:text-[#22543D] transition-colors">
              {item.name}
            </a>
          ))}
        </nav>
        <button className="bg-[#22543D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c4332] transition">
          Get Early Access
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-24 bg-[#FAFAF8]">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-4">
          Bring Balance to Your<br className="md:hidden" /> Time & Wealth
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
          Track expenses, manage bank activity, budget smarter and plan your day — all in one place, built for modern India.
        </p>
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button className="bg-[#22543D] text-white px-6 py-3 rounded-lg hover:bg-[#1b3e2e] transition">
            Watch Demo
          </button>
          <button className="border border-[#22543D] text-[#22543D] px-6 py-3 rounded-lg hover:bg-[#f5f5f5] transition">
            Get Early Access
          </button>
        </div>
        <div className="w-full max-w-md mx-auto">
          <img src="/artha-phone-ui.png" alt="Artha App UI" className="rounded-2xl shadow-xl" />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Connect Your Bank", icon: "🏦" },
            { title: "Budget with Purpose", icon: "📊" },
            { title: "Plan Your Day", icon: "✅" },
            { title: "Designed for You", icon: "🌱" },
          ].map((item, i) => (
            <div key={i} className="bg-[#F8FAF9] p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.title === "Connect Your Bank"
                  ? "Securely link your account with trusted Indian platforms."
                  : item.title === "Budget with Purpose"
                  ? "Analyze your earnings and spendings with deep insights."
                  : item.title === "Plan Your Day"
                  ? "Boost productivity with integrated to-do & goals."
                  : "Mindful tools designed for Indian needs and lifestyle."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Artha & Testimonials */}
      <section className="py-20 px-6 md:px-24 bg-[#FAFAF8]">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Artha?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All-in-one for money + productivity</li>
              <li>Designed for Indian users</li>
              <li>Simple, clean interface</li>
              <li>Focused on mindful daily balance</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">What Users Say</h2>
            <blockquote className="mb-6 text-gray-700 border-l-4 border-[#22543D] pl-4 italic">
              “Finally, one app that shows me where my time AND my money goes!”
              <br />
              <span className="text-sm text-gray-500">— Priya, Software Engineer</span>
            </blockquote>
            <blockquote className="text-gray-700 border-l-4 border-[#22543D] pl-4 italic">
              “I feel calmer and more in control every day I use Artha.”
              <br />
              <span className="text-sm text-gray-500">— Rohan, CA Aspirant</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Dashboard Section Highlights (Optional) */}
      <section className="py-20 px-6 md:px-24 bg-white" id="dashboard">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Your Dashboard</h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Dashboard", emoji: "📊" },
            { label: "Transactions", emoji: "💸" },
            { label: "Budgets", emoji: "🧮" },
            { label: "Invoices", emoji: "📄" },
            { label: "To-Do", emoji: "📝" },
          ].map((item, i) => (
            <div key={i} className="bg-[#F9F9F7] p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-lg font-semibold">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6 bg-[#FAFAF8]">
        <h2 className="text-3xl font-bold mb-6">Ready to take control of your time & finances?</h2>
        <button className="bg-[#22543D] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#1c4332] transition">
          Get Early Access
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6 border-t bg-white">
        © 2025 Artha • Privacy • Terms • Contact <br />
        Made with 🧠 + ❤️ in India
      </footer>
    </div>
  );
}


// import React from "react";

// export default function ArthaLandingPage() {
//   return (
//     <div className="bg-white text-[#1A2E28] font-sans">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
//         <div className="text-xl font-bold flex items-center gap-2">
//           <span className="text-[#F4C542] text-2xl">अ</span>rtha
//         </div>
//         <nav className="hidden md:flex gap-6 text-sm">
//           <a href="#how-it-works" className="hover:text-[#22543D]">How it works</a>
//           <a href="#budget" className="hover:text-[#22543D]">Budget</a>
//           <a href="#todo" className="hover:text-[#22543D]">To Do</a>
//         </nav>
//         <button className="bg-[#22543D] text-white px-4 py-2 rounded-md text-sm">
//           Get Early Access
//         </button>
//       </header>

//       {/* Hero Section */}
//       <section className="text-center py-16 px-6 md:px-20 bg-[#FAFAF8]">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Balance Your <br className="md:hidden" /> Time & Wealth
//         </h1>
//         <p className="max-w-xl mx-auto text-gray-700 mb-8">
//           The all-in-one app to track your expenses, manage your bank activity and plan your day — built for modern mindful living.
//         </p>
//         <div className="flex justify-center gap-4 mb-12">
//           <button className="bg-[#22543D] text-white px-6 py-2 rounded-md">Watch Demo</button>
//           <button className="border border-[#22543D] text-[#22543D] px-6 py-2 rounded-md">Get Early Access</button>
//         </div>
//         <div className="w-full max-w-md mx-auto">
//           <img src="/artha-phone-ui.png" alt="Artha App UI" className="rounded-xl shadow-lg" />
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-16 px-6 md:px-20 bg-white">
//         <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//         <div className="grid md:grid-cols-4 gap-8 text-center">
//           {[
//             { title: "Connect Your Bank", icon: "🏦" },
//             { title: "Budget with Purpose", icon: "📊" },
//             { title: "Plan Your Day", icon: "✅" },
//             { title: "Designed for You", icon: "🌱" },
//           ].map((item, i) => (
//             <div key={i} className="bg-[#F8FAF9] p-6 rounded-lg shadow-sm">
//               <div className="text-3xl mb-4">{item.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//               <p className="text-sm text-gray-600">
//                 {item.title === "Connect Your Bank"
//                   ? "Securely link your account with ease using India’s trusted platforms."
//                   : item.title === "Budget with Purpose"
//                   ? "Track your earnings and spending patterns with real insights."
//                   : item.title === "Plan Your Day"
//                   ? "Stay productive with integrated to-do and goal tracking."
//                   : "Built for modern mindful living in the Indian context."}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Artha & Testimonials */}
//       <section className="py-16 px-6 md:px-20 bg-[#FAFAF8]">
//         <div className="grid md:grid-cols-2 gap-10">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Why Artha?</h2>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>One app for money + tasks</li>
//               <li>Indian-first design and support</li>
//               <li>Simple-focused interface</li>
//               <li>Built for purpose-driven users</li>
//             </ul>
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-4">What Users Say</h2>
//             <blockquote className="mb-4 text-gray-700">“Finally, one app that shows me where my time AND my money goes!”<br /><span className="text-sm text-gray-500">— Priya, Software Engineer</span></blockquote>
//             <blockquote className="text-gray-700">“I feel calmer and more control every day I use Artha.”<br /><span className="text-sm text-gray-500">— Rohan, CA Aspirant</span></blockquote>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="text-center py-16 px-6 bg-white">
//         <h2 className="text-3xl font-bold mb-6">Ready to bring balance to your time and wealth?</h2>
//         <button className="bg-[#22543D] text-white px-6 py-3 rounded-md text-lg">
//           Get Early Access
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="text-center text-sm text-gray-600 py-6 border-t">
//         © 2025 Artha • Privacy • Terms • Contact<br />
//         Made with 🧠 + ❤️ in India
//       </footer>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { Plus, Sun, Moon, Bell, UserRound, LogOut, X, Menu } from 'lucide-react';

// const Header = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={darkMode ? 'dark' : ''}>
//       <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
//         {/* Animated background particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
//           <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
//         </div>

//         <div className="relative flex justify-between items-center px-6 lg:px-8 py-4">
//           {/* Logo */}
//           <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
//             <span className="drop-shadow-sm text-white">Track</span>
//             <span className="text-emerald-400">Wise</span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {['Dashboard', 'Transactions', 'Budgets', 'Invoices', 'To-Do'].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="relative text-slate-300 hover:text-emerald-400 transition-all duration-300 group font-medium"
//               >
//                 {item}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
//               </a>
//             ))}
//           </nav>

//           {/* Right Side Controls */}
//           <div className="flex items-center space-x-3 lg:space-x-4">
//             {/* Time Period Selector */}
//             <select className="hidden md:block px-3 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 text-sm rounded-lg border border-slate-600/50 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 hover:bg-slate-700/80">
//               <option>Today</option>
//               <option>This Week</option>
//               <option>This Month</option>
//               <option>This Year</option>
//             </select>

//             {/* Add Button */}
//             <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
//               <Plus size={16} /> Add
//             </button>

//             {/* Dark Mode Toggle */}
//             <button 
//               onClick={toggleDarkMode}
//               className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-emerald-400 border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm"
//             >
//               {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//             </button>

//             {/* Notifications */}
//             <button className="relative p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-emerald-400 border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm group">
//               <Bell size={18} />
//               <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">3</span>
//               <div className="absolute top-full right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-4">
//                 <h3 className="text-slate-200 font-semibold mb-3">Recent Notifications</h3>
//                 <div className="space-y-3">
//                   <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-emerald-400">
//                     <p className="text-sm text-slate-300">Budget limit reached for groceries</p>
//                     <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
//                   </div>
//                   <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-blue-400">
//                     <p className="text-sm text-slate-300">New transaction detected</p>
//                     <p className="text-xs text-slate-500 mt-1">1 day ago</p>
//                   </div>
//                 </div>
//               </div>
//             </button>

//             {/* User Profile */}
//             <div className="relative group">
//               <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
//                 <UserRound size={18} />
//               </button>
//               <div className="absolute right-0 mt-3 w-48 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
//                 <div className="p-4 border-b border-slate-700/50">
//                   <p className="text-slate-200 font-semibold">User</p>
//                   <p className="text-slate-400 text-sm">user@example.com</p>
//                 </div>
//                 <div className="py-2">
//                   <a href="#profile" className="block px-4 py-3 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50 transition-colors duration-200">
//                     Profile Settings
//                   </a>
//                   <a href="#settings" className="block px-4 py-3 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50 transition-colors duration-200">
//                     Preferences
//                   </a>
//                   <hr className="border-slate-700/50 my-2" />
//                   <a href="#logout" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200">
//                     <LogOut size={14} /> Sign Out
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-emerald-400 border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-300"
//             >
//               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
//           <nav className="px-6 py-4 space-y-1">
//             {['Dashboard', 'Transactions', 'Budgets', 'Reports', 'Invoices'].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="block py-3 px-4 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-medium"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item}
//               </a>
//             ))}
//             <div className="pt-4 mt-4 border-t border-slate-700/50">
//               <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
//                 <Plus size={16} /> Add Transaction
//               </button>
//               <br />
//               <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
//                 <Plus size={16} /> Add To Do
//               </button>
//             </div>
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;

