import { useState, useCallback } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = useCallback(() => {
  if (!title.trim()) {
    alert("Title is required");
    return;
  }
  if (!description.trim()) {
    alert("Description is required");
    return;
  }
  if (!dueDate.trim()) {
    alert("Due date is required");
    return;
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    completed: false
  };

  addTask(newTask);
  setTitle("");
  setDescription("");
  setDueDate("");
}, [title, description, dueDate, addTask]);

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border px-2 py-1 w-full" required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border px-2 py-1 w-full" required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border px-2 py-1" required
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-1 mx-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
