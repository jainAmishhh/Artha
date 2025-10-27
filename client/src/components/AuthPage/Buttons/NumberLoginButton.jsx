import React from "react";
import { MdPhoneAndroid } from "react-icons/md";

const NumberLoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300"
      style={{
        background: "rgba(250, 250, 250, 0.05)",
        borderColor: "rgba(76, 175, 80, 0.3)",
        color: "#FAFAFA",
      }}
    >
      <MdPhoneAndroid className="w-5 h-5" />
      <span>Continue with Phone Number</span>
    </button>
  );
};

export default NumberLoginButton;
