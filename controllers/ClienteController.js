const Cliente = require("../models/Cliente");
const { validationResult } = require("express-validator");
const { parse, stringify, toJSON, fromJSON } = require("flatted");
const { lock } = require("../routes");
const { findById } = require("../models/Cliente");

exports.crearCliente = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("error...");
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //CREANDO UN NUEVO PRODUCTO
    const cliente = new Cliente(req.body);
    //GUARDANDO EL  PRODUCTO
    cliente.save();

    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTIENE LOS PRODUCTOS

exports.obtenerTodosLosClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();

    res.send(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerClienteSeleccionado = async (req, res) => {
  try {
    const cliente = await Cliente.find({ nombre: req.params.nombre });

    res.send(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
