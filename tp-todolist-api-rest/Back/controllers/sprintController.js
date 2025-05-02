const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

// Obtener todos los sprints con tareas
exports.getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tareas');
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un sprint por ID
exports.getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate('tareas');
    if (!sprint) return res.status(404).json({ mensaje: 'Sprint no encontrado' });
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo sprint
exports.createSprint = async (req, res) => {
  try {
    const { nombre, fechaInicio, fechaCierre } = req.body;

    if (!nombre || !fechaInicio || !fechaCierre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoSprint = new Sprint({
      nombre,
      fechaInicio,
      fechaCierre,
      tareas: []
    });

    const sprintGuardado = await nuevoSprint.save();
    res.status(201).json(sprintGuardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un sprint existente
exports.updateSprint = async (req, res) => {
  try {
    const sprintActualizado = await Sprint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!sprintActualizado) return res.status(404).json({ mensaje: 'Sprint no encontrado' });
    res.json(sprintActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un sprint
exports.deleteSprint = async (req, res) => {
  try {
    const sprintEliminado = await Sprint.findByIdAndDelete(req.params.id);
    if (!sprintEliminado) return res.status(404).json({ mensaje: 'Sprint no encontrado' });
    res.json({ mensaje: 'Sprint eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar una tarea a un sprint
exports.addTaskToSprint = async (req, res) => {
  try {
    const { sprintId, taskId } = req.params;

    // Buscar tarea y sprint
    const tarea = await Task.findById(taskId);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) return res.status(404).json({ mensaje: 'Sprint no encontrado' });

    // Marcar la tarea como asignada a este sprint
    tarea.sprintId = sprint._id;
    await tarea.save();

    // Evitar duplicados en el array de tareas del sprint
    const yaAgregada = sprint.tareas.some(t => t.toString() === tarea._id.toString());
    if (!yaAgregada) {
      sprint.tareas.push(tarea._id);
      await sprint.save();
    }

    res.status(200).json({ mensaje: 'Tarea agregada al sprint', sprint });
  } catch (err) {
    console.error('Error en addTaskToSprint:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
// Quitar una tarea del sprint y devolverla al backlog
exports.removeTaskFromSprint = async (req, res) => {
  try {
    const { sprintId, taskId } = req.params;

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) return res.status(404).json({ mensaje: 'Sprint no encontrado' });

    const tarea = await Task.findById(taskId);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    // Eliminar la tarea del array de tareas del sprint
    sprint.tareas = sprint.tareas.filter(t => t.toString() !== taskId);
    await sprint.save();

    // Quitar la referencia al sprint en la tarea
    tarea.sprintId = null;
    await tarea.save();

    res.status(200).json({ mensaje: 'Tarea devuelta al backlog', tarea });
  } catch (err) {
    console.error('Error en removeTaskFromSprint:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
