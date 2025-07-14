import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Task } from "../types";
import { loadTasks, saveTasks } from "../utils/localStorage";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
  }, []);

  const editTask = useCallback((task: Task) => {
    setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
