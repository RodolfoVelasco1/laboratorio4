const Backlog = require("../models/backlog.model.js");

const existeBacklog = async (req, res, next) => {
    try {
      const existeBacklog = await Backlog.findOne();
      if (!existeBacklog) {
        const newBacklog = new Backlog({
          tareas: [],
        });
        await newBacklog.save();
        console.log("Backlog creado");
        return newBacklog;
      } else {
        return existeBacklog;
      }
  } catch (error) {
    console.error("Ups, ocurrió un error:", error);
  }

};

  module.exports.existeBacklog = existeBacklog;