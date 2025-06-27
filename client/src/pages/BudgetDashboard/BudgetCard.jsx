import React from "react";
import { Plus } from "lucide-react";

const BudgetCard = ({ item, index, onEdit, onDelete }) => {
  const IconComponent = item.icon;

  return (
    <div
      key={item.id}
      className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group"
      style={{
        background: "rgba(250, 250, 250, 0.08)",
        borderColor: "rgba(244, 197, 66, 0.2)",
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div
            className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ background: item.color }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#FAFAFA" }}>
              {item.name}
            </h3>
            <p className="text-sm" style={{ color: "rgba(250, 250, 250, 0.6)" }}>
              Budget: ₹{item.budget.toLocaleString()}.00
            </p>
          </div>
        </div>
      </div>

      {/* Spent and Remaining Section */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span style={{ color: "rgba(250, 250, 250, 0.8)" }}>
            Spent ₹{item.spent.toLocaleString()}.00
          </span>
          <span className="font-semibold" style={{ color: "#F4C542" }}>
            Remaining ₹{item.remaining.toLocaleString()}.00
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ background: "rgba(250, 250, 250, 0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{
                width: `${Math.min(item.percentageSpent, 100)}%`,
                background: item.color,
              }}
            ></div>
          </div>
          <div className="absolute -top-1 right-0 transform translate-x-1/2">
            <div
              className="w-5 h-5 rounded-full shadow-lg flex items-center justify-center"
              style={{ background: "#FAFAFA" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#F4C542" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span
            className="text-xs"
            style={{ color: "rgba(250, 250, 250, 0.5)" }}
          >
            {item.percentageSpent.toFixed(1)}% used
          </span>
        </div>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex gap-2 justify-end mt-4">
        <button
          onClick={() => onEdit(item)}
          className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
          style={{ background: "#F4C542" }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
          style={{ background: "#B91C1C" }}
        >
          Delete
        </button>
      </div>
      
    </div>
  );
};

export default BudgetCard;


// import { Plus } from "lucide-react";
// import React from "react";

// const BudgetCard = ({ item, onEdit, onDelete }) => {
//   const IconComponent = item.icon;

//   return (
//     <div className="backdrop-blur-2xl rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group bg-[rgba(250,250,250,0.08)] border border-[rgba(244,197,66,0.2)]">
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex items-center gap-4">
//           <div
//             className={`bg-[${item.color}] p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
//           >
//             <IconComponent className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h3 className="text-xl text-[#fafafa] font-bold mb-1">
//               {item.name}
//             </h3>
//             <p className="text-sm text-[#fafafa99]">
//               Budget: ₹{item.budget.toLocaleString()}.00
//             </p>
//           </div>
//         </div>
//         <button className="p-3 rounded-full bg-[linear-gradient(135deg,#F4C542_0%,#E6B73A_100%)] text-white hover:scale-110 transition-all duration-300 shadow-[0_4px_15px_#F4C5424D]">
//           <Plus className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="space-y-4">
//         <div className="flex justify-between text-sm">
//           <span className="text-[#fafafacc]">
//             Spent ₹{item.spent.toLocaleString()}.00
//           </span>
//           <span className="text-[#f4c542] font-semibold">
//             Remaining ₹{item.remaining.toLocaleString()}.00
//           </span>
//         </div>

//         <div className="relative">
//           <div className="bg[#fafafa1a] w-full h-3 rounded-full overflow-hidden">
//             <div
//               className={`bg-[${item.color}] h-full w-[${Math.min(
//                 item.percentageSpent,
//                 100
//               )}%] rounded-full transition-all duration-1000 ease-out shadow-lg`}
//             ></div>
//           </div>
//           <div className="absolute -top-1 right-0 transform translate-x-1/2">
//             <div className="bg-[#fafafa] w-5 h-5 rounded-full shadow-lg flex items-center justify-center">
//               <div className="bg-[#f4c542] w-2 h-2 rounded-full"></div>
//             </div>
//           </div>
//         </div>

//         <div className="text-right">
//           <span className="text-[#fafafacc] text-xs">
//             {item.percentageSpent.toFixed(1)}% used
//           </span>
//         </div>

//         {/* Edit/Delete Buttons */}
//         <div className="flex gap-2 justify-end pt-2">
//           <button
//             onClick={() => onEdit(item)}
//             className="bg-[#f4c542] text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete(item.id)}
//             className="bg-[#b91c1c] text-sm px-4 py-2 rounded-lg text-white hover:scale-105 transition"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetCard;
