import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Shield,
  FileText,
  HelpCircle,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 scroll-smooth border-t border-emerald-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold flex items-center gap-2 text-[#0F4C3A]">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-lg opacity-20 blur"></div>
                <span className="relative text-3xl bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent font-black">
                  अ
                </span>
              </div>
              <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                rtha
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your intelligent personal finance companion. Track expenses,
              manage budgets, and achieve financial freedom.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <div className="px-3 py-1.5 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 rounded-full font-semibold">
                🔒 Bank-Grade Security
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" />
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              <li>
                <NavLink
                  to="/"
                  onClick={() => 
                    window.scrollTo({ top:0, behavior: "smooth" })
                  }
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-600 rounded-full group-hover:w-2 transition-all"></span>
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/budgets"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-600 rounded-full group-hover:w-2 transition-all"></span>
                  Budgets & Goals
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/transaction"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-600 rounded-full group-hover:w-2 transition-all"></span>
                  Transactions
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/to-do"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-600 rounded-full group-hover:w-2 transition-all"></span>
                  To-Do
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/insights"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-600 rounded-full group-hover:w-2 transition-all"></span>
                  Financial Insights
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HelpCircle size={16} className="text-emerald-600" />
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#help"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:w-2 transition-all"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:w-2 transition-all"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:w-2 transition-all"></span>
                  Financial Tips
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:w-2 transition-all"></span>
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Mail size={16} className="text-emerald-600" />
              Get in Touch
            </h3>
            <ul className="space-y-3 mb-4">
              <li>
                <a
                  href="mailto:support@artha.com"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-emerald-600" />
                  support@artha.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Phone size={14} className="text-emerald-600" />
                  +91 123 456 7890
                </a>
              </li>
              <li>
                <div className="text-sm text-slate-600 flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                  />
                  <span>Bhopal, Madhya Pradesh, India</span>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="#facebook"
                className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 hover:from-emerald-100 hover:to-emerald-200 text-slate-600 hover:text-emerald-700 transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#twitter"
                className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 hover:from-emerald-100 hover:to-emerald-200 text-slate-600 hover:text-emerald-700 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#linkedin"
                className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 hover:from-emerald-100 hover:to-emerald-200 text-slate-600 hover:text-emerald-700 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#instagram"
                className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 hover:from-emerald-100 hover:to-emerald-200 text-slate-600 hover:text-emerald-700 transition-all"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-emerald-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50">
            <Shield className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-800">256-bit</p>
              <p className="text-xs text-slate-600">Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50">
            <CreditCard className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-800">Bank-Level</p>
              <p className="text-xs text-slate-600">Security</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50">
            <Wallet className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-800">50,000+</p>
              <p className="text-xs text-slate-600">Active Users</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50">
            <TrendingUp className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-800">₹100Cr+</p>
              <p className="text-xs text-slate-600">Tracked</p>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <a
              href="#privacy"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Shield size={12} />
              Privacy Policy
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#terms"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <FileText size={12} />
              Terms of Service
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#contact"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Mail size={12} />
              Contact Us
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-slate-600">
              © {currentYear}{" "}
              <span className="font-semibold text-emerald-700">Artha</span>. All
              rights reserved.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Made with <span className="text-pink-500">❤️</span> and{" "}
              <span className="text-amber-500">🧠</span> in India
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600"></div>
    </footer>
  );
};

export default Footer;
