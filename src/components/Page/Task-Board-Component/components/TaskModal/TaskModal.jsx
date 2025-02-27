import { useState, useEffect } from "react";

export default function TaskModal({ task, onSave, onClose, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ id: task?.id || null, title, description, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#111] bg-opacity-50 flex items-center justify-center px-4">
      <div className={`p-6 rounded-lg w-96 shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit} className="bg-white">
          <input
            type="text"
            className="w-full p-2 border   rounded mb-3  bg-gray-100 dark:bg-gray-700 dark:text-black"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={50}
          />
          <textarea
            className="w-full p-2 border text-black rounded mb-3 bg-gray-100 dark:bg-gray-700 dark:text-black"
            placeholder="Task Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
          <select
            className="w-full p-2 border text-black rounded mb-3 bg-gray-100 dark:bg-gray-700 dark:text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
