// import React from 'react';
// import {
//   Home,
//   BarChart,
//   ListChecks,
//   Clock,
//   Settings
// } from 'lucide-react';

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-[#f7f2ef] text-[#1f1f1f] font-[Poppins] flex">
//       {/* Sidebar */}
//       <aside className="w-1/5 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
//         <div className="flex flex-col items-center gap-4">
//           <img
//             src="https://i.pravatar.cc/100?img=1"
//             alt="User Avatar"
//             className="w-20 h-20 rounded-full"
//           />
//           <div className="text-center">
//             <h2 className="font-semibold text-lg">Sarah Connor</h2>
//             <p className="text-sm text-gray-500">sarahc@gmail.com</p>
//           </div>
//         </div>
//         <nav className="mt-10 space-y-6">
//           <NavItem icon={<Home />} label="Dashboard" active />
//           <NavItem icon={<BarChart />} label="Analytics" />
//           <NavItem icon={<ListChecks />} label="Task List" />
//           <NavItem icon={<Clock />} label="Tracking" />
//           <NavItem icon={<Settings />} label="Setting" />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <header className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-semibold">Hello, Sara</h1>
//             <p className="text-gray-500">Today is Monday, 20 October 2021</p>
//           </div>
//           <button className="bg-black text-white px-5 py-2 rounded-xl font-medium">
//             Add New Project
//           </button>
//         </header>

//         {/* Projects */}
//         <section className="grid grid-cols-3 gap-6 mb-10">
//           <ProjectCard
//             title="Web Development"
//             tasks="10 tasks"
//             progress="96%"
//             bgColor="bg-purple-700"
//             people="+7"
//           />
//           <ProjectCard
//             title="Mobile App Design"
//             tasks="12 tasks"
//             progress="46%"
//             bgColor="bg-sky-300"
//             people="+9"
//           />
//           <ProjectCard
//             title="Facebook Brand UI Kit"
//             tasks="22 tasks"
//             progress="73%"
//             bgColor="bg-orange-400"
//             people="+3"
//           />
//         </section>

//         <div className="grid grid-cols-3 gap-6">
//           {/* Tasks for Today */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Tasks for today</h2>
//             <TaskItem label="Mobile App" description="Prepare Figma file" color="border-orange-400" />
//             <TaskItem label="UX wireframes" description="Design UX wireframes" color="border-purple-400" />
//             <TaskItem label="Mobile App" description="Research" color="border-green-400" checked />
//           </div>

//           {/* Statistics */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Statistics</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <StatCard label="Tracked time" value="28 h" />
//               <StatCard label="Finished tasks" value="18" />
//               <StatCard label="New widget" value={<span className="text-xl">⋯</span>} />
//             </div>
//           </div>

//           {/* Pro Plan */}
//           <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
//             <div>
//               <p className="text-2xl font-semibold mb-2">$9.99 <span className="text-sm font-normal">p/m</span></p>
//               <p className="text-sm text-gray-500 mb-4">More productivity with premium!</p>
//             </div>
//             <img
//               src="https://cdn.dribbble.com/users/1233499/screenshots/16792767/media/0ed6be9cc0cf2452c71f7332a6f8a0b3.png"
//               alt="Illustration"
//               className="w-full h-32 object-contain"
//             />
//           </div>
//         </div>
//       </main>

//       {/* Calendar */}
//       <aside className="w-1/5 p-6">
//         <h2 className="text-lg font-semibold mb-4">Calendar</h2>
//         <CalendarDay date="Oct 20, 2021" events={[
//           { time: '10:00', label: 'Dribbble shot', desc: 'Facebook Brand', color: 'text-blue-400' },
//           { time: '13:20', label: 'Design', desc: 'Task Management', color: 'text-orange-400' },
//         ]} />
//         <CalendarDay date="Oct 21, 2021" events={[
//           { time: '10:00', label: 'UX Research', desc: 'Sleep App', color: 'text-purple-400' },
//           { time: '13:20', label: 'Design', desc: 'Task Management', color: 'text-orange-400' },
//           { time: '10:00', label: 'Dribbble Shot', desc: 'Meet Up', color: 'text-green-400' },
//         ]} />
//         <CalendarDay date="Oct 22, 2021" events={[
//           { time: '10:00', label: 'Dribbble Shot', desc: 'Meet Up', color: 'text-green-400' },
//           { time: '11:00', label: 'Design', desc: 'Mobile App', color: 'text-blue-400' },
//         ]} />
//       </aside>
//     </div>
//   );
// }

// function NavItem({ icon, label, active }) {
//   return (
//     <div
//       className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
//         active ? 'bg-gray-100 font-semibold' : ''
//       }`}
//     >
//       <span>{icon}</span>
//       <span>{label}</span>
//     </div>
//   );
// }

// function ProjectCard({ title, tasks, progress, bgColor, people }) {
//   return (
//     <div className={`p-6 rounded-2xl text-white ${bgColor} relative overflow-hidden`}>
//       <div className="absolute top-2 right-2 text-sm font-semibold">{people}</div>
//       <h3 className="text-xl font-semibold mb-1">{title}</h3>
//       <p className="text-sm">{tasks}</p>
//       <div className="w-full h-2 bg-white/30 rounded-full mt-2">
//         <div className="h-full bg-white rounded-full" style={{ width: progress }}></div>
//       </div>
//     </div>
//   );
// }

// function TaskItem({ label, description, color, checked }) {
//   return (
//     <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderColor: color }}>
//       <div>
//         <h4 className="font-semibold">{label}</h4>
//         <p className="text-sm text-gray-500">{description}</p>
//       </div>
//       <input type="checkbox" defaultChecked={checked} className="w-5 h-5 accent-black" />
//     </div>
//   );
// }

// function StatCard({ label, value }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md">
//       <p className="text-sm text-gray-500 mb-1">{label}</p>
//       <p className="text-lg font-semibold">{value}</p>
//     </div>
//   );
// }

// function CalendarDay({ date, events }) {
//   return (
//     <div className="mb-6">
//       <p className="text-sm font-semibold text-gray-700 mb-2">{date}</p>
//       <div className="space-y-2">
//         {events.map((event, idx) => (
//           <div key={idx} className="text-sm">
//             <p className="font-semibold">
//               {event.time} <span className={event.color}>•</span> {event.label}
//             </p>
//             <p className="text-gray-500 text-xs ml-6">{event.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
