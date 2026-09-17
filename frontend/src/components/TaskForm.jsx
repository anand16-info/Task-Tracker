import { useState } from 'react';
import { createTask, updateTask } from '../services/taskService';

const TaskForm = ({ onTaskCreated, onTaskUpdated, taskToEdit }) => {
  const [title, setTitle] = useState(
    taskToEdit ? taskToEdit.title : ''
  );

  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ''
  );

  /**
   * Handles changes in the task title input.
   * @param {Object} event - Input change event
   */
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  /**
   * Handles changes in the task description input.
   * @param {Object} event - Input change event
   */
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

/**
 * Creates a task through the backend API.
 * @param {Object} event - Form submission event
 */
const handleSubmit = async (event) => {
  event.preventDefault();

  const taskData = {
    title,
    description,
  };

  if (taskToEdit) {
    // Edit mode: update the existing task.
    const updatedTask = await updateTask(
      taskToEdit._id,
      taskData
    );

    onTaskUpdated(updatedTask);
  } else {
    // Add mode: create a new task.
    const newTask = await createTask(taskData);

    onTaskCreated(newTask);
  }

  setTitle('');
  setDescription('');
};
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
        />
      </div>

      <button type="submit">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;