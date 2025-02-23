import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const TaskUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task data when component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://task-managment-app-server-omega.vercel.app/tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Controlled input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Update state once task data is loaded
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
    }
  }, [task]);

  // Handle update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const updatedTask = { title, description, category };

    try {
      const response = await axios.put(`https://task-managment-app-server-omega.vercel.app/tasks/${id}`, updatedTask);
      if (response.data) {
        toast.success("Task updated successfully!");
        navigate("/dashboard"); // Redirect back to task board after update
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task.");
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-5 w-full md:max-w-md max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 px-4 sm:px-0">Update Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-0">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          placeholder="Task Title"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none focus:outline-none"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          placeholder="Task Description (Optional)"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none focus:outline-none"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition outline-none focus:outline-none"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskUpdate;
