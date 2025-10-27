import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300"
      style={{
        background: "rgba(250, 250, 250, 0.05)",
        borderColor: "rgba(66, 133, 244, 0.3)",
        color: "#FAFAFA",
      }}
    >
      <FcGoogle className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
