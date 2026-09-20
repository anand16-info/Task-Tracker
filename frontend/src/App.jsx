import { useEffect, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  CheckSquare,
  Clock3,
  Filter,
  ListTodo,
  Menu,
  Search,
  Target,
} from 'lucide-react';

import mountainBg from './assets/mountain-bg.jpg';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const today = new Date();

  const formattedToday = today.toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  /**
   * Fetches all tasks when the application loads.
   */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  /**
   * Filters tasks according to the selected status and search term.
   */
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchValue) ||
      (task.description || '')
        .toLowerCase()
        .includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  /**
   * Adds a newly created task to the current task list.
   */
  const handleTaskCreated = (newTask) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  };

  /**
   * Replaces the updated task inside the current task list.
   */
  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );

    setTaskToEdit(null);
  };

  /**
   * Removes a deleted task from the current task list.
   */
  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task._id !== deletedTaskId
      )
    );
  };

  /**
   * Updates a task after toggling its completion status.
   */
  const handleTaskToggled = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );
  };

  /**
   * Selects a task for editing.
   */
  const handleTaskEdit = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="min-h-screen bg-[#070a0d] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#090d10] px-6 py-8 lg:flex lg:flex-col">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/60 bg-amber-400/10 text-amber-300">
                <CheckSquare size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Task<span className="text-amber-300">Tracker</span>
                </h2>

                <p className="text-xs text-gray-500">
                  Plan. Today. Build Tomorrow.
                </p>
              </div>
            </div>

            <nav className="mt-12 space-y-2">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  filter === 'all'
                    ? 'border border-amber-300/30 bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ListTodo size={19} />
                Tasks
              </button>

              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  filter === 'completed'
                    ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <CheckCircle2 size={19} />
                Completed
              </button>

              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  filter === 'pending'
                    ? 'border border-amber-400/30 bg-amber-400/10 text-amber-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Clock3 size={19} />
                Pending
              </button>

            </nav>
          </div>

          <div className="mt-auto">
            <div className="border-l border-amber-300/50 pl-4">
              <p className="text-sm italic leading-6 text-gray-400">
                “Discipline turns plans into progress.”
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-medium text-amber-300">
                A
              </div>

              <div>
                <p className="text-sm font-medium">
                  Anand Pandey
                </p>

                <p className="text-xs text-gray-500">
                  Keep Going
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="relative flex-1 overflow-hidden">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={mountainBg}
              alt=""
              className="absolute inset-x-0 top-0 h-[460px] w-full object-cover object-[center_40%] opacity-50"
            />

            <div className="absolute inset-x-0 top-0 h-[460px] bg-gradient-to-b from-black/20 via-[#070a0d]/55 to-[#070a0d]" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#070a0d] via-transparent to-[#070a0d]/70" />
          </div>

          <div className="relative mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {/* Mobile top bar */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <CheckSquare size={21} />
                </div>

                <h2 className="text-lg font-semibold">
                  Task<span className="text-amber-300">Tracker</span>
                </h2>
              </div>

              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300"
              >
                <Menu size={21} />
              </button>
            </div>

            {/* Hero */}
            <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-gray-500">
                  Welcome Back, Anand
                </p>

                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Small Tasks
                  <span className="block text-amber-300">
                    Big Progress
                  </span>
                </h1>

                <p className="mt-4 text-base text-gray-400">
                  Stay consistent and make it happen.
                </p>
              </div>

              <div className="space-y-5">
                {/* Quote Card */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                  <p className="text-3xl text-amber-300">“</p>

                  <p className="mt-1 text-lg leading-7 text-gray-200">
                    A better you is a series of better tasks.
                  </p>

                  <div className="mt-5 h-px w-8 bg-amber-300" />
                </div>

                {/* Today's Date */}
                <div className="flex items-center justify-end gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-300">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {formattedToday}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Make today count.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-10 grid gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`rounded-2xl border p-5 text-left transition ${
                  filter === 'all'
                    ? 'border-amber-300 bg-white/[0.06]'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <ListTodo size={22} />
                  </div>

                  <span className="text-3xl font-semibold">
                    {tasks.length}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-400">
                  All Tasks
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`rounded-2xl border p-5 text-left transition ${
                  filter === 'completed'
                    ? 'border-emerald-400/40 bg-emerald-400/5'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 size={22} />
                  </div>

                  <span className="text-3xl font-semibold">
                    {completedCount}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Completed
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`rounded-2xl border p-5 text-left transition ${
                  filter === 'pending'
                    ? 'border-amber-400/40 bg-amber-400/5'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <Clock3 size={22} />
                  </div>

                  <span className="text-3xl font-semibold">
                    {pendingCount}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Pending
                </p>
              </button>
            </section>

            {/* Workspace */}
            <section className="mt-6 grid gap-6 xl:grid-cols-[360px_1fr]">
              {/* Add Task */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-black shadow-[0_0_30px_rgba(252,211,77,0.25)]">
                    <span className="text-3xl font-light">
                      +
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {taskToEdit
                        ? 'Edit Task'
                        : 'Add New Task'}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {taskToEdit
                        ? 'Update your task details.'
                        : 'Turn your thoughts into action.'}
                    </p>
                  </div>
                </div>

                <TaskForm
                  key={
                    taskToEdit
                      ? taskToEdit._id
                      : 'new'
                  }
                  taskToEdit={taskToEdit}
                  onTaskCreated={handleTaskCreated}
                  onTaskUpdated={handleTaskUpdated}
                />
              </div>

              {/* Tasks */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                        <ListTodo size={22} />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          Your Tasks
                        </h2>

                        <p className="text-sm text-gray-500">
                          Here's what you're working on.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 sm:w-52 sm:flex-none">
                      <Search
                        size={17}
                        className="shrink-0 text-gray-500"
                      />

                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) =>
                          setSearchTerm(
                            event.target.value
                          )
                        }
                        placeholder="Search tasks..."
                        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                      />
                    </div>

                    <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-400 sm:flex">
                      <Filter size={16} />
                      {filter === 'all'
                        ? 'All'
                        : filter === 'completed'
                          ? 'Completed'
                          : 'Pending'}
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="rounded-xl border border-white/10 bg-black/20 p-10 text-center text-sm text-gray-500">
                    Loading tasks...
                  </div>
                ) : error ? (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-10 text-center text-sm text-red-300">
                    {error}
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 bg-black/10 p-10 text-center">
                    <Target
                      size={30}
                      className="mx-auto text-gray-600"
                    />

                    <p className="mt-3 text-sm text-gray-400">
                      {searchTerm
                        ? 'No matching tasks found.'
                        : filter === 'completed'
                          ? 'No completed tasks.'
                          : filter === 'pending'
                            ? 'No pending tasks.'
                            : 'No tasks found.'}
                    </p>
                  </div>
                ) : (
                  <TaskList
                    tasks={filteredTasks}
                    onTaskEdit={handleTaskEdit}
                    onTaskDeleted={handleTaskDeleted}
                    onTaskToggled={handleTaskToggled}
                  />
                )}
              </div>
            </section>

            {/* Footer quote */}
            <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Target
                  size={22}
                  className="text-amber-300"
                />

                <p className="text-sm text-gray-400">
                  Consistent action creates extraordinary
                  results.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gray-600">
                <span className="h-px w-8 bg-amber-300" />
                One Task At A Time
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;