import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Sparkles } from "lucide-react";

// Buttons
import NumberLoginButton from "./Buttons/NumberLoginButton";
import GoogleLoginButton from "./Buttons/GoogleLoginButton";
import EmailLoginButton from "./Buttons/EmailLoginButton";

// Forms
import EmailLoginForm from "./Forms/EmailLoginForm";
import GoogleLoginForm from "./Forms/GoogleLoginForm";
import NumberLoginForm from "./Forms/NumberLoginForm";

// Handlers
import {
  handleSignup,
  handleLogin,
  handleSendOtp,
  handleVerifyOtp,
} from "../AuthPage/formHandlers";

const FormContainer = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginMethod, setLoginMethod] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  // OTP states
  const [otpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Error state
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    try {
      let response;

      if (isLogin) {
        response = await handleLogin(
          {
            email: formData.email,
            password: formData.password,
          },
          onLogin
        );
      } else {
        response = await handleSignup(formData, onLogin);
      }

      console.log("✅ Auth Success:", response);

      if (onLogin) onLogin(response);
      navigate("/");
    } catch (err) {
      console.error("❌ Auth Error:", err);
      setFormError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await handleSendOtp(formData.number);
      setIsOtpSent(true);
      setOtpError("");
      console.log("✅ OTP sent:", res);
    } catch (err) {
      setOtpError(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOtp = async (enteredOtp) => {
    try {
      const res = await handleVerifyOtp(
        formData.number,
        enteredOtp,
        formData.fullname || "Anonymous User"
      );
      setOtpVerified(true);
      setOtpError("");
      console.log("✅ OTP verified:", res);

      if (onLogin) onLogin();
      navigate("/");
    } catch (err) {
      setOtpError(err.message || "Failed to verify OTP");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl mx-auto w-fit mb-4">
          <Lock className="w-8 h-8 text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className="text-slate-600">
          {isLogin
            ? "Sign in to access your financial dashboard"
            : "Join thousands managing their finances smarter"}
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        {loginMethod === "default" && (
          <>
            <GoogleLoginButton
              onClick={() => setLoginMethod("google")}
              active={loginMethod === "google"}
            />
            <NumberLoginButton onClick={() => setLoginMethod("number")} />
          </>
        )}

        {loginMethod === "google" && (
          <>
            <EmailLoginButton onClick={() => setLoginMethod("default")} />
            <NumberLoginButton onClick={() => setLoginMethod("number")} />
          </>
        )}

        {loginMethod === "number" && (
          <>
            <GoogleLoginButton
              onClick={() => setLoginMethod("google")}
              active={loginMethod === "google"}
            />
            <EmailLoginButton onClick={() => setLoginMethod("default")} />
          </>
        )}
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-500">or continue with</span>
        </div>
      </div>

      {/* Forms */}
      <div className="space-y-6">
        {loginMethod === "default" && (
          <EmailLoginForm
            isLogin={isLogin}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {loginMethod === "google" && <GoogleLoginForm />}

        {loginMethod === "number" && (
          <NumberLoginForm
            isLogin={isLogin}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleSendOtp={onSendOtp}
            handleVerifyOtp={onVerifyOtp}
            isLoading={isLoading}
            otpSent={otpSent}
            otpError={otpError}
            otpVerified={otpVerified}
          />
        )}
      </div>

      {/* Error Messages */}
      {formError && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl">
          <p className="text-rose-600 text-sm text-center">{formError}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {!isLogin && (
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FormContainer;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Lock } from "lucide-react";

// // Buttons
// import NumberLoginButton from "./Buttons/NumberLoginButton";
// import GoogleLoginButton from "./Buttons/GoogleLoginButton";
// import EmailLoginButton from "./Buttons/EmailLoginButton";

// // Forms
// import EmailLoginForm from "./Forms/EmailLoginForm";
// import GoogleLoginForm from "./Forms/GoogleLoginForm";
// import NumberLoginForm from "./Forms/NumberLoginForm";

// // Handlers
// import {
//   handleSignup,
//   handleLogin,
//   handleSendOtp,
//   handleVerifyOtp,
// } from "../AuthPage/formHandlers";

// const FormContainer = ({ onLogin }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     number: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loginMethod, setLoginMethod] = useState("default");
//   const [isLoading, setIsLoading] = useState(false);

//   // OTP states
//   const [otpSent, setIsOtpSent] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);

//   // Error state for inline messages
//   const [formError, setFormError] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const navigate = useNavigate();

//   // Actual submit logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setFormError(""); // reset

//     try {
//       let response;

//       if (isLogin) {
//         response = await handleLogin(
//           {
//             email: formData.email,
//             password: formData.password,
//           },
//           onLogin
//         );
//       } else {
//         response = await handleSignup(formData, onLogin);
//       }

//       console.log("✅ Auth Success:", response);

//       if (onLogin) onLogin(response);

//       navigate("/");
//     } catch (err) {
//       console.error("❌ Auth Error:", err);
//       setFormError(err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onSendOtp = async () => {
//     setIsLoading(true);
//     try {
//       const res = await handleSendOtp(formData.number);
//       setIsOtpSent(true);
//       setOtpError("");
//       console.log("✅ OTP sent:", res);
//     } catch (err) {
//       setOtpError(err.message || "Failed to send OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onVerifyOtp = async (enteredOtp) => {
//     try {
//       const res = await handleVerifyOtp(
//         formData.number,
//         enteredOtp,
//         formData.fullname || "Anonymous User"
//       );
//       setOtpVerified(true);
//       setOtpError("");
//       console.log("✅ OTP verified:", res);

//       if (onLogin) onLogin();

//       navigate("/");
//     } catch (err) {
//       setOtpError(err.message || "Failed to verify OTP");
//     }
//   };

//   return (
//     <div
//       className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl"
//       style={{
//         background: "rgba(250, 250, 250, 0.08)",
//         borderColor: "rgba(244, 197, 66, 0.2)",
//       }}
//     >
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div
//           className="p-4 rounded-2xl mx-auto w-fit mb-4"
//           style={{ background: "rgba(244, 197, 66, 0.2)" }}
//         >
//           <Lock className="w-8 h-8" style={{ color: "#F4C542" }} />
//         </div>
//         <h2 className="text-2xl font-bold mb-2" style={{ color: "#FAFAFA" }}>
//           {isLogin ? "Welcome Back!" : "Create Account"}
//         </h2>
//         <p className="text-sm" style={{ color: "rgba(250, 250, 250, 0.7)" }}>
//           {isLogin
//             ? "Sign in to access your financial dashboard"
//             : "Join thousands of users managing their finances smarter"}
//         </p>
//       </div>

//       {/* Social Login */}
//       {/* Social Login */}
//       <div className="space-y-3 mb-6">
//         {loginMethod === "default" && (
//           <>
//             <GoogleLoginButton
//               onClick={() => setLoginMethod("google")}
//               active={loginMethod === "google"}
//             />
//             <NumberLoginButton onClick={() => setLoginMethod("number")} />
//           </>
//         )}

//         {loginMethod === "google" && (
//           <>
//             <EmailLoginButton onClick={() => setLoginMethod("default")} />
//             <NumberLoginButton onClick={() => setLoginMethod("number")} />
//           </>
//         )}

//         {loginMethod === "number" && (
//           <>
//             <GoogleLoginButton
//               onClick={() => setLoginMethod("google")}
//               active={loginMethod === "google"}
//             />
//             <EmailLoginButton onClick={() => setLoginMethod("default")} />
//           </>
//         )}
//       </div>

//       {/* Divider */}
//       <div className="relative mb-6">
//         <div className="absolute inset-0 flex items-center">
//           <div
//             className="w-full border-t"
//             style={{ borderColor: "rgba(244, 197, 66, 0.2)" }}
//           ></div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="space-y-6">
//         {loginMethod === "default" && (
//           <EmailLoginForm
//             isLogin={isLogin}
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleSubmit={handleSubmit}
//             isLoading={isLoading}
//           />
//         )}

//         {loginMethod === "google" && <GoogleLoginForm />}

//         {loginMethod === "number" && (
//           <NumberLoginForm
//             isLogin={isLogin}
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleSubmit={handleSubmit}
//             handleSendOtp={onSendOtp}
//             handleVerifyOtp={onVerifyOtp}
//             isLoading={isLoading}
//             otpSent={otpSent}
//             otpError={otpError}
//             otpVerified={otpVerified}
//           />
//         )}
//       </div>

//       {/* Show error messages */}
//       {formError && (
//         <p className="mt-4 text-red-400 text-center text-sm">{formError}</p>
//       )}

//       {/* Footer */}
//       <div className="mt-6 text-center">
//         <p className="text-sm" style={{ color: "rgba(250, 250, 250, 0.7)" }}>
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-semibold hover:underline transition-all duration-300"
//             style={{ color: "#F4C542" }}
//           >
//             {isLogin ? "Sign up" : "Sign in"}
//           </button>
//         </p>
//       </div>

//       {!isLogin && (
//         <div className="mt-4 text-center">
//           <p className="text-xs" style={{ color: "rgba(250, 250, 250, 0.5)" }}>
//             By creating an account, you agree to our{" "}
//             <a href="#" className="underline" style={{ color: "#F4C542" }}>
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="underline" style={{ color: "#F4C542" }}>
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormContainer;
