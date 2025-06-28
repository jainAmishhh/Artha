import React from "react";
import { Download, Eye, RefreshCw, Sparkles, Plus } from "lucide-react";

const TransactionHeader = ({ onAddTransactionClick }) => {
  return (
    <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#f4c54233] rounded-3xl p-6 mb-8 shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-[linear-gradient(135deg,#F4C542_0%,#E6B73A_100%)] p-3 rounded-2xl shadow-lg">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#fafafa] text-3xl font-bold flex items-center gap-2">
              Transaction History
              <Sparkles className="text-[#f4c542] w-6 h-6 animate-pulse" />
            </h1>
            <p className="text-[#fafafa99] text-sm">
              Track all your financial activities
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={onAddTransactionClick}
            className="bg-[#34D39933] hover:bg-[#34D39955] text-[#FAFAFA] px-4 py-2 flex items-center gap-2 rounded-xl backdrop-blur-xl border border-[#34D39944] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <Plus size={18} />
            Add
          </button>
          <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54333] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
            <Download className="w-5 h-5" />
          </button>
          <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54333] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;


// import React from "react";
// import { Download, Eye, RefreshCw, Sparkles } from "lucide-react";

// const TransactionHeader = () => {
//   return (
//     <div className="bg-[#fafafa14] backdrop-blur-2xl border border-[#f4c54233] rounded-3xl p-6 mb-8 shadow-2xl">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="bg-[linear-gradient(135deg,#F4C542_0%,#E6B73A_100%)] p-3 rounded-2xl shadow-lg">
//             <RefreshCw className="w-8 h-8 text-white" />
//           </div>
//           <div>
//             <h1 className="text-[#fafafa] text-3xl font-bold flex items-center gap-2">
//               Transaction History
//               <Sparkles className="text-[#f4c542] w-6 h-6 animate-pulse" />
//             </h1>
//             <p className="text-[#fafafa99] text-sm">
//               Track all your financial activities
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54333] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
//             <Download className="w-5 h-5" />
//           </button>
//           <button className="bg-[#fafafa14] text-[#fafafa] p-3 backdrop-blur-xl border border-[#f4c54333] rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
//             <Eye className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionHeader;
