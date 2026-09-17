import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskDeleted, onTaskToggled, onTaskEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskDeleted={onTaskDeleted}
          onTaskToggled={onTaskToggled}
          onTaskEdit={onTaskEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;