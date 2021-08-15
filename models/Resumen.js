const mongoose = require("mongoose");

const ResumenSchema = mongoose.Schema({
  nro_venta: {
    type: String,
    required: true,
    trim: true,
  },
  cantidades: {
    type: String,
    required: true,
    trim: true,
  },
  cliente: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  total_pago: {
    type: String,
    required: true,
    trim: true,
  },
  utilidad: {
    type: String,
    required: true,
    trim: true,
  }
});
module.exports = mongoose.model("Resumen", ResumenSchema);