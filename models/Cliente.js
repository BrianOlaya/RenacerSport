const mongoose = require("mongoose");

const ClienteSchema = mongoose.Schema({
  numero_documento: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  tipo_documento: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  sector: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model("Cliente", ClienteSchema);