import React from 'react';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';

const SummaryCards = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.status === 'completed').length;
  const pending = todos.filter(todo => todo.status === 'pending').length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    {
      label: 'Total Tasks',
      value: total,
      icon: <BarChart3 className="w-6 h-6" />,
      bg: 'bg-blue-100 text-blue-800',
    },
    {
      label: 'Completed',
      value: completed,
      icon: <CheckCircle className="w-6 h-6" />,
      bg: 'bg-green-100 text-green-800',
    },
    {
      label: 'Pending',
      value: pending,
      icon: <Clock className="w-6 h-6" />,
      bg: 'bg-yellow-100 text-yellow-800',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: <AlertTriangle className="w-6 h-6" />,
      bg: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-4 rounded-2xl shadow-md flex items-center gap-4 ${card.bg}`}
        >
          <div className="bg-white rounded-full p-2 shadow">{card.icon}</div>
          <div>
            <h4 className="text-lg font-bold">{card.value}</h4>
            <p className="text-sm">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
