import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  createTask,
  updateTask,
} from '../services/taskService';

const TaskForm = ({
  onTaskCreated,
  onTaskUpdated,
  taskToEdit,
}) => {
  const [title, setTitle] = useState(
    taskToEdit ? taskToEdit.title : ''
  );

  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ''
  );

  /**
   * Handles changes in the task title input.
   */
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  /**
   * Handles changes in the task description input.
   */
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  /**
   * Creates or updates a task.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      title: title.trim(),
      description: description.trim(),
    };

    if (!taskData.title) {
      return;
    }

    if (taskToEdit) {
      const updatedTask = await updateTask(
        taskToEdit._id,
        taskData
      );

      onTaskUpdated(updatedTask);
    } else {
      const newTask = await createTask(taskData);

      onTaskCreated(newTask);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Task Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="What do you want to do?"
          maxLength={100}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/10"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-300"
          >
            Description
          </label>

          <span className="text-xs text-gray-600">
            {description.length}/500
          </span>
        </div>

        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Add more details (optional)..."
          maxLength={500}
          rows={7}
          className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/10"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3.5 font-semibold text-black transition hover:bg-amber-200 active:scale-[0.99]"
      >
        <Plus size={20} />

        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;