import React from 'react';
import { Plus, CheckCircle, Sparkles } from 'lucide-react';

const ToDoHeader = ({ setShowAddTodo }) => {
  return (
    <div className="backdrop-blur-2xl border rounded-3xl p-6 mb-8 shadow-2xl"
      style={{ background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)' }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: '#FAFAFA' }}>
              Todo Dashboard
              <Sparkles className="w-6 h-6 animate-pulse" style={{ color: '#8B5CF6' }} />
            </h1>
            <p className="text-sm" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
              Organize and track your tasks efficiently
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddTodo(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 text-white font-medium"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}
          >
            <Plus className="w-5 h-5" />
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoHeader;
