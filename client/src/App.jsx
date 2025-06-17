import React from 'react'
import Header from './components/Header/Header'
// import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <>
      <Header />
      {/* <Dashboard /> */}
    </>
  )
}

export default App

// import React from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// import { LineChart, Line, XAxis, Tooltip } from "recharts";
// import { Plus, ChevronLeft, Download } from "lucide-react";

// const data = [
//   { name: "Jun", value: 120 },
//   { name: "Jul", value: 180 },
//   { name: "Aug", value: 90 },
//   { name: "Sep", value: 268 },
//   { name: "Oct", value: 150 },
// ];

// export default function FinanceDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Left Card */}
//       <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
//         <h2 className="text-sm font-semibold text-gray-500">Good Morning!</h2>
//         <h1 className="text-xl font-bold mb-4">Iqbal Hossain</h1>
//         <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between mb-4">
//           <div>
//             <p className="text-sm">$5480.00</p>
//             <span className="text-xs text-gray-400">Balance</span>
//           </div>
//           <div className="bg-orange-500 h-1 w-24 rounded-full mt-2"></div>
//         </div>
//         <div className="flex justify-between mb-4">
//           <span className="text-green-600 font-medium">+24% Income</span>
//           <span className="text-orange-600 font-medium">-42% Expense</span>
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between items-center border-b pb-2">
//             <div className="flex items-center gap-2">
//               <span className="text-pink-500">⬤</span>
//               <div>
//                 <p className="font-semibold">Dribbble Pro</p>
//                 <p className="text-xs text-gray-400">18 Sep, 2021</p>
//               </div>
//             </div>
//             <p className="font-semibold">-$145.00</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <span className="text-blue-500">⬤</span>
//               <div>
//                 <p className="font-semibold">Figma</p>
//                 <p className="text-xs text-gray-400">14 Sep, 2021</p>
//               </div>
//             </div>
//             <p className="font-semibold">-$46.00</p>
//           </div>
//         </div>
//       </div>

//       {/* Middle Card */}
//       <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
//         <h1 className="text-lg font-bold mb-2">Statistics</h1>
//         <p className="text-2xl font-bold">$5480.00</p>
//         <p className="text-sm text-gray-500">Sep 16, 2021</p>
//         <div className="flex justify-between text-sm text-gray-600 mt-4">
//           <span className="font-semibold text-black">Week</span>
//           <span className="font-semibold text-black border-b-2 border-black">Month</span>
//           <span>Year</span>
//         </div>
//         <div className="my-4">
//           <LineChart width={300} height={150} data={data}>
//             <XAxis dataKey="name" stroke="#888" fontSize={12} />
//             <Tooltip />
//             <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} />
//           </LineChart>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm font-semibold mb-1">Top Spending</p>
//           <div className="flex justify-between">
//             <p>iPhone 13</p>
//             <p className="text-red-500">-$745.00</p>
//           </div>
//           <div className="flex justify-between">
//             <p>Payoneer</p>
//             <p className="text-red-500">-$35.00</p>
//           </div>
//         </div>
//       </div>

//       {/* Right Card */}
//       <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <ChevronLeft className="w-5 h-5" />
//           <span className="text-sm text-gray-400">Create Invoice</span>
//           <Download className="w-5 h-5" />
//         </div>
//         <h2 className="text-xl font-bold">Invoice# 27by46</h2>
//         <p className="text-sm text-gray-400 mb-4">Sep 28, 2021</p>
//         <div className="mb-4">
//           <p className="text-xs text-gray-400">Bill to</p>
//           <div className="flex justify-between items-center">
//             <div className="flex gap-2 items-center">
//               <div className="w-8 h-8 bg-white rounded-full"></div>
//               <div>
//                 <p>Steven Smith</p>
//                 <p className="text-xs text-gray-400">Bitopi Agency</p>
//               </div>
//             </div>
//             <p>$1246.00</p>
//           </div>
//         </div>
//         <div className="border border-dashed border-gray-600 p-4 rounded-xl text-center mb-4">
//           <Plus className="mx-auto w-5 h-5" />
//           <p className="text-sm">Add Items</p>
//         </div>
//         <div className="space-y-1 text-sm">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>$1296.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Tax</span>
//             <span>$0.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Discount</span>
//             <span className="text-green-500">-$50.00</span>
//           </div>
//           <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-semibold">
//             <span>Total</span>
//             <span>$1246.00</span>
//           </div>
//         </div>
//         <button className="w-full mt-4 bg-white text-black font-bold hover:bg-gray-200">Save Invoice</button>
//       </div>
//     </div>
//   );
// }
