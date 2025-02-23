import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../TaskModal/TaskModal";
import { toast } from "react-toastify";
import useAxiosPublic from "../hokes/useAxiosPublic";
import { FaPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const categories = ["To-Do", "In Progress", "Done"];

export default function TaskBoard({darkMode }) {
  const axiosPublic = useAxiosPublic();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate()

  // ✅ Fetch tasks once when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [tasks]);

  // ✅ Add a new task
  const onSubmit = async (data) => {
    if (!data.title || data.title.length > 50) {
      toast.error("Title is required and must be less than 50 characters.");
      return;
    }
  
    if (data.description && data.description.length > 200) {
      toast.error("Description must be less than 200 characters.");
      return;
    }
  
    const newTask = {
      title: data.title,
      description: data.description,
      timestamp: new Date().toLocaleString(),
      category: data.category,
    };
  
    try {
      const res = await axiosPublic.post("/tasks", newTask);
      if (res.data) {
        setTasks([...tasks, res.data]);
        toast.success("Task added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task.");
    }
    setModalOpen(false);
  };
  

  // ✅ Update an existing task
  const updateTask = async (updatedTask) => {
    if (!updatedTask.title || updatedTask.title.length > 50) {
      toast.error("Title must be less than 50 characters.");
      return;
    }
  
    if (updatedTask.description && updatedTask.description.length > 200) {
      toast.error("Description must be less than 200 characters.");
      return;
    }
  
    try {
      const res = await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
      if (res.data) {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? res.data : task)));
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task.");
    }
    setModalOpen(false);
  };
  

  // ✅ Delete a task
  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task.");
    }
  };

  // ✅ Handle drag-and-drop updates
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If moved within the same category
    if (source.droppableId === destination.droppableId) {
      const categoryTasks = [...tasks.filter(task => task.category === source.droppableId)];
      const [movedTask] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, movedTask);

      setTasks([
        ...tasks.filter(task => task.category !== source.droppableId),
        ...categoryTasks
      ]);
    } else {
      // If moved to a different category, update in database
      const movedTask = tasks.find(task => task._id === draggableId);
      const updatedTask = { ...movedTask, category: destination.droppableId };

      await updateTask(updatedTask);
    }
  };

  // ✅ Open modal for add/edit
  const openModal = (task = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className={"py-6 w-11/12 mx-auto"} >

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
      >
        + Add Task
      </button>

      {/* Show loading or error message */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${darkMode ? "bg-gray-900 text-white" : " bg-transparent text-black"}`}>
            {categories.map((category) => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg min-h-[300px]"
                  >
                    <h2 className="text-xl font-bold text-center mb-4">{category}</h2>
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, idx) =>
                        task._id ? (
                          <Draggable key={task._id} draggableId={task._id.toString()} index={idx}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white dark:bg-gray-700 p-3 mb-3 rounded-lg shadow-md cursor-pointer"
                                onClick={() => openModal(task)}
                              >
                                <h4 className="font-bold">{task.title}</h4>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                
                                <div className="flex justify-between items-center py-4 gap-2">
                                <span className="text-xs text-gray-400">{task.timestamp}</span>
                                  <div className="flex gap-2 items-center">
                                  <button onClick={() => navigate(`/update-task/${task._id}`)}>
                                  <FaPenToSquare className="text-xl text-blue-600 cursor-pointer" />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent event from triggering modal
                                      handleDelete(task._id);
                                    }}
                                  >
                                    <RiDeleteBin6Fill className="text-xl text-red-500 cursor-pointer" />
                                  </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ) : null
                      )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onSave={editingTask ? updateTask : onSubmit} // ✅ Use updateTask for editing
          onClose={() => setModalOpen(false)}
        />
      )}

    </div>
  );
}