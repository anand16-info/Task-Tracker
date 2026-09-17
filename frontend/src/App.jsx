import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Task Tracker
      </h1>

      <TaskForm
        key={taskToEdit ? taskToEdit._id : 'new'}
        taskToEdit={taskToEdit}
        onTaskCreated={(newTask) => {
          setTasks((currentTasks) => [
            ...currentTasks,
            newTask,
          ]);
        }}
        onTaskUpdated={(updatedTask) => {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task._id === updatedTask._id
                ? updatedTask
                : task
            )
          );

          setTaskToEdit(null);
        }}
      />

      <TaskList
        tasks={tasks}
        onTaskEdit={(task) => {
          setTaskToEdit(task);
        }}

        onTaskDeleted={(deletedTaskId) => {
          setTasks((currentTasks) =>
            currentTasks.filter(
              (task) => task._id !== deletedTaskId
            )
          );
        }}
        onTaskToggled={(updatedTask) => {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task._id === updatedTask._id
                ? updatedTask
                : task
            )
          );
        }}
      />
      
    </div>
  );
}

export default App;