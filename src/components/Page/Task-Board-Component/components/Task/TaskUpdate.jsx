

import { useState } from "react";

const TaskUpdate = ({ task, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    
    onUpdate({ ...task, title, description, category });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Update Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          placeholder="Task Title"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Task Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          placeholder="Task Description (Optional)"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskUpdate;
