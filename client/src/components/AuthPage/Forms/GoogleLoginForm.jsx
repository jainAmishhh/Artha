import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginForm = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Logged in with Google!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300 bg-white text-black font-medium"
        style={{
          borderColor: "rgba(66, 133, 244, 0.3)",
        }}
      >
        <FcGoogle className="w-6 h-6" />
        <span>{isLoading ? "Connecting..." : "Continue with Google"}</span>
      </button>
    </div>
  );
};

export default GoogleLoginForm;

