import React from "react";
import { Home, RefreshCw, BarChart3, IndianRupee } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: RefreshCw, label: "Transaction", active: false },
  { icon: BarChart3, label: "Plan", active: false },
  { icon: IndianRupee, label: "Budget", active: true },
];

const MobileNav = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4 z-50"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
      }}
    >
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                item.active ? "scale-110" : ""
              }`}
              style={
                item.active
                  ? {
                      background: "rgba(244, 197, 66, 0.2)",
                      color: "#FAFAFA",
                    }
                  : {
                      color: "rgba(250, 250, 250, 0.6)",
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
  );
};

export default MobileNav;
