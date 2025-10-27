import React from "react";
import { ArrowRight, Hourglass, Phone, User, Send, CheckCircle } from "lucide-react";

const NumberLoginForm = ({
  isLogin,
  formData,
  handleInputChange,
  handleSubmit,
  handleSendOtp,
  handleVerifyOtp,
  otpError,
  otpVerified,
  isLoading,
  otpSent,
}) => {
  return (
    <>
      {/* Full name (only for sign up) */}
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
              name="name"
              value={formData.name}
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

      {/* Phone Number */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "#FAFAFA" }}
        >
          Phone Number
        </label>
        <div className="relative">
          <Phone
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "rgba(250, 250, 250, 0.5)" }}
          />
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Enter your number"
            maxLength={10}
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

      {/* Send OTP button */}
      <button
        type="button"
        onClick={() => handleSendOtp(formData.number)}
        disabled={!formData.number || otpSent}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
        }}
      >
        <Send className="w-4 h-4" />
        {otpSent ? "OTP Sent" : "Send OTP"}
      </button>

      {/* OTP Input */}
      {otpSent && (
        <div className="mt-3">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#FAFAFA" }}
          >
            OTP
          </label>
          <div className="relative">
            <Hourglass
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "rgba(250, 250, 250, 0.5)" }}
            />
            <input
              type="text"
              name="otp"
              value={formData.otp || ""}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              maxLength={4}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              style={{
                background: "rgba(250, 250, 250, 0.1)",
                borderColor: "rgba(244, 197, 66, 0.3)",
                color: "#FAFAFA",
              }}
              required
            />
          </div>

          {/* Verify OTP button */}
          <button
            type="button"
            onClick={() => handleVerifyOtp(formData.otp)}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            }}
          >
            <CheckCircle className="w-4 h-4" />
            Verify OTP
          </button>

          {/* OTP Error */}
          {otpError && (
            <p className="text-red-400 text-sm mt-2">{otpError}</p>
          )}

          {/* OTP Verified */}
          {otpVerified && (
            <p className="text-green-400 text-sm mt-2">✅ OTP Verified!</p>
          )}
        </div>
      )}

      {/* Remember me (only for login) */}
      {isLogin && (
        <div className="flex items-center justify-between mt-3">
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
        disabled={isLoading || !otpVerified}
        className="w-full mt-4 flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default NumberLoginForm;
