import React from "react";
import { Mail } from "lucide-react";

const EmailLoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-md"
    >
      <Mail className="w-5 h-5 text-slate-600" />
      <span className="font-semibold text-slate-700">Continue with Email</span>
    </button>
  );
};

export default EmailLoginButton;

// import React from "react";
// import { MdEmail } from "react-icons/md";

// const EmailLoginButton = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300"
//       style={{
//         background: "rgba(250, 250, 250, 0.05)",
//         borderColor: "rgba(244, 197, 66, 0.3)",
//         color: "#FAFAFA",
//       }}
//     >
//       <MdEmail className="w-5 h-5" />
//       <span>Continue with Email</span>
//     </button>
//   );
// };

// export default EmailLoginButton;
