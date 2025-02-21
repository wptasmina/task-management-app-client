import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../TaskModal/TaskModal";
import { toast } from "react-toastify";
import useAxiosPublic from "../hokes/useAxiosPublic";

const categories = ["To-Do", "In Progress", "Done"];

export default function TaskBoard() {
  const axiosPublic = useAxiosPublic();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Fetch tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get("/tasks");
        setTasks(response.data); // Store fetched tasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Submit form data (POST request)
  const onSubmit = async (data) => {
    const newTask = {
      title: data.title,
      description: data.description,
      timestamp: new Date().toLocaleString(),
      category: data.category,
    };

    try {
      const res = await axiosPublic.post("/tasks", newTask);
      if (res.data) {
        setTasks([...tasks, res.data]); // Update UI with new task
        toast.success("Task added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task.");
    }
    setModalOpen(false);
  };

  // ✅ Handle drag & drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, category: result.destination.droppableId }
        : task
    );

    setTasks(updatedTasks);

    // ✅ Update task category in the server
    try {
      await axiosPublic.put(`/tasks/${result.draggableId}`, {
        category: result.destination.droppableId,
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // ✅ Open modal for add/edit
  const openModal = (task = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className="py-6 w-11/12 mx-auto">
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
      >
        + Add Task
      </button>

      {/*  Show loading or error message */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg min-h-[300px]"
                  >
                    <h2 className="text-xl font-bold text-center mb-4">
                      {category}
                    </h2>
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, idx) => (
                        <Draggable key={task.id} draggableId={task.id} index={idx}>
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
                              <span className="text-xs text-gray-400">{task.timestamp}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {modalOpen && (
        <TaskModal task={editingTask} onSave={onSubmit} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
