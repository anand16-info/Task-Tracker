const Task = require('../models/Task');

/**
 * Creates a new task.
 */
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * Retrieves all tasks.
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Updates an existing task.
 */
const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * Toggles the completion status of a task.
 */
const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    task.completed = !task.completed;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * Deletes a task.
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
    getTasks,
    updateTask,
    toggleTask,
    deleteTask,
};