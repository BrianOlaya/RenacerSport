const mongoose = require("mongoose");

const VentaSchema = mongoose.Schema({
  numero_venta: {
    type: Number,
    required: true,
    trim: true,
    default:0,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  producto: {
    type: String,
    required: true,
    trim: true,
  },
  codigo_producto: {
    type: String,
    required: true,
    trim: true,
  },
  nombre_cliente: {
    type: String,
    required: true,
    trim: true,
  },
  documento_cliente: {
    type: String,
    required: true,
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
  },
  cantidad: {
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

module.exports = mongoose.model("Venta", VentaSchema);