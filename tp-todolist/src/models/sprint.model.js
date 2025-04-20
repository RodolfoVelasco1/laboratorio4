const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema(
    {
        fecha_inicio: { type: Date, required: true },
        fecha_cierre: { type: Date, required: true },
        lista_tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
        color: { type: String },
    }
)

module.exports = mongoose.model('Sprint', sprintSchema)