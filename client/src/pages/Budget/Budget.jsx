import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ArrowLeft, Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, RefreshCw, BarChart3, DollarSign, Sparkles } from 'lucide-react';

const BudgetDashboard = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('1Y');
  const [chartData, setChartData] = useState([]);
  const [budgetItems, setBudgetItems] = useState([
    {
      id: 1,
      name: 'Education',
      icon: BookOpen,
      budget: 1000,
      spent: 100,
      color: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'
    },
    {
      id: 2,
      name: 'Emergency',
      icon: AlertTriangle,
      budget: 1000,
      spent: 200,
      color: 'linear-gradient(135deg, #8B1C22 0%, #A52A2A 100%)'
    },
    {
      id: 3,
      name: 'Housing',
      icon: Home,
      budget: 2500,
      spent: 1300,
      color: 'linear-gradient(135deg, #22543D 0%, #2D5A41 100%)'
    }
  ]);

  const timeFilterData = {
    '1D': [
      { name: '6AM', value: 380 },
      { name: '12PM', value: 420 },
      { name: '6PM', value: 400 },
      { name: '12AM', value: 450 }
    ],
    '1W': [
      { name: 'Mon', value: 200 },
      { name: 'Tue', value: 350 },
      { name: 'Wed', value: 300 },
      { name: 'Thu', value: 400 },
      { name: 'Fri', value: 350 },
      { name: 'Sat', value: 400 },
      { name: 'Sun', value: 320 }
    ],
    '1M': [
      { name: 'Week 1', value: 100 },
      { name: 'Week 2', value: 250 },
      { name: 'Week 3', value: 200 },
      { name: 'Week 4', value: 350 }
    ],
    '1Y': [
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 150 },
      { name: 'Apr', value: 400 },
      { name: 'May', value: 200 },
      { name: 'Jun', value: 600 },
      { name: 'Jul', value: 400 }
    ]
  };

  useEffect(() => {
    setChartData(timeFilterData[activeTimeFilter]);
  }, [activeTimeFilter]);

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.1) 0%, transparent 70%)'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
                  Budget Dashboard
                  <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#F4C542'}} />
                </h1>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Manage your finances intelligently</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="p-3 backdrop-blur-xl border rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)', color: '#FAFAFA'}}>
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Overview */}
          <div className="lg:col-span-2 backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
            {/* Total Budget */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{background: 'rgba(244, 197, 66, 0.15)'}}>
                <TrendingUp className="w-4 h-4" style={{color: '#F4C542'}} />
                <span className="text-sm font-medium uppercase tracking-wider" style={{color: '#F4C542'}}>Total Budget ($)</span>
              </div>
              <div className="text-6xl font-bold mb-2" style={{
                background: 'linear-gradient(135deg, #F4C542 0%, #FAFAFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                $ {totalBudget.toLocaleString()}.00
              </div>
              <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{color: '#F4C542'}}>
                <TrendingUp className="w-5 h-5" />
                + ${(totalBudget - 8800).toLocaleString()}.00
              </div>
            </div>

            {/* Time Filters */}
            <div className="flex justify-center gap-2 mb-8">
              {['1D', '1W', '1M', '1Y'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTimeFilter(filter)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                    activeTimeFilter === filter
                      ? 'text-white shadow-lg transform scale-105'
                      : 'hover:text-white'
                  }`}
                  style={activeTimeFilter === filter 
                    ? {
                        background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
                        boxShadow: '0 8px 25px rgba(244, 197, 66, 0.3)'
                      }
                    : {
                        background: 'rgba(250, 250, 250, 0.08)',
                        color: 'rgba(250, 250, 250, 0.7)'
                      }
                  }
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="relative h-80 mb-6">
              <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                ${chartData[chartData.length - 1]?.value || 400}
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F4C542" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F4C542" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#FAFAFA', fontSize: 12, opacity: 0.8 }}
                  />
                  <YAxis hide />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#F4C542"
                    strokeWidth={4}
                    fill="url(#colorGradient)"
                    dot={{ fill: '#F4C542', strokeWidth: 3, stroke: '#FAFAFA', r: 6 }}
                    activeDot={{ r: 8, stroke: '#FAFAFA', strokeWidth: 3, fill: '#F4C542' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Items Sidebar */}
          <div className="flex flex-col gap-6">
            {budgetItems.map((item, index) => {
              const IconComponent = item.icon;
              const progressPercentage = (item.spent / item.budget) * 100;
              const remaining = item.budget - item.spent;

              return (
                <div
                  key={item.id}
                  className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-500 group"
                  style={{ 
                    background: 'rgba(250, 250, 250, 0.08)', 
                    borderColor: 'rgba(244, 197, 66, 0.2)',
                    animationDelay: `${index * 100}ms` 
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{background: item.color}}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{color: '#FAFAFA'}}>{item.name}</h3>
                        <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Budget: ${item.budget.toLocaleString()}.00</p>
                      </div>
                    </div>
                    <button className="p-3 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg" style={{
                      background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)',
                      boxShadow: '0 4px 15px rgba(244, 197, 66, 0.3)'
                    }}>
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span style={{color: 'rgba(250, 250, 250, 0.8)'}}>Spent ${item.spent.toLocaleString()}.00</span>
                      <span className="font-semibold" style={{color: '#F4C542'}}>Remaining ${remaining.toLocaleString()}.00</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full h-3 rounded-full overflow-hidden" style={{background: 'rgba(250, 250, 250, 0.1)'}}>
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                          style={{ 
                            width: `${Math.min(progressPercentage, 100)}%`,
                            background: item.color
                          }}
                        ></div>
                      </div>
                      <div className="absolute -top-1 right-0 transform translate-x-1/2">
                        <div className="w-5 h-5 rounded-full shadow-lg flex items-center justify-center" style={{background: '#FAFAFA'}}>
                          <div className="w-2 h-2 rounded-full" style={{background: '#F4C542'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>{progressPercentage.toFixed(1)}% used</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Category Button */}
            <button className="backdrop-blur-2xl border-2 border-dashed rounded-3xl p-8 hover:border-opacity-70 transition-all duration-300 group" style={{
              background: 'rgba(244, 197, 66, 0.05)',
              borderColor: 'rgba(244, 197, 66, 0.3)'
            }}>
              <div className="text-center">
                <div className="p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold" style={{color: '#FAFAFA'}}>Add New Category</p>
                <p className="text-sm mt-1" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Create a new budget category</p>
              </div>
            </button>
          </div>
        </div>

                {/* Bottom Navigation - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4" style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(244, 197, 66, 0.2)'
        }}>
          <div className="flex justify-around max-w-md mx-auto">
            {[
              { icon: Home, label: 'Home', active: false },
              { icon: RefreshCw, label: 'Transaction', active: false },
              { icon: BarChart3, label: 'Plan', active: false },
              { icon: DollarSign, label: 'Budget', active: true }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                    item.active ? 'scale-110' : ''
                  }`}
                  style={item.active 
                    ? {
                        background: 'rgba(244, 197, 66, 0.2)',
                        color: '#FAFAFA'
                      }
                    : {
                        color: 'rgba(250, 250, 250, 0.6)'
                      }
                  }
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
// import { ArrowLeft, Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, RefreshCw, BarChart3, DollarSign, Sparkles } from 'lucide-react';

// const BudgetDashboard = () => {
//   const [activeTimeFilter, setActiveTimeFilter] = useState('1Y');
//   const [chartData, setChartData] = useState([]);
//   const [budgetItems, setBudgetItems] = useState([
//     {
//       id: 1,
//       name: 'Education',
//       icon: BookOpen,
//       budget: 1000,
//       spent: 100,
//       color: 'from-blue-500 to-purple-600'
//     },
//     {
//       id: 2,
//       name: 'Emergency',
//       icon: AlertTriangle,
//       budget: 1000,
//       spent: 200,
//       color: 'from-red-500 to-orange-500'
//     },
//     {
//       id: 3,
//       name: 'Housing',
//       icon: Home,
//       budget: 2500,
//       spent: 1300,
//       color: 'from-green-500 to-teal-500'
//     }
//   ]);

//   const timeFilterData = {
//     '1D': [
//       { name: '6AM', value: 380 },
//       { name: '12PM', value: 420 },
//       { name: '6PM', value: 400 },
//       { name: '12AM', value: 450 }
//     ],
//     '1W': [
//       { name: 'Mon', value: 200 },
//       { name: 'Tue', value: 350 },
//       { name: 'Wed', value: 300 },
//       { name: 'Thu', value: 400 },
//       { name: 'Fri', value: 350 },
//       { name: 'Sat', value: 400 },
//       { name: 'Sun', value: 320 }
//     ],
//     '1M': [
//       { name: 'Week 1', value: 100 },
//       { name: 'Week 2', value: 250 },
//       { name: 'Week 3', value: 200 },
//       { name: 'Week 4', value: 350 }
//     ],
//     '1Y': [
//       { name: 'Feb', value: 300 },
//       { name: 'Mar', value: 150 },
//       { name: 'Apr', value: 400 },
//       { name: 'May', value: 200 },
//       { name: 'Jun', value: 600 },
//       { name: 'Jul', value: 400 }
//     ]
//   };

//   useEffect(() => {
//     setChartData(timeFilterData[activeTimeFilter]);
//   }, [activeTimeFilter]);

//   const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
//   const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
//   const totalRemaining = totalBudget - totalSpent;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
//         {/* Header */}
//         <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8 shadow-2xl">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-lg">
//                 <DollarSign className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-white flex items-center gap-2">
//                   Budget Dashboard
//                   <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//                 </h1>
//                 <p className="text-white/60 text-sm">Manage your finances intelligently</p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Budget Overview */}
//           <div className="lg:col-span-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
//             {/* Total Budget */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full mb-4">
//                 <TrendingUp className="w-4 h-4 text-violet-300" />
//                 <span className="text-sm font-medium text-violet-200 uppercase tracking-wider">Total Budget ($)</span>
//               </div>
//               <div className="text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white to-violet-200 bg-clip-text ">
//                 $ {totalBudget.toLocaleString()}.00
//               </div>
//               <div className="flex items-center justify-center gap-2 text-emerald-400 text-lg font-semibold">
//                 <TrendingUp className="w-5 h-5" />
//                 + ${(totalBudget - 8800).toLocaleString()}.00
//               </div>
//             </div>

//             {/* Time Filters */}
//             <div className="flex justify-center gap-2 mb-8">
//               {['1D', '1W', '1M', '1Y'].map((filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => setActiveTimeFilter(filter)}
//                   className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
//                     activeTimeFilter === filter
//                       ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 transform scale-105'
//                       : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>

//             {/* Chart */}
//             <div className="relative h-80 mb-6">
//               <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
//                 ${chartData[chartData.length - 1]?.value || 400}
//               </div>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={chartData}>
//                   <defs>
//                     <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
//                     </linearGradient>
//                   </defs>
//                   <XAxis 
//                     dataKey="name" 
//                     axisLine={false} 
//                     tickLine={false}
//                     tick={{ fill: '#ffffff80', fontSize: 12 }}
//                   />
//                   <YAxis hide />
//                   <Area
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#8b5cf6"
//                     strokeWidth={4}
//                     fill="url(#colorGradient)"
//                     dot={{ fill: '#8b5cf6', strokeWidth: 3, stroke: '#ffffff', r: 6 }}
//                     activeDot={{ r: 8, stroke: '#ffffff', strokeWidth: 3, fill: '#8b5cf6' }}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Budget Items Sidebar */}
//           <div className="flex flex-col gap-6">
//             {budgetItems.map((item, index) => {
//               const IconComponent = item.icon;
//               const progressPercentage = (item.spent / item.budget) * 100;
//               const remaining = item.budget - item.spent;

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-3xl group"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-4 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                         <IconComponent className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
//                         <p className="text-white/60 text-sm">Budget: ${item.budget.toLocaleString()}.00</p>
//                       </div>
//                     </div>
//                     <button className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-white/80">Spent ${item.spent.toLocaleString()}.00</span>
//                       <span className="text-emerald-400 font-semibold">Remaining ${remaining.toLocaleString()}.00</span>
//                     </div>
                    
//                     <div className="relative">
//                       <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
//                           style={{ width: `${Math.min(progressPercentage, 100)}%` }}
//                         ></div>
//                       </div>
//                       <div className="absolute -top-1 right-0 transform translate-x-1/2">
//                         <div className="w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center">
//                           <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="text-right">
//                       <span className="text-xs text-white/50">{progressPercentage.toFixed(1)}% used</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Add New Category Button */}
//             <button className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-2xl border-2 border-dashed border-white/30 rounded-3xl p-8 hover:border-white/50 transition-all duration-300 hover:bg-white/10 group">
//               <div className="text-center">
//                 <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                   <Plus className="w-8 h-8 text-white" />
//                 </div>
//                 <p className="text-white font-semibold">Add New Category</p>
//                 <p className="text-white/60 text-sm mt-1">Create a new budget category</p>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Bottom Navigation - Mobile */}
//         <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/10 backdrop-blur-2xl border-t border-white/20 p-4">
//           <div className="flex justify-around max-w-md mx-auto">
//             {[
//               { icon: Home, label: 'Home', active: false },
//               { icon: RefreshCw, label: 'Transaction', active: false },
//               { icon: BarChart3, label: 'Plan', active: false },
//               { icon: DollarSign, label: 'Budget', active: true }
//             ].map((item, index) => {
//               const IconComponent = item.icon;
//               return (
//                 <button
//                   key={index}
//                   className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
//                     item.active
//                       ? 'bg-gradient-to-r from-violet-500/30 to-purple-500/30 text-white scale-110'
//                       : 'text-white/60 hover:text-white hover:bg-white/10'
//                   }`}
//                 >
//                   <IconComponent className="w-5 h-5" />
//                   <span className="text-xs font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetDashboard;