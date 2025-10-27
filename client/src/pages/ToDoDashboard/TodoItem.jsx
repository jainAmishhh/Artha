import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const Icon = todo.icon;

  const isOverdue = () => {
    if (todo.status === 'completed') return false;
    const now = new Date();
    const due = new Date(`${todo.dueDate} ${todo.dueTime}`);
    return due < now;
  };

  return (
    <div
      className={`flex items-start justify-between gap-4 p-4 rounded-2xl group transition-all duration-300
        ${todo.status === 'completed' ? 'opacity-75' : ''} 
        ${isOverdue() ? 'ring-2 ring-red-400' : ''}
      `}
      style={{ background: 'rgba(250, 250, 250, 0.05)' }}
    >
      <div className="flex gap-4">
        {/* Status toggle */}
        <button onClick={() => onToggleComplete(todo.id)} className="p-1">
          {todo.status === 'completed' ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {/* Icon */}
        <div className="p-3 rounded-2xl" style={{ background: `${todo.color}20` }}>
          <Icon className="w-6 h-6" style={{ color: todo.color }} />
        </div>

        {/* Content */}
        <div>
          <h3
            className={`font-semibold text-base mb-1 ${
              todo.status === 'completed' ? 'line-through text-gray-400' : 'text-white'
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2">{todo.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            <span
              className="px-2 py-1 rounded-full"
              style={{
                background: `${todo.color}20`,
                color: todo.color,
              }}
            >
              {todo.role}
            </span>
            <span
              className="px-2 py-1 rounded-full"
              style={{
                background: `${getPriorityColor(todo.priority)}20`,
                color: getPriorityColor(todo.priority),
              }}
            >
              {todo.priority} priority
            </span>
            {isOverdue() && (
              <span className="px-2 py-1 rounded-full bg-red-900 text-red-400">Overdue</span>
            )}
            <span>
              Due: {todo.dueDate} at {todo.dueTime}
            </span>
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 rounded-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// Utility to get color based on priority
const getPriorityColor = (priority) => {
  const colors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };
  return colors[priority] || '#A1A1AA';
};

export default TodoItem;
