const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        descripcion: { type: String },
        estado: { type: String, enum: ["pendiente", "en_progreso", "completado"], required: true },
        fecha_limite: { type: Date, required: true },
        color: { type: String },
    }
)

module.exports = mongoose.model('Task', taskSchema)
