import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

/**
 * Fetches all tasks from the backend.
 * @returns {Promise<Object[]>} List of tasks
 */
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Creates a new task through the backend.
 * @param {Object} taskData - The task title and description
 * @returns {Promise<Object>} The newly created task
 */
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

/**
 * Deletes a task through the backend API.
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<Object>} The server response
 */
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};

/**
 * Toggles the completion status of a task.
 * @param {string} taskId - The ID of the task to toggle
 * @returns {Promise<Object>} The updated task
 */
export const toggleTask = async (taskId) => {
  const response = await axios.patch(
    `${API_URL}/${taskId}/toggle`
  );

  return response.data;
};

/**
 * Updates an existing task through the backend API.
 * @param {string} taskId - The ID of the task to update
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} The updated task
 */
export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    taskData
  );

  return response.data;
};