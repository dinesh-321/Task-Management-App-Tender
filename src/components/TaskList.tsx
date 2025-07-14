import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { useMemo, useState } from "react";

const TaskList = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed": return tasks.filter(t => t.completed);
      case "pending": return tasks.filter(t => !t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  return (
    <div>
      <div className="space-x-2 mb-2">
        <button onClick={() => setFilter("all")} className="px-2 py-1 border rounded">All</button>
        <button onClick={() => setFilter("completed")} className="px-2 py-1 border rounded">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-2 py-1 border rounded">Pending</button>
      </div>
      <div className="space-y-2">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
