// ✔ Create Todo
// axios.post("/api/todos/create", newTodo);

// ✔ Get Todos
// axios.get("/api/todos/all");

// ✔ Filter + Sort
// axios.get("/api/todos/filter", {
//   params: {
//     search,
//     status,
//     priority,
//     role,
//     sortBy,
//     sortOrder
//   }
// });

// ✔ Toggle Status
// axios.patch(`/api/todos/toggle/${id}`);

// ✔ Update
// axios.put(`/api/todos/${id}`, updatedTodo);

// ✔ Delete
// axios.delete(`/api/todos/${id}`);

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, 
  CheckCircle, Circle, Clock, Star, User, Briefcase, Heart, 
  Code, Trash2, Edit3, Filter, ChevronDown, Calendar,
  Target, Zap, Award, ListTodo
} from 'lucide-react';
import axios from '../../api/axios';

const TodoDashboard = () => {
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [activePriorityFilter, setActivePriorityFilter] = useState('All');
  const [activeRoleFilter, setActiveRoleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    role: 'Personal',
    dueDate: '',
    dueTime: ''
  });

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete React Project Documentation',
      description: 'Write comprehensive documentation for the new React dashboard project',
      priority: 'high',
      role: 'Development',
      status: 'pending',
      dueDate: '2025-06-20',
      dueTime: '15:00',
      createdAt: '2025-06-18T10:30:00',
      icon: Code,
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Team Meeting Preparation',
      description: 'Prepare agenda and materials for weekly team standup',
      priority: 'medium',
      role: 'Work',
      status: 'pending',
      dueDate: '2025-06-19',
      dueTime: '09:00',
      createdAt: '2025-06-18T08:15:00',
      icon: Briefcase,
      color: '#8B5CF6'
    },
    {
      id: 3,
      title: 'Grocery Shopping',
      description: 'Buy ingredients for weekend meal prep',
      priority: 'low',
      role: 'Personal',
      status: 'completed',
      dueDate: '2025-06-18',
      dueTime: '18:00',
      createdAt: '2025-06-17T14:20:00',
      completedAt: '2025-06-18T17:30:00',
      icon: Home,
      color: '#10B981'
    },
    {
      id: 4,
      title: 'Exercise - Morning Run',
      description: '5km morning run in the park',
      priority: 'medium',
      role: 'Health',
      status: 'completed',
      dueDate: '2025-06-18',
      dueTime: '06:30',
      createdAt: '2025-06-17T22:00:00',
      completedAt: '2025-06-18T06:45:00',
      icon: Heart,
      color: '#EF4444'
    },
    {
      id: 5,
      title: 'Learn TypeScript Advanced Features',
      description: 'Study generics, utility types, and advanced TypeScript patterns',
      priority: 'high',
      role: 'Learning',
      status: 'pending',
      dueDate: '2025-06-22',
      dueTime: '20:00',
      createdAt: '2025-06-18T12:00:00',
      icon: BookOpen,
      color: '#F59E0B'
    },
  ]);

  const getFilteredAndSortedTodos = () => {
    let filtered = todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeStatusFilter === 'All' || todo.status === activeStatusFilter;
      const matchesPriority = activePriorityFilter === 'All' || todo.priority === activePriorityFilter;
      const matchesRole = activeRoleFilter === 'All' || todo.role === activeRoleFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesRole;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate + ' ' + a.dueTime);
          bValue = new Date(b.dueDate + ' ' + b.dueTime);
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredTodos = getFilteredAndSortedTodos();
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.status === 'completed').length;
  const pendingTodos = todos.filter(t => t.status === 'pending').length;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const roles = ['All', ...new Set(todos.map(t => t.role))];
  const priorities = ['All', 'high', 'medium', 'low'];
  const statuses = ['All', 'pending', 'completed'];

  const toggleTodoStatus = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            status: todo.status === 'completed' ? 'pending' : 'completed',
            completedAt: todo.status === 'pending' ? new Date().toISOString() : null
          }
        : todo
    ));
  };

  const addTodo = async () => {
    if (!newTodo.title.trim()) return;
    
    const todo = {
      id: Date.now(),
      title: newTodo.title,
      description: newTodo.description,
      priority: newTodo.priority,
      role: newTodo.role,
      status: 'pending',
      dueDate: newTodo.dueDate,
      dueTime: newTodo.dueTime,
      createdAt: new Date().toISOString(),
      icon: getRoleIcon(newTodo.role),
      color: getRoleColor(newTodo.role)
    };
    
    setTodos([todo, ...todos]);
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      role: 'Personal',
      dueDate: '',
      dueTime: ''
    });
    setShowAddTodo(false);
  };

  const handleAddTodo = async (addTodo) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/apitodos/create"
      )
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add Todo");
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getRoleIcon = (role) => {
    const iconMap = {
      'Personal': Home,
      'Work': Briefcase,
      'Development': Code,
      'Learning': BookOpen,
      'Health': Heart,
      'Default': User
    };
    return iconMap[role] || iconMap['Default'];
  };

  const getRoleColor = (role) => {
    const colorMap = {
      'Personal': '#10B981',
      'Work': '#8B5CF6',
      'Development': '#3B82F6',
      'Learning': '#F59E0B',
      'Health': '#EF4444',
      'Default': '#6B7280'
    };
    return colorMap[role] || colorMap['Default'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981'
    };
    return colors[priority];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate, dueTime, status) => {
    if (status === 'completed') return false;
    const now = new Date();
    const due = new Date(dueDate + ' ' + dueTime);
    return due < now;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-purple-50/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <ListTodo className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-800">Todo Dashboard</h1>
                <p className="text-slate-600">Organize and track your tasks efficiently</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddTodo(true)}
              className="flex items-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Target className="text-blue-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Total Tasks</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{totalTodos}</p>
            <p className="text-xs text-slate-500 mt-1">All your tasks</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <CheckCircle className="text-emerald-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{completedTodos}</p>
            <p className="text-xs text-emerald-600 mt-1">Great progress!</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Clock className="text-amber-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{pendingTodos}</p>
            <p className="text-xs text-slate-500 mt-1">Tasks remaining</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Award className="text-purple-600" size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">Completion</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{completionRate}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </div>

            {/* Sort and Filter */}
            <div className="flex gap-3">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white text-slate-700"
              >
                <option value="dueDate-asc">Due Date (Earliest)</option>
                <option value="dueDate-desc">Due Date (Latest)</option>
                <option value="priority-desc">Priority (High to Low)</option>
                <option value="priority-asc">Priority (Low to High)</option>
                <option value="role-asc">Role (A-Z)</option>
                <option value="status-asc">Status</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  showFilters 
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Filter size={18} />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  value={activeStatusFilter}
                  onChange={(e) => setActiveStatusFilter(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                <select
                  value={activePriorityFilter}
                  onChange={(e) => setActivePriorityFilter(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'All' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={activeRoleFilter}
                  onChange={(e) => setActiveRoleFilter(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Your Tasks ({filteredTodos.length})
            </h2>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-4 bg-purple-100 rounded-2xl mx-auto w-fit mb-4">
                  <Search className="w-12 h-12 text-purple-600" />
                </div>
                <p className="text-xl font-semibold text-slate-800 mb-2">No tasks found</p>
                <p className="text-slate-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredTodos.map((todo) => {
                const IconComponent = todo.icon;
                const isTaskOverdue = isOverdue(todo.dueDate, todo.dueTime, todo.status);
                
                return (
                  <div
                    key={todo.id}
                    className={`group bg-gradient-to-br from-slate-50 to-white border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 ${
                      todo.status === 'completed' ? 'opacity-60' : ''
                    } ${isTaskOverdue ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTodoStatus(todo.id)}
                        className="mt-1 hover:scale-110 transition-transform"
                      >
                        {todo.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-400 hover:text-purple-500" />
                        )}
                      </button>
                      
                      {/* Icon */}
                      <div 
                        className="p-3 rounded-xl group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${todo.color}15` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: todo.color }} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-slate-800 mb-1 ${todo.status === 'completed' ? 'line-through' : ''}`}>
                          {todo.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {todo.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span 
                            className="px-3 py-1 rounded-full font-semibold"
                            style={{ 
                              backgroundColor: `${todo.color}20`,
                              color: todo.color 
                            }}
                          >
                            {todo.role}
                          </span>
                          <span 
                            className="px-3 py-1 rounded-full font-semibold"
                            style={{ 
                              backgroundColor: `${getPriorityColor(todo.priority)}20`,
                              color: getPriorityColor(todo.priority)
                            }}
                          >
                            {todo.priority}
                          </span>
                          {isTaskOverdue && (
                            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold flex items-center gap-1">
                              <AlertTriangle size={12} />
                              Overdue
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-medium flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(todo.dueDate)} • {todo.dueTime}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-100 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Add Todo Modal */}
        {showAddTodo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Create New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    placeholder="Enter task title..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    placeholder="Enter description..."
                    rows={3}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      value={newTodo.role}
                      onChange={(e) => setNewTodo({...newTodo, role: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                      <option value="Development">Development</option>
                      <option value="Learning">Learning</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Due Time</label>
                    <input
                      type="time"
                      value={newTodo.dueTime}
                      onChange={(e) => setNewTodo({...newTodo, dueTime: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addTodo}
                    className="flex-1 py-3 px-6 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => setShowAddTodo(false)}
                    className="flex-1 py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDashboard;
