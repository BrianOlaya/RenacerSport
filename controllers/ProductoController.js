const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");
const { parse, stringify, toJSON, fromJSON } = require("flatted");
const { lock } = require("../routes");
const { findById } = require("../models/Producto");

exports.crearProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("error...");
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //CREANDO UN NUEVO PRODUCTO
    const producto = new Producto(req.body);
    //GUARDANDO EL  PRODUCTO
    producto.save();

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTIENE LOS PRODUCTOS

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.send(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTIENE LOS PRODUCTO POR ID

exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.find({
      descripcion: req.params.descripcion,
    });

    res.send(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//ACTUALIZAR INFORMACION DE  UN PRODUCTO
exports.actualizarProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //EXTRAYENDO LA INFORMACION DEL PRODCUTO A ACTUALIZAR
  const { descripcion, costo, precio_venta } = req.body;
  const productoActualizado = {};

  if (descripcion) {
    productoActualizado.descripcion = descripcion;
  }
  if (costo) {
    productoActualizado.costo = costo;
  }
  if (precio_venta) {
    productoActualizado.precio_venta = precio_venta;
  }
  try {
    //REVISANDO CODIGO DE PRODCUTO
    let producto = await Producto.findById(req.params.id);

    // SI EXISTE EL PRODCUTO
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    //ACTUALIZAR
    producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: productoActualizado },
      { new: true }
    );

    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

//ACTUALIZAR CANTIDAD DE  UN PRODCUTO
exports.IngresarCantidadProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //EXTRAYENDO LA INFORMACION DEL PRODUCTO  A ACTUALIZAR
  const { descripcion, costo, precio_venta, cantidad } = req.body;
  const productoActualizado = {};

  if (descripcion) {
    productoActualizado.descripcion = descripcion;
  }
  if (costo) {
    productoActualizado.costo = costo;
  }
  if (precio_venta) {
    productoActualizado.precio_venta = precio_venta;
  }
  if (cantidad) {
    productoActualizado.cantidad = cantidad;
  }
  try {
    //REVISANDO CODIGO DE PRODCUTO
    let producto = await Producto.findById(req.params.id);
    let cantidad = parseInt(producto.cantidad);
    // SI EXISTE EL PRODUCTO
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    productoActualizado.cantidad =
      parseInt(productoActualizado.cantidad) + cantidad;
    //ACTUALIZAR
    producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: productoActualizado },
      { new: true }
    );

    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

//RESTAR CANTIDAD DE  UN PRODCUTO DEL INVENTARIO AL REGISTRA UNA VENTA
exports.RestarCantidadProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    let cantidad = req.body.cantidad;

    let producto_facturado = await Producto.findById(req.params.id);

    let producto_actualizado = {
      cantidad: producto_facturado.cantidad - cantidad,
    };

    let producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: producto_actualizado },
      { new: true }
    );

    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
