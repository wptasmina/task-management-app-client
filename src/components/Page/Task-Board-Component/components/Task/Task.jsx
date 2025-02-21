import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 200 },
  category: { type: String, enum: ["To-Do", "In Progress", "Done"], required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
