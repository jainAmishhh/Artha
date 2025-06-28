import React, { useState, useEffect } from 'react';
import { Search, Plus, TrendingUp, BookOpen, AlertTriangle, Home, RefreshCw, BarChart3, DollarSign, Sparkles, Filter, ArrowUpRight, ArrowDownLeft, Calendar, ChevronDown, Eye, Download, CheckCircle, Circle, Clock, Star, User, Briefcase, Heart, Code, Settings, Trash2, Edit3 } from 'lucide-react';

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
    {
      id: 6,
      title: 'Client Presentation Review',
      description: 'Review and finalize presentation slides for client meeting',
      priority: 'high',
      role: 'Work',
      status: 'pending',
      dueDate: '2025-06-19',
      dueTime: '14:00',
      createdAt: '2025-06-18T11:30:00',
      icon: Briefcase,
      color: '#8B5CF6'
    },
    {
      id: 7,
      title: 'Update Portfolio Website',
      description: 'Add new projects and update skills section',
      priority: 'medium',
      role: 'Development',
      status: 'pending',
      dueDate: '2025-06-25',
      dueTime: '16:00',
      createdAt: '2025-06-18T13:45:00',
      icon: Code,
      color: '#3B82F6'
    },
    {
      id: 8,
      title: 'Plan Weekend Trip',
      description: 'Research and book accommodation for weekend getaway',
      priority: 'low',
      role: 'Personal',
      status: 'pending',
      dueDate: '2025-06-21',
      dueTime: '12:00',
      createdAt: '2025-06-18T09:20:00',
      icon: Home,
      color: '#10B981'
    }
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

    // Sort todos
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

  const addTodo = () => {
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
    
    setTodos([...todos, todo]);
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden mt-8 md:mt-12" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'}}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2" style={{color: '#FAFAFA'}}>
                  Todo Dashboard
                  <Sparkles className="w-6 h-6 animate-pulse" style={{color: '#8B5CF6'}} />
                </h1>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Organize and track your tasks efficiently</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddTodo(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 text-white font-medium"
                style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'}}
              >
                <Plus className="w-5 h-5" />
                Add Todo
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(59, 130, 246, 0.2)'}}>
                <CheckCircle className="w-6 h-6" style={{color: '#3B82F6'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Total Tasks</p>
                <p className="text-2xl font-bold" style={{color: '#3B82F6'}}>{totalTodos}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(16, 185, 129, 0.2)'}}>
                <CheckCircle className="w-6 h-6" style={{color: '#10B981'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Completed</p>
                <p className="text-2xl font-bold" style={{color: '#10B981'}}>{completedTodos}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(245, 158, 11, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(245, 158, 11, 0.2)'}}>
                <Clock className="w-6 h-6" style={{color: '#F59E0B'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Pending</p>
                <p className="text-2xl font-bold" style={{color: '#F59E0B'}}>{pendingTodos}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)'}}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{background: 'rgba(139, 92, 246, 0.2)'}}>
                <TrendingUp className="w-6 h-6" style={{color: '#8B5CF6'}} />
              </div>
              <div>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Completion Rate</p>
                <p className="text-2xl font-bold" style={{color: '#8B5CF6'}}>{completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                style={{
                  background: 'rgba(250, 250, 250, 0.1)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  color: '#FAFAFA'
                }}
              />
            </div>

            {/* Sort Options */}
            <div className="flex gap-3">
              <select
                value={`₹{sortBy}-₹{sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-3 rounded-2xl border transition-all duration-300"
                style={{
                  background: 'rgba(250, 250, 250, 0.1)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  color: '#FAFAFA'
                }}
              >
                <option value="dueDate-asc" style={{background: '#312E81', color: '#FAFAFA'}}>Due Date (Earliest)</option>
                <option value="dueDate-desc" style={{background: '#312E81', color: '#FAFAFA'}}>Due Date (Latest)</option>
                <option value="priority-desc" style={{background: '#312E81', color: '#FAFAFA'}}>Priority (High to Low)</option>
                <option value="priority-asc" style={{background: '#312E81', color: '#FAFAFA'}}>Priority (Low to High)</option>
                <option value="role-asc" style={{background: '#312E81', color: '#FAFAFA'}}>Role (A-Z)</option>
                <option value="status-asc" style={{background: '#312E81', color: '#FAFAFA'}}>Status</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: showFilters ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' : 'rgba(250, 250, 250, 0.1)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  color: showFilters ? '#FFFFFF' : '#FAFAFA'
                }}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ₹{showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t" style={{borderColor: 'rgba(139, 92, 246, 0.2)'}}>
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Status</label>
                <select
                  value={activeStatusFilter}
                  onChange={(e) => setActiveStatusFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status} style={{background: '#312E81', color: '#FAFAFA'}}>
                      {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Priority</label>
                <select
                  value={activePriorityFilter}
                  onChange={(e) => setActivePriorityFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority} style={{background: '#312E81', color: '#FAFAFA'}}>
                      {priority === 'All' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Role</label>
                <select
                  value={activeRoleFilter}
                  onChange={(e) => setActiveRoleFilter(e.target.value)}
                  className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    color: '#FAFAFA'
                  }}
                >
                  {roles.map(role => (
                    <option key={role} value={role} style={{background: '#312E81', color: '#FAFAFA'}}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>
              Tasks ({filteredTodos.length})
            </h2>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 rounded-2xl mx-auto w-fit mb-4" style={{background: 'rgba(139, 92, 246, 0.1)'}}>
                  <Search className="w-8 h-8" style={{color: '#8B5CF6'}} />
                </div>
                <p className="text-lg font-medium" style={{color: '#FAFAFA'}}>No tasks found</p>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredTodos.map((todo) => {
                const IconComponent = todo.icon;
                const isTaskOverdue = isOverdue(todo.dueDate, todo.dueTime, todo.status);
                return (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300 group ₹{
                      todo.status === 'completed' ? 'opacity-75' : ''
                    } ₹{isTaskOverdue ? 'ring-2 ring-red-400' : ''}`}
                    style={{background: 'rgba(250, 250, 250, 0.05)'}}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTodoStatus(todo.id)}
                        className="p-1 hover:scale-110 transition-transform duration-300"
                      >
                        {todo.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                        )}
                      </button>
                      
                      <div 
                        className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{background: `₹{todo.color}20`}}
                      >
                        <IconComponent className="w-6 h-6" style={{color: todo.color}} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold ₹{todo.status === 'completed' ? 'line-through' : ''}`} style={{color: '#FAFAFA'}}>
                          {todo.title}
                        </h3>
                        <p className="text-sm mb-2" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
                          {todo.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
                          <span className="px-2 py-1 rounded-full text-xs" style={{
                            background: `₹{todo.color}20`,
                            color: todo.color
                          }}>
                            {todo.role}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs" style={{
                            background: `₹{getPriorityColor(todo.priority)}20`,
                            color: getPriorityColor(todo.priority)
                          }}>
                            {todo.priority} priority
                          </span>
                          {isTaskOverdue && (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-400">
                              Overdue
                            </span>
                          )}
                          <span>Due: {formatDate(todo.dueDate)} at {todo.dueTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 rounded-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        style={{background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444'}}
                      >
                        <Trash2 className="w-4 h-4" />
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="backdrop-blur-2xl border rounded-3xl p-6 w-full max-w-md shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)'}}>
              <h3 className="text-xl font-bold mb-4" style={{color: '#FAFAFA'}}>Add New Todo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Title</label>
                  <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    placeholder="Enter todo title..."
                    className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                    style={{
                      background: 'rgba(250, 250, 250, 0.1)',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      color: '#FAFAFA'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Description</label>
                  <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    placeholder="Enter description..."
                    rows={3}
                    className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300 resize-none"
                    style={{
                      background: 'rgba(250, 250, 250, 0.1)',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      color: '#FAFAFA'
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Priority</label>
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                      className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        color: '#FAFAFA'
                      }}
                    >
                      <option value="low" style={{background: '#312E81', color: '#FAFAFA'}}>Low</option>
                      <option value="medium" style={{background: '#312E81', color: '#FAFAFA'}}>Medium</option>
                      <option value="high" style={{background: '#312E81', color: '#FAFAFA'}}>High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Role</label>
                    <select
                      value={newTodo.role}
                      onChange={(e) => setNewTodo({...newTodo, role: e.target.value})}
                      className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        color: '#FAFAFA'
                      }}
                    >
                      <option value="Personal" style={{background: '#312E81', color: '#FAFAFA'}}>Personal</option>
                      <option value="Work" style={{background: '#312E81', color: '#FAFAFA'}}>Work</option>
                      <option value="Development" style={{background: '#312E81', color: '#FAFAFA'}}>Development</option>
                      <option value="Learning" style={{background: '#312E81', color: '#FAFAFA'}}>Learning</option>
                      <option value="Health" style={{background: '#312E81', color: '#FAFAFA'}}>Health</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Due Date</label>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                      className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        color: '#FAFAFA'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Due Time</label>
                    <input
                      type="time"
                      value={newTodo.dueTime}
                      onChange={(e) => setNewTodo({...newTodo, dueTime: e.target.value})}
                      className="w-full p-3 rounded-2xl border focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        color: '#FAFAFA'
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addTodo}
                    className="flex-1 py-3 px-6 rounded-2xl font-medium text-white hover:scale-105 transition-all duration-300"
                    style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'}}
                  >
                    Add Todo
                  </button>
                  <button
                    onClick={() => setShowAddTodo(false)}
                    className="flex-1 py-3 px-6 rounded-2xl font-medium border hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'rgba(250, 250, 250, 0.1)',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      color: '#FAFAFA'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-2xl border-t p-4" style={{
          background: 'rgba(250, 250, 250, 0.08)',
          borderColor: 'rgba(139, 92, 246, 0.2)'
        }}>
          <div className="flex justify-around max-w-md mx-auto">
            {[
              { icon: Home, label: 'Home', active: false },
              { icon: CheckCircle, label: 'Tasks', active: true },
              { icon: BarChart3, label: 'Analytics', active: false },
              { icon: Settings, label: 'Settings', active: false }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ₹{
                    item.active ? 'scale-110' : ''
                  }`}
                  style={item.active 
                    ? {
                        background: 'rgba(139, 92, 246, 0.2)',
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

export default TodoDashboard;