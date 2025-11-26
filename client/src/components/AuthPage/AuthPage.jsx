import React, { useState } from "react";
import {
  DollarSign,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  Award,
  PieChart,
} from "lucide-react";
import FormContainer from "./FormContainer";

const AuthPage = ({ onLogin }) => {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "AI-powered insights into your spending patterns",
      color: "emerald",
    },
    {
      icon: DollarSign,
      title: "Budget Tracking",
      description: "Set and monitor budgets with real-time alerts",
      color: "blue",
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Create and track your financial objectives",
      color: "purple",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-grade security for your financial data",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Features & Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16">
          <div className="max-w-xl">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-3xl bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent font-black">
                    अ
                  </span>
                  <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                    rtha
                  </span>
                </h1>
                <p className="text-sm text-slate-600">
                  Smart Financial Management
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl font-black text-slate-800 mb-4 leading-tight">
              Take Control of Your
              <span className="block bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Become a user who have transformed their financial lives
              with our AI-powered insights and smart budgeting tools.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colorClasses = {
                  emerald: "bg-emerald-100 text-emerald-600",
                  blue: "bg-blue-100 text-blue-600",
                  purple: "bg-purple-100 text-purple-600",
                  amber: "bg-amber-100 text-amber-600",
                };

                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div
                      className={`p-3 rounded-xl ${
                        colorClasses[feature.color]
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-600" size={16} />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-amber-600" size={16} />
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <FormContainer onLogin={onLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

// import React, { useState } from "react";
// import { DollarSign, Shield, Sparkles, Target, TrendingUp } from "lucide-react";
// import FormContainer from "./FormContainer";

// const AuthPage = ({ onLogin }) => {
//   const features = [
//     {
//       icon: TrendingUp,
//       title: "Smart Analytics",
//       description: "Personalized insights into your spending patterns",
//     },
//     {
//       icon: DollarSign,
//       title: "Budget Tracking",
//       description: "Set and monitor budgets with real-time alerts",
//     },
//     {
//       icon: Target,
//       title: "Goal Planning",
//       description: "Create and track your financial objectives",
//     },
//     {
//       icon: Shield,
//       title: "Secure & Private",
//       description: "Bank-level security for your financial data",
//     },
//   ];

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)",
//       }}
//     >
//       {/* Animated Background Elements */}
//       <div className="relative min-h-screen overflow-auto">
//         <div
//           className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)",
//           }}
//         ></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)",
//           }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
//           }}
//         ></div>

//         <div className="flex flex-col lg:flex-row relative z-10">
//           {/* Left Side - Features */}
//           <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
//             <div className="max-w-full">
//               <div className="flex items-center gap-3 mb-8">
//                 <div
//                   className="p-3 rounded-2xl shadow-lg"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
//                   }}
//                 >
//                   <Sparkles className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1
//                     className="text-3xl font-bold"
//                     style={{ color: "#FAFAFA" }}
//                   >
//                     Artha
//                   </h1>
//                   <p
//                     className="text-sm"
//                     style={{ color: "rgba(250, 250, 250, 0.7)" }}
//                   >
//                     Smart Financial Management
//                   </p>
//                 </div>
//               </div>

//               <h2
//                 className="text-4xl font-bold mb-6"
//                 style={{ color: "#FAFAFA" }}
//               >
//                 Take Control of Your
//                 <span className="block" style={{ color: "#F4C542" }}>
//                   Financial Future
//                 </span>
//               </h2>

//               <p
//                 className="text-lg mb-8"
//                 style={{ color: "rgba(250, 250, 250, 0.8)" }}
//               >
//                 Join Arhta with thousands of users who have transformed their
//                 financial lives with our Personalized-powered insights and smart
//                 budgeting tools.
//               </p>

//               <div className="space-y-6">
//                 {features.map((feature, index) => {
//                   const IconComponent = feature.icon;
//                   return (
//                     <div key={index} className="flex items-start gap-4 group">
//                       <div
//                         className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
//                         style={{ background: "rgba(244, 197, 66, 0.2)" }}
//                       >
//                         <IconComponent
//                           className="w-6 h-6"
//                           style={{ color: "#F4C542" }}
//                         />
//                       </div>
//                       <div>
//                         <h3
//                           className="font-semibold mb-1"
//                           style={{ color: "#FAFAFA" }}
//                         >
//                           {feature.title}
//                         </h3>
//                         <p
//                           className="text-sm"
//                           style={{ color: "rgba(250, 250, 250, 0.7)" }}
//                         >
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
//             <div className="w-full max-w-md">
//               <FormContainer onLogin={onLogin} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
