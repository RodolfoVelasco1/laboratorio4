const express = require('express')
const router = express.Router()
const Backlog = require("../models/backlog.model.js");
const { existeBacklog } = require("../controllers/backlog.controller.js");
const Task = require('../models/task.model.js');

const backlogRouter = express.Router();

//Obtener el backlog [GET ALL]
backlogRouter.get('/', async (req, res) => {
    try {
        const backlog = await Backlog.find();
        console.log('GET ALL', backlog);
        if(backlog.length === 0){
            return res.status(204).json([])
        }
        res.json(backlog)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Crear un nuevo backlog [POST]
backlogRouter.post('/', async (req, res) => {
    const { lista_tareas } = req?.body

    try {
        const existeBacklog = await existeBacklog();
        if(existeBacklog){
            console.log("El backlog ya existe.");
            res.status(400).json({message: error.message})
        }
        const backlog = new Backlog(
            {
                lista_tareas
            })
        const newBacklog = await backlog.save()
        console.log(newBacklog)
        res.status(201).json(newBacklog)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  });


//Agregar una tarea al backlog [POST]
backlogRouter.post('/addTaskToBacklog', async (req, res) => {
    const { taskId } = req.query;

    try {
      const backlog = await existeBacklog();
      if (!backlog) {
        return res.status(500).json({ message: "No se encontró ningún Backlog." });
      }
      const task = await Task.findById(taskId);
      if (!task) {
        console.log("No se encontraron tareas.");
        return res.status(404).json({ message: "No se encontró la tarea." });
      }
  
      backlog.lista_tareas.push(task);
  
      await backlog.save();
      return res
        .status(200)
        .json({ message: "Tarea agregada al backlog", task: task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = backlogRouter;