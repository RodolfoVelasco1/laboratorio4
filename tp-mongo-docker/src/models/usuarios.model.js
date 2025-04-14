const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema(
    {
        nombre: String,
        edad: Number,
        email: String,
    }
)

module.exports = mongoose.model('Usuario', usuariosSchema)

