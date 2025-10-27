import React, { useState } from 'react';
import { X, Calendar, Clock, Briefcase, Heart, Code, Star } from 'lucide-react';

const icons = [
  { label: 'Work', value: Briefcase },
  { label: 'Personal', value: Heart },
  { label: 'Development', value: Code },
  { label: 'Important', value: Star },
];

const AddTodoModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    role: '',
    priority: 'medium',
    icon: icons[0].value,
    color: '#60A5FA', // default blue
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate || !formData.dueTime) return alert('Fill required fields!');
    const newTodo = {
      ...formData,
      id: Date.now(),
      status: 'pending',
    };
    onAdd(newTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Add New Task</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-red-400" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title *"
            className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <textarea
            placeholder="Description"
            rows={2}
            className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="w-full pl-8 p-2 rounded-md bg-transparent border border-gray-600 text-white"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="time"
                className="w-full pl-8 p-2 rounded-md bg-transparent border border-gray-600 text-white"
                value={formData.dueTime}
                onChange={(e) => handleChange('dueTime', e.target.value)}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Category / Role"
            className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
          />

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Priority:</label>
            <select
              className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Icon:</label>
            <div className="flex gap-3">
              {icons.map((icon) => (
                <button
                  type="button"
                  key={icon.label}
                  className={`p-2 rounded-lg border ${
                    formData.icon === icon.value ? 'border-blue-400' : 'border-gray-600'
                  }`}
                  onClick={() => handleChange('icon', icon.value)}
                >
                  <icon.value className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Color:</label>
            <input
              type="color"
              className="w-full h-10 rounded-md border border-gray-600"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
