const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  fechaLimite: {
    type: String, 
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_curso', 'terminado'],
    default: 'pendiente'
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint',
    default: null
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Task', tareaSchema);
