const Sprint = require('../models/sprint.model')

const getSprintById = async (req, res, next) => {
  let sprint;
  const { id } = req.query;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "El id de la sprint no es valido" });
  }

  try {
    sprint = await Sprint.findById(id);

    if (!sprint) {
      return res
        .status(404)
        .json({ message: "No se encontro una sprint con ese id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.sprint = sprint;
  next();
};

module.exports.getSprintById = getSprintById;