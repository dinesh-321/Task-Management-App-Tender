import type { Task } from "../types";
import { useTasks } from "../context/TaskContext";
import React, { useState } from "react";

const TaskItem = React.memo(({ task }: { task: Task }) => {
  const { deleteTask, toggleTask, editTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSave = () => {
    if (!title.trim()) return;

    editTask({
      ...task,
      title,
      description,
      dueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border p-2 flex flex-col space-y-2 rounded">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border px-2 py-1"
        />
        <div className="space-x-2">
          <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-300 px-2 py-1 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-2 flex justify-between items-center rounded">
      <div>
        <h3 className={task.completed ? "line-through text-gray-400" : ""}>{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">{task.dueDate}</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => toggleTask(task.id)} className="text-green-600">
          ✅
        </button>
        <button onClick={() => setIsEditing(true)} className="text-blue-600">
          ✏️
        </button>
        <button onClick={() => deleteTask(task.id)} className="text-red-600">
          🗑️
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
