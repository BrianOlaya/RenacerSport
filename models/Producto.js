const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  cantidad: {
    type: Number,
    trim: true,
  },
  costo: {
    type: String,
    required: true,
    trim: true,
  },
  precio_venta: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model("Producto", ProductoSchema);