import React, { useState } from "react";
import { ArrowRight, Phone, User, Send, CheckCircle, Clock } from "lucide-react";

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
  const [otp, setOtp] = useState("");

  return (
    <>
      {/* Full Name (Sign Up Only) */}
      {!isLogin && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              required
            />
          </div>
        </div>
      )}

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="+91 XXXXX XXXXX"
            maxLength={10}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            required
            disabled={otpSent}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Enter 10-digit mobile number without country code
        </p>
      </div>

      {/* Send OTP Button */}
      {!otpSent && (
        <button
          type="button"
          onClick={() => handleSendOtp(formData.number)}
          disabled={!formData.number || formData.number.length !== 10 || isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send OTP
            </>
          )}
        </button>
      )}

      {/* OTP Input */}
      {otpSent && !otpVerified && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <Clock className="w-4 h-4 inline mr-1" />
              OTP sent to {formData.number}. Please check your messages.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 4-digit OTP"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-center text-2xl font-bold tracking-widest"
              required
            />
          </div>

          {/* Verify OTP Button */}
          <button
            type="button"
            onClick={() => handleVerifyOtp(otp)}
            disabled={otp.length !== 4}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            Verify OTP
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => handleSendOtp(formData.number)}
              className="text-sm text-slate-600 hover:text-emerald-600 hover:underline transition-all"
            >
              Didn't receive OTP? Resend
            </button>
          </div>

          {/* OTP Error */}
          {otpError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-rose-600 text-sm text-center">{otpError}</p>
            </div>
          )}
        </div>
      )}

      {/* OTP Verified Success */}
      {otpVerified && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">OTP Verified Successfully!</span>
          </div>
          <p className="text-sm text-emerald-600 mt-1">
            You can now proceed to {isLogin ? "sign in" : "create your account"}.
          </p>
        </div>
      )}

      {/* Remember Me (Login Only) */}
      {isLogin && otpVerified && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-slate-600">Remember this device</span>
          </label>
        </div>
      )}

      {/* Final Submit Button */}
      {otpVerified && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
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
      )}
    </>
  );
};

export default NumberLoginForm;



// import React from "react";
// import { ArrowRight, Hourglass, Phone, User, Send, CheckCircle } from "lucide-react";

// const NumberLoginForm = ({
//   isLogin,
//   formData,
//   handleInputChange,
//   handleSubmit,
//   handleSendOtp,
//   handleVerifyOtp,
//   otpError,
//   otpVerified,
//   isLoading,
//   otpSent,
// }) => {
//   return (
//     <>
//       {/* Full name (only for sign up) */}
//       {!isLogin && (
//         <div>
//           <label
//             className="block text-sm font-medium mb-2"
//             style={{ color: "#FAFAFA" }}
//           >
//             Full Name
//           </label>
//           <div className="relative">
//             <User
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
//               style={{ color: "rgba(250, 250, 250, 0.5)" }}
//             />
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Enter your full name"
//               className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
//               style={{
//                 background: "rgba(250, 250, 250, 0.1)",
//                 borderColor: "rgba(244, 197, 66, 0.3)",
//                 color: "#FAFAFA",
//               }}
//               required
//             />
//           </div>
//         </div>
//       )}

//       {/* Phone Number */}
//       <div>
//         <label
//           className="block text-sm font-medium mb-2"
//           style={{ color: "#FAFAFA" }}
//         >
//           Phone Number
//         </label>
//         <div className="relative">
//           <Phone
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
//             style={{ color: "rgba(250, 250, 250, 0.5)" }}
//           />
//           <input
//             type="tel"
//             name="number"
//             value={formData.number}
//             onChange={handleInputChange}
//             placeholder="Enter your number"
//             maxLength={10}
//             className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
//             style={{
//               background: "rgba(250, 250, 250, 0.1)",
//               borderColor: "rgba(244, 197, 66, 0.3)",
//               color: "#FAFAFA",
//             }}
//             required
//           />
//         </div>
//       </div>

//       {/* Send OTP button */}
//       <button
//         type="button"
//         onClick={() => handleSendOtp(formData.number)}
//         disabled={!formData.number || otpSent}
//         className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//         style={{
//           background: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
//         }}
//       >
//         <Send className="w-4 h-4" />
//         {otpSent ? "OTP Sent" : "Send OTP"}
//       </button>

//       {/* OTP Input */}
//       {otpSent && (
//         <div className="mt-3">
//           <label
//             className="block text-sm font-medium mb-2"
//             style={{ color: "#FAFAFA" }}
//           >
//             OTP
//           </label>
//           <div className="relative">
//             <Hourglass
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
//               style={{ color: "rgba(250, 250, 250, 0.5)" }}
//             />
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp || ""}
//               onChange={handleInputChange}
//               placeholder="Enter OTP"
//               maxLength={4}
//               className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
//               style={{
//                 background: "rgba(250, 250, 250, 0.1)",
//                 borderColor: "rgba(244, 197, 66, 0.3)",
//                 color: "#FAFAFA",
//               }}
//               required
//             />
//           </div>

//           {/* Verify OTP button */}
//           <button
//             type="button"
//             onClick={() => handleVerifyOtp(formData.otp)}
//             className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
//             style={{
//               background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
//             }}
//           >
//             <CheckCircle className="w-4 h-4" />
//             Verify OTP
//           </button>

//           {/* OTP Error */}
//           {otpError && (
//             <p className="text-red-400 text-sm mt-2">{otpError}</p>
//           )}

//           {/* OTP Verified */}
//           {otpVerified && (
//             <p className="text-green-400 text-sm mt-2">✅ OTP Verified!</p>
//           )}
//         </div>
//       )}

//       {/* Remember me (only for login) */}
//       {isLogin && (
//         <div className="flex items-center justify-between mt-3">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
//             />
//             <span
//               className="ml-2 text-sm"
//               style={{ color: "rgba(250, 250, 250, 0.7)" }}
//             >
//               Remember me
//             </span>
//           </label>
//           <button
//             type="button"
//             className="text-sm hover:underline transition-all duration-300"
//             style={{ color: "#F4C542" }}
//           >
//             Forgot password?
//           </button>
//         </div>
//       )}

//       {/* Submit button */}
//       <button
//         type="button"
//         onClick={handleSubmit}
//         disabled={isLoading || !otpVerified}
//         className="w-full mt-4 flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//         style={{
//           background: "linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)",
//         }}
//       >
//         {isLoading ? (
//           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//         ) : (
//           <>
//             <span>{isLogin ? "Sign In" : "Create Account"}</span>
//             <ArrowRight className="w-5 h-5" />
//           </>
//         )}
//       </button>
//     </>
//   );
// };

// export default NumberLoginForm;
