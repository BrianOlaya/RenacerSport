const Venta = require("../models/Venta");
const { validationResult } = require("express-validator");

exports.crearVenta = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("error...");
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //CREANDO UN NUEVO VENTA
    const venta = new Venta(req.body);
    //GUARDANDO EL  VENTA
    venta.save();

    res.json(venta);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTIENE LOS VENTAS

exports.obtenerTodasLosVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.send(ventas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerNroVenta = async (req, res) => {
  try {
    const nro_venta = await Venta.find();
    res.send(nro_venta);

    // const nro_venta = await Venta.distinct('numero_venta');
    // res.send(nro_venta.sort((a, b) => a - b));    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};



// exports.borrarTodasLosVentas = async (req, res) => {
//   try {
//     const ventas = await Venta.remove();
//     res.send(ventas);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error");
//   }
// };