const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Endpoints
router.get('/', taskController.getAllTasks); // GET /tasks
router.get('/:id', taskController.getTaskById); // GET /tasks/:id
router.post('/', taskController.createTask); // POST /tasks
router.put('/:id', taskController.updateTask); // PUT /tasks/:id
router.delete('/:id', taskController.deleteTask); // DELETE /tasks/:id

module.exports = router;
