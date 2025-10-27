import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="space-y-4 px-2 pb-4">
      {todos.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-10">
          No todos found. 💤
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
