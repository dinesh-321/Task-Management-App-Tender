import { Suspense, lazy } from "react";
import { TaskProvider } from "./context/TaskContext";
import Quote from "./components/Quote";
import TaskForm from "./components/TaskForm";
import DarkModeToggle from "./components/DarkModeToggle";

const TaskList = lazy(() => import("./components/TaskList"));

function App() {
  return (
    <TaskProvider>
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <DarkModeToggle />
        </div>
        <Quote />
        <TaskForm />
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TaskList />
        </Suspense>
      </div>
    </TaskProvider>
  );
}

export default App;
