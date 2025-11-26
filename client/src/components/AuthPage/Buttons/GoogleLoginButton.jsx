import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        active
          ? "w-12 h-12 rounded-full"
          : "w-full"
      } flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 transition-all duration-300 hover:shadow-md`}
    >
      <FcGoogle className="w-5 h-5 text-blue-600" />
      {!active && <span className="font-semibold text-slate-700">Continue with Google</span>}
    </button>
  );
};

export default GoogleLoginButton;

// import React from "react";
// import { FcGoogle } from "react-icons/fc";

// const GoogleLoginButton = ({ onClick, active }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={
//         active
//           ? "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 shadow-black"
//           : "w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300"
//       }
//       style={{
//         background: active ? "" : "rgba(250, 250, 250, 0.05)",
//         borderColor: active ? "" : "rgba(66, 133, 244, 0.3)",
//         color: "#FAFAFA",
//       }}
//     >
//       <FcGoogle className="w-5 h-5" />
//       {!active && <span>Continue with Google</span>}
//     </button>
//   );
// };

// export default GoogleLoginButton;
