import {
  deleteTask,
  toggleTask,
} from '../services/taskService';

const TaskItem = ({
  task,
  onTaskDeleted,
  onTaskToggled,
  onTaskEdit,
}) => {
  /**
   * Deletes the current task.
   */
  const handleDelete = async () => {
    await deleteTask(task._id);

    onTaskDeleted(task._id);
  };

  /**
   * Toggles the completion status of the current task.
   */
  const handleToggle = async () => {
    const updatedTask = await toggleTask(task._id);

    onTaskToggled(updatedTask);
  };

  return (
    <div>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span>
        {task.completed ? 'Completed' : 'Pending'}
      </span>

      <button type="button" onClick={handleToggle}>
        {task.completed ? 'Mark Pending' : 'Mark Complete'}
      </button>
      
      <button type="button" onClick={() => onTaskEdit(task)}>
        Edit
      </button>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;