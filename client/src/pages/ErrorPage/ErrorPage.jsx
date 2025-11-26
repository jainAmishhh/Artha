import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Wallet,
  Calendar,
} from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: TrendingUp,
      description: "View your overview",
      color: "emerald",
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: Wallet,
      description: "Manage budgets",
      color: "blue",
    },
    {
      name: "Transactions",
      path: "/transaction",
      icon: Search,
      description: "View transactions",
      color: "purple",
    },
    {
      name: "To-Do",
      path: "/to-do",
      icon: Calendar,
      description: "Check your tasks",
      color: "amber",
    },
  ];

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      hover: "hover:bg-emerald-50",
      border: "border-emerald-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "hover:bg-blue-50",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:bg-purple-50",
      border: "border-purple-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      hover: "hover:bg-amber-50",
      border: "border-amber-200",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 flex items-center justify-center p-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-3xl bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent font-black">
                अ
              </span>
              <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                rtha
              </span>
            </h1>
          </div>
        </div>

        {/* Main Error Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full blur-xl opacity-20"></div>
              <div className="relative p-6 bg-gradient-to-br from-rose-50 to-rose-100 rounded-full border-4 border-rose-200">
                <AlertTriangle className="w-16 h-16 text-rose-600" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-8xl md:text-9xl font-black mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's
            get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                navigate(-1), window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <button
              onClick={() => {
                navigate("/"), window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Home size={20} />
              Go to Dashboard
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">
              Or explore these popular pages:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                const colors = colorClasses[link.color];

                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      navigate(link.path),
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`p-4 rounded-xl border-2 ${colors.border} ${colors.hover} transition-all transform hover:scale-105 hover:shadow-md`}
                  >
                    <div
                      className={`p-2 ${colors.bg} rounded-lg mx-auto w-fit mb-2`}
                    >
                      <Icon className={colors.text} size={20} />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {link.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {link.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Need help?{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
