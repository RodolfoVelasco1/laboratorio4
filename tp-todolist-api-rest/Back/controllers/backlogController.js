const Task = require('../models/Task');


exports.getBacklog = async (req, res) => {
  try {
    const tareas = await Task.find({ sprintId: null });

    res.json({ tareas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { titulo, descripcion, fechaLimite } = req.body;
    const nuevaTarea = new Task({
      titulo,
      descripcion,
      fechaLimite,
      estado: 'pendiente'
    });
    const guardada = await nuevaTarea.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const tarea = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const tarea = await Task.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
