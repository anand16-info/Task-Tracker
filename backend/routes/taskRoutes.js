const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask,
} = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

module.exports = router;