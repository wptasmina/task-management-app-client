import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const TaskUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controlled input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Fetch task data when component mounts
  useEffect(() => {
    if (!id) {
      setError("Invalid task ID.");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        console.log("Fetching task with ID:", id);
        const response = await axios.get(`https://task-managment-app-server-hazel.vercel.app/tasks/${id}`);
        console.log(response.data);
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

  // Update state once task data is loaded
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "To-Do");
    }
  }, [task]);

  // Handle update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title is required!");
      return;
    }

    const updatedTask = { title, description, category };
    console.log("Updating task:", updatedTask);

    try {
      const response = await axios.put(
        `https://task-managment-app-server-hazel.vercel.app/tasks/${id}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        toast.success("Task updated successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to update task:", error.response?.data || error);
      toast.error("Failed to update task.");
    }
  };

  if (loading) return <p className="text-center pt-14">Loading task...</p>;
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
          className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer text-white py-2 rounded-lg transition outline-none focus:outline-none"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskUpdate;
