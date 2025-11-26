import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Shield, CheckCircle, Chrome, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginForm = ({ isLogin = true, onGoogleAuth, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      setIsLoading(true);
      const userObject = jwtDecode(credentialResponse.credential);
      console.log("✅ Google User:", userObject);
      
      if (onGoogleAuth) onGoogleAuth(userObject);
      setIsLoading(false);
    } catch (err) {
      console.error("❌ Failed to decode Google token", err);
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("❌ Google Login Failed");
  };

  return (
    <div className="space-y-6">
      
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to options
        </button>
      )}

      {/* Google Branding */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto">
          <FcGoogle className="w-10 h-10 text-blue-600" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </h3>
          <p className="text-slate-600">
            {isLogin
              ? "Use your Google account to sign in securely"
              : "Create your account instantly with Google"}
          </p>
        </div>
      </div>

      {/* OAuth Button */}
      <div className="flex justify-center">
        {isLoading ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-100 border border-slate-300"
          >
            <div className="animate-spin h-5 w-5 border-2 border-slate-400 border-t-transparent rounded-full"></div>
            <span className="text-slate-600">Connecting...</span>
          </button>
        ) : (
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              shape="rectangular"
              text={isLogin ? "signin_with" : "signup_with"}
              width="100%"
            />
          </div>
        )}
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Shield size={16} className="text-emerald-600" />
          <span>Secure OAuth</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle size={16} className="text-blue-600" />
          <span>Instant Access</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Why Google Sign-In?</strong> It's secure, fast, and you don't need to remember another password.
        </p>
      </div>
    </div>
  );
};

export default GoogleLoginForm;

// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { Shield, CheckCircle } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";

// const GoogleLoginForm = ({ isLogin = true, onGoogleAuth, onBack }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGoogleSuccess = (credentialResponse) => {
//     try {
//       setIsLoading(true);

//       const userObject = jwtDecode(credentialResponse.credential);
//       console.log("✅ Google User:", userObject);

//       if (onGoogleAuth) onGoogleAuth(userObject);

//       setIsLoading(false);
//     } catch (err) {
//       console.error("❌ Failed to decode Google token", err);
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     console.error("❌ Google Login Failed");
//   };

//   return (
//     <div className="space-y-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
//       {/* Back Button */}
//       {onBack && (
//         <button
//           onClick={onBack}
//           className="text-sm text-yellow-300 hover:underline mb-3"
//         >
//           ← Back
//         </button>
//       )}

//       {/* Google Logo Circle */}
//       <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full mx-auto">
//         <FcGoogle className="w-10 h-10" />
//       </div>

//       {/* Title */}
//       <div className="text-center space-y-1">
//         <h3 className="text-xl font-bold text-white">
//           {isLogin ? "Continue with Google" : "Sign up with Google"}
//         </h3>
//         <p className="text-gray-200 text-sm">
//           {isLogin
//             ? "Sign in using your Google account"
//             : "Create your account instantly"}
//         </p>
//       </div>

//       {/* OAuth Button */}
//       <div className="flex justify-center">
//         {isLoading ? (
//           <button
//             disabled
//             className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white text-black shadow-lg"
//           >
//             <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
//             Connecting...
//           </button>
//         ) : (
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             theme="outline"
//             size="large"
//             shape="pill"
//             text={isLogin ? "signin_with" : "signup_with"}
//           />
//         )}
//       </div>

//       {/* Footer Badges */}
//       <div className="flex items-center gap-4 text-xs text-gray-200 justify-center pt-2">
//         <div className="flex items-center gap-1">
//           <Shield size={14} className="text-green-400" />
//           <span>Secure OAuth</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <CheckCircle size={14} className="text-teal-300" />
//           <span>Instant Access</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleLoginForm;
