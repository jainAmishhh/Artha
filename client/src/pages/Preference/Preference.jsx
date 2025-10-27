import React, { useState } from "react";

export default function PreferencesSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="max-w-3xl mx-auto bg-[#FAFAF8] p-8 rounded-xl shadow-md border border-[#E2E8F0] font-sans text-[#1A2E28]">
      <h2 className="text-2xl font-bold mb-6 text-[#22543D]">🛠 Preferences</h2>

      {/* Dark Mode */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-lg">Dark Mode</h3>
          <p className="text-sm text-gray-600">Switch to dark theme</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
            darkMode ? "bg-[#22543D]" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
              darkMode ? "translate-x-7" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Notifications */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-sm text-gray-600">Receive alerts for tasks and budgets</p>
        </div>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="accent-[#22543D] w-5 h-5"
        />
      </div>

      {/* Language */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-lg">Language</h3>
          <p className="text-sm text-gray-600">Choose your preferred language</p>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white"
        >
          <option>English</option>
          <option>हिंदी</option>
          <option>தமிழ்</option>
          <option>বাংলা</option>
        </select>
      </div>

      {/* Currency */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h3 className="font-semibold text-lg">Currency</h3>
          <p className="text-sm text-gray-600">Default currency for budgeting</p>
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white"
        >
          <option>INR (₹)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
        </select>
      </div>
    </div>
  );
}
