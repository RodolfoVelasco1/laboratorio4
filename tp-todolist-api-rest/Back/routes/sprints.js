const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/sprintController');


router.get('/', sprintController.getAllSprints); 
router.get('/:id', sprintController.getSprintById); 
router.post('/', sprintController.createSprint); 
router.put('/:id', sprintController.updateSprint); 
router.delete('/:id', sprintController.deleteSprint); 
router.post('/:sprintId/add-task/:taskId', sprintController.addTaskToSprint);
router.put('/:id/add-task/:taskId', sprintController.addTaskToSprint); 
router.post('/:sprintId/remove-task/:taskId', sprintController.removeTaskFromSprint);


module.exports = router;
