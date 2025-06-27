// import React from "react";
// import { X } from "lucide-react";

// const BudgetModal = ({
//   showModal,
//   editingItem,
//   newItem,
//   setEditingItem,
//   setNewItem,
//   onClose,
//   handleAddNewItem,
//   handleEditItem,
// }) => {
//   const isEditing = Boolean(editingItem);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     isEditing
//       ? setEditingItem({ ...editingItem, [name]: value })
//       : setNewItem({ ...newItem, [name]: value });
//   };

//   const handleSubmit = () => {
//     if (isEditing) {
//       handleEditItem(editingItem);
//     } else {
//       handleAddNewItem();
//     }
//     onClose();
//   };

//   if (!showModal) return null;

//   const data = isEditing ? editingItem : newItem;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/40">
//       <div
//         className="bg-[#1F2937] rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-fade-in"
//         style={{
//           border: "1px solid rgba(244, 197, 66, 0.2)",
//           background: "rgba(250, 250, 250, 0.05)",
//         }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-white hover:text-yellow-400 transition"
//         >
//           <X size={22} />
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-white">
//           {isEditing ? "Edit Budget Category" : "Add New Budget Category"}
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-white mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="e.g. Groceries"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-white mb-1">
//               Budget (₹)
//             </label>
//             <input
//               type="number"
//               name="budget"
//               value={data.budget}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="Enter budget amount"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-white mb-1">
//               Spent (₹)
//             </label>
//             <input
//               type="number"
//               name="spent"
//               value={data.spent}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="Amount spent"
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition"
//           >
//             {isEditing ? "Update" : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetModal;


import React from "react";

const BudgetModal = ({
  showModal,
  editingItem,
  newItem,
  setEditingItem,
  setNewItem,
  onClose,
  handleAddNewItem,
  handleEditItem,
}) => {
  if (!showModal && !editingItem) return null;

  const handleChange = (field, value) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    } else {
      setNewItem({ ...newItem, [field]: value });
    }
  };

  const values = editingItem || newItem;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">
          {editingItem ? "Edit Budget Category" : "Add New Budget Category"}
        </h2>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Category Name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Budget"
            value={values.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Spent"
            value={values.spent}
            onChange={(e) => handleChange("spent", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 rounded-lg text-sm text-gray-600 border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{ background: "#22543D" }}
            onClick={editingItem ? handleEditItem : handleAddNewItem}
          >
            {editingItem ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
