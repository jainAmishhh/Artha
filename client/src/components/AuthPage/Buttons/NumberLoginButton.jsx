import React from "react";
import { MdPhoneAndroid } from "react-icons/md";

const NumberLoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50 transition-all duration-300 hover:shadow-md"
    >
      <MdPhoneAndroid className="w-5 h-5 text-emerald-600" />
      <span className="font-semibold text-slate-700">Continue with Phone</span>
    </button>
  );
};

export default NumberLoginButton;

// import React from "react";
// import { MdPhoneAndroid } from "react-icons/md";

// const NumberLoginButton = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300"
//       style={{
//         background: "rgba(250, 250, 250, 0.05)",
//         borderColor: "rgba(76, 175, 80, 0.3)",
//         color: "#FAFAFA",
//       }}
//     >
//       <MdPhoneAndroid className="w-5 h-5" />
//       <span>Continue with Phone Number</span>
//     </button>
//   );
// };

// export default NumberLoginButton;
