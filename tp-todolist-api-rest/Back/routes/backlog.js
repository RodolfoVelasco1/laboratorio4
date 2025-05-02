const express = require('express');
const router = express.Router();
const backlogController = require('../controllers/backlogController');

router.get('/', backlogController.getBacklog);             
router.post('/', backlogController.createTask);            
router.put('/:id', backlogController.updateTask);          
router.delete('/:id', backlogController.deleteTask);       

module.exports = router;