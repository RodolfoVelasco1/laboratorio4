const Task = require("../models/task.model.js");

const getTaskById = async (req, res, next) => {
  let task;
  const { id } = req.query;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "El id de la tarea no es valido" });
  }

  try {
    task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ message: "No se encontro una tarea con ese id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.task = task;
  next();
};

module.exports.getTaskById = getTaskById;
