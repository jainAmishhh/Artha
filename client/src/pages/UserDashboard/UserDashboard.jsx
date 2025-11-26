import React, { useState } from "react";
import { Play, TrendingUp, Wallet, Calendar, BarChart3, CreditCard, ArrowRight, CheckCircle, Sparkles, Shield, Users, Star, Zap, Target, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      title: "Connect Your Bank",
      icon: CreditCard,
      gradient: "from-emerald-500 to-emerald-600",
      description: "Securely link your account with trusted Indian banking platforms.",
      color: "emerald"
    },
    {
      title: "Budget with Purpose",
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      description: "Analyze your earnings and spendings with deep AI-powered insights.",
      color: "blue"
    },
    {
      title: "Plan Your Day",
      icon: Calendar,
      gradient: "from-amber-500 to-amber-600",
      description: "Boost productivity with integrated to-do lists and daily goals.",
      color: "amber"
    },
    {
      title: "Designed for You",
      icon: Sparkles,
      gradient: "from-purple-500 to-purple-600",
      description: "Mindful tools designed for Indian needs and modern lifestyle.",
      color: "purple"
    },
  ];

  const dashboardItems = [
    { name: "Dashboard", path: "/", icon: BarChart3, color: "emerald" },
    { name: "Budgets", path: "/budgets", icon: Wallet, color: "blue" },
    { name: "Transactions", path: "/transaction", icon: CreditCard, color: "purple" },
    { name: "To-Do", path: "/to-do", icon: Calendar, color: "amber" },
    { name: "Insights", path: "/insights", icon: TrendingUp, color: "rose" },
  ];

  const benefits = [
    "All-in-one for money + productivity",
    "Designed specifically for Indian users",
    "Simple, clean & intuitive interface",
    "Focused on mindful daily balance",
    "Bank-grade security & encryption",
    "Real-time expense tracking"
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center py-20 md:py-28 px-6 md:px-24">
          

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Bring Balance to Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Time & Wealth
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-600 text-lg md:text-xl mb-10 leading-relaxed">
            Track expenses, manage bank activity, budget smarter and plan your day
            — all in one place, built for modern India.
          </p>

          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="group bg-gradient-to-br from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 flex items-center gap-3 font-semibold transform hover:scale-105"
            >
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
            <a
              href="#how-it-works"
              className="group flex items-center gap-3 border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold transform hover:scale-105"
            >
              How It Works
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* App Preview */}
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-100 to-white p-3 rounded-3xl shadow-2xl border border-slate-200">
              <img
                src="/artha-ui.png"
                alt="Artha App Dashboard"
                className="rounded-2xl w-full shadow-lg"
              />
            </div>
          </div>

          {/* Stats Bar */}
          {/* <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50K+", label: "Active Users", icon: Users },
              { value: "₹100Cr+", label: "Money Tracked", icon: TrendingUp },
              { value: "4.9★", label: "User Rating", icon: Star },
              { value: "99.9%", label: "Uptime", icon: Zap }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100 shadow-lg">
                  <Icon className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div> */}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-20 px-6 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Get started in minutes and take control of your financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {i + 1}
                  </div>

                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Artha & Testimonials */}
      <section className="py-20 md:py-20 px-6 md:px-24 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          {/* <div className="grid lg:grid-cols-1 gap-16"> */}
          <div className="flex justify-center gap-16">
            {/* Why Artha */}
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <CheckCircle className="text-emerald-600" size={36} />
                Why Artha?
              </h2>
              <div className="space-y-4 w-full">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-white" size={16} />
                    </div>
                    <p className="text-slate-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl text-white shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={24} />
                  <h3 className="text-xl font-bold">Bank-Grade Security</h3>
                </div>
                <p className="text-emerald-100 text-sm">
                  Your data is protected with 256-bit encryption and complies with RBI guidelines
                </p>
              </div>
            </div>

            {/* Testimonials */}
            {/* <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <Star className="text-amber-500" size={36} />
                What Users Say
              </h2>
              <div className="space-y-6">
                {[
                  {
                    quote: "Finally, one app that shows me where my time AND my money goes! Artha has transformed how I manage my finances.",
                    author: "Priya Sharma",
                    role: "Software Engineer",
                    avatar: "P",
                    rating: 5
                  },
                  {
                    quote: "I feel calmer and more in control every day I use Artha. The insights are incredibly helpful for my CA studies.",
                    author: "Rohan Verma",
                    role: "CA Aspirant",
                    avatar: "R",
                    rating: 5
                  },
                  {
                    quote: "Best finance app I've used! The Indian bank integration works flawlessly and the to-do list keeps me organized.",
                    author: "Anjali Patel",
                    role: "Small Business Owner",
                    avatar: "A",
                    rating: 5
                  }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{testimonial.author}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 md:py-32 px-6 md:px-24 bg-white" id="dashboard">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Explore Your Dashboard
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need to manage your finances and time in one beautiful interface
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {dashboardItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => {
                    alert(`Navigating to ${item.name}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group relative bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-semibold text-white mb-8">
            <Clock size={16} />
            Join 50,000+ users today
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to take control of your
            <br />
            <span className="text-amber-300">time & finances?</span>
          </h2>
          
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Start your journey towards financial freedom and productivity. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => alert('Starting your journey!')}
              className="group bg-white text-emerald-700 px-10 py-5 rounded-xl text-lg font-bold hover:bg-emerald-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Start Your Journey
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button className="border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
              <Play size={20} />
              Watch Demo
            </button>
          </div>

          <p className="text-emerald-200 text-sm mt-8">
            Free forever • No credit card required • 2 minutes setup
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;