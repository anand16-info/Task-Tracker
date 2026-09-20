import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Pencil,
  Trash2,
} from 'lucide-react';

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

  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      )
    : 'Recently';

  return (
    <article className="group rounded-xl border border-white/10 bg-black/20 p-4 transition duration-200 hover:border-white/20 hover:bg-white/[0.035]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Task information */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <button
            type="button"
            onClick={handleToggle}
            aria-label={
              task.completed
                ? 'Mark task as pending'
                : 'Mark task as completed'
            }
            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
              task.completed
                ? 'border-emerald-400 bg-emerald-400 text-black'
                : 'border-gray-600 bg-transparent hover:border-amber-300'
            }`}
          >
            {task.completed && <Check size={15} />}
          </button>

          <div className="min-w-0">
            <h3
              className={`truncate text-sm font-semibold sm:text-base ${
                task.completed
                  ? 'text-gray-500 line-through'
                  : 'text-white'
              }`}
            >
              {task.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {task.description || 'No description added.'}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
              task.completed
                ? 'bg-emerald-400/10 text-emerald-300'
                : 'bg-amber-400/10 text-amber-300'
            }`}
          >
            {task.completed ? (
              <CheckCircle2 size={14} />
            ) : (
              <Clock3 size={14} />
            )}

            {task.completed
              ? 'Completed'
              : 'Pending'}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={15} />
          <span>{formattedDate}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTaskEdit(task)}
            aria-label="Edit task"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition hover:bg-blue-400/10 hover:text-blue-300"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={handleToggle}
            className={`rounded-xl px-4 py-2.5 text-xs font-medium transition ${
              task.completed
                ? 'bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                : 'bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20'
            }`}
          >
            {task.completed
              ? 'Mark Pending'
              : 'Mark Complete'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete task"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskItem;