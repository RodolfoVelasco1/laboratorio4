const express = require('express')
const router = express.Router()
const Sprint = require('../models/sprint.model')
const { getSprintById } = require('../controllers/sprint.controller.js')
const Task = require('../models/task.model.js');

const sprintRouter = express.Router();

//Obtener todas las sprints [GET ALL]
sprintRouter.get('/', async (req, res) => {
    try {
        const sprints = await Sprint.find();
        console.log('GET ALL', sprints);
        if(sprints.length === 0){
            return res.status(204).json([])
        }
        res.json(sprints)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Obtener una sprint por id [GET BY ID]
sprintRouter.get("/getSprintById", getSprintById, async (req, res) => {
    res.json(res.sprint);
  });
  

//Crear una nueva sprint [POST]
sprintRouter.post('/', async (req, res) => {
    const {fecha_inicio, fecha_cierre, lista_tareas, color } = req?.body
    if(!fecha_inicio || !fecha_cierre ){
        return res.status(400).json({
            message: 'Los campos fecha_inicio y fecha_cierre son obligatorios'
        })
    }

    const sprint = new Sprint(
        {
            fecha_inicio, 
            fecha_cierre, 
            lista_tareas, 
            color
        }
    )
    try {
      const newSprint = await sprint.save()
      console.log(newSprint)
      
      res.status(201).json(newSprint)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  });

  //Editar una sprint [PUT]
  sprintRouter.put("/", getSprintById, async (req, res) => {
    try {
      let sprint = res.sprint;
  
      sprint.fecha_inicio = req.body.fecha_inicio || sprint.fecha_inicio;
      sprint.fecha_cierre = req.body.fecha_cierre || sprint.fecha_cierre;
      sprint.lista_tareas = req.body.lista_tareas || sprint.lista_tareas;
      sprint.color = req.body.color || sprint.color;
  
      const updatedSprint = await sprint.save();
      res.json(updatedSprint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Eliminar una sprint [DELETE]
  sprintRouter.delete("/", getSprintById, async (req, res) => {
    try {
      let sprint = res.sprint;
      const deletedSprint = await sprint.deleteOne();
      res.json(deletedSprint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//Agregar una tarea al sprint [POST]
sprintRouter.post('/addTaskToSprint', getSprintById, async (req, res) => {
  const { taskId } = req.query;
  try {
    let sprint = res.sprint;
    if (!sprint) {
      return res.status(500).json({ message: "No se encontró ningún Sprint." });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "No se encontró la tarea." });
    }

    sprint.lista_tareas.push(task);

    await sprint.save();
    return res
      .status(200)
      .json({ message: "Tarea agregada al backlog", task: task });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


  module.exports = sprintRouter;
  
