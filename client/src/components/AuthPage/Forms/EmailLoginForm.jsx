import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const EmailLoginForm = ({
  isLogin,
  formData,
  handleInputChange,
  handleSubmit,
  isLoading
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* Full name */}
      {!isLogin && (
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#FAFAFA" }}
          >
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "rgba(250, 250, 250, 0.5)" }}
            />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
              required
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "#FAFAFA" }}
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "rgba(250, 250, 250, 0.5)" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              borderColor: "rgba(244, 197, 66, 0.3)",
              color: "#FAFAFA",
            }}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "#FAFAFA" }}
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "rgba(250, 250, 250, 0.5)" }}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              borderColor: "rgba(244, 197, 66, 0.3)",
              color: "#FAFAFA",
            }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff
                className="w-5 h-5"
                style={{ color: "rgba(250, 250, 250, 0.5)" }}
              />
            ) : (
              <Eye
                className="w-5 h-5"
                style={{ color: "rgba(250, 250, 250, 0.5)" }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      {!isLogin && (
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#FAFAFA" }}
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "rgba(250, 250, 250, 0.5)" }}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full pl-12 pr-12 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff
                  className="w-5 h-5"
                  style={{ color: "rgba(250, 250, 250, 0.5)" }}
                />
              ) : (
                <Eye
                  className="w-5 h-5"
                  style={{ color: "rgba(250, 250, 250, 0.5)" }}
                />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Remember me */}
      {isLogin && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
            />
            <span
              className="ml-2 text-sm"
              style={{ color: "rgba(250, 250, 250, 0.7)" }}
            >
              Remember me
            </span>
          </label>
          <button
            type="button"
            className="text-sm hover:underline transition-all duration-300"
            style={{ color: "#F4C542" }}
          >
            Forgot password?
          </button>
        </div>
      )}

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
        }}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <span>{isLogin ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </>
  );
};

export default EmailLoginForm;
