const express = require('express')
const router = express.Router()
const Task = require('../models/task.model')
const Sprint = require('../models/sprint.model')
const { getTaskById } = require('../controllers/task.controller')

const taskRouter = express.Router();
//Obtener todas las tareas [GET ALL]
taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log('GET ALL', tasks);
        if(tasks.length === 0){
            return res.status(204).json([])
        }
        res.json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Obtener tarea por id [GET BY ID]
taskRouter.get("/getTaskById", getTaskById, async (req, res) => {
    res.json(res.task);
  });
  

//Crear una nueva tarea [POST]
taskRouter.post('/', async (req, res) => {
    const {titulo, descripcion, estado, fecha_limite, color } = req?.body
    if(!titulo || !estado || !fecha_limite){
        return res.status(400).json({
            message: 'Los campos titulo, estado y fecha_limite son obligatorios'
        })
    }

    const task = new Task(
        {
            titulo, 
            descripcion, 
            estado, 
            fecha_limite, 
            color
        }
    )
    try {
      const newTask = await task.save()
      console.log(newTask)
      
      res.status(201).json(newTask)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  });

  //Editar una tarea [PUT]
  taskRouter.put("/", getTaskById, async (req, res) => {
    try {
      let task = res.task;
  
      task.titulo = req.body.titulo || task.titulo;
      task.descripcion = req.body.descripcion || task.descripcion;
      task.estado = req.body.estado || task.estado;
      task.fecha_limite = req.body.fecha_limite || task.fecha_limite;
      task.color = req.body.color || task.color;
  
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Eliminar una tarea [DELETE]
  taskRouter.delete("/", getTaskById, async (req, res) => {
    try {
      let task = res.task;
      const sprintConTask = await Sprint.findOne({ lista_tareas: task._id });
      if (sprintConTask) {
        return res.status(400).json({
          message: "No se puede borrar esta tarea porque está asociada a un sprint.",
        });
      }
      const deletedTask = await task.deleteOne();
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  module.exports = taskRouter
  
