import React, { useState } from "react";
import { DollarSign, Shield, Sparkles, Target, TrendingUp } from "lucide-react";
import FormContainer from "./FormContainer";

const AuthPage = ({ onLogin }) => {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Personalized insights into your spending patterns",
    },
    {
      icon: DollarSign,
      title: "Budget Tracking",
      description: "Set and monitor budgets with real-time alerts",
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Create and track your financial objectives",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security for your financial data",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="relative min-h-screen overflow-auto">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500"
          style={{
            background:
              "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
          }}
        ></div>

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left Side - Features */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
            <div className="max-w-full">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="p-3 rounded-2xl shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: "#FAFAFA" }}
                  >
                    Artha
                  </h1>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(250, 250, 250, 0.7)" }}
                  >
                    Smart Financial Management
                  </p>
                </div>
              </div>

              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#FAFAFA" }}
              >
                Take Control of Your
                <span className="block" style={{ color: "#F4C542" }}>
                  Financial Future
                </span>
              </h2>

              <p
                className="text-lg mb-8"
                style={{ color: "rgba(250, 250, 250, 0.8)" }}
              >
                Join Arhta with thousands of users who have transformed their
                financial lives with our Personalized-powered insights and smart
                budgeting tools.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div
                        className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{ background: "rgba(244, 197, 66, 0.2)" }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: "#F4C542" }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-semibold mb-1"
                          style={{ color: "#FAFAFA" }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "rgba(250, 250, 250, 0.7)" }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              <FormContainer onLogin={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
