const Resumen = require("../models/Resumen");
const { validationResult } = require("express-validator");
const moment = require('moment')

exports.crearResumen = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("error...");
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //CREANDO UN NUEVO PRODUCTO
    const resumen = new Resumen(req.body);
    //GUARDANDO EL  PRODUCTO
    resumen.save();

    res.json(resumen);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//OBTIENE LOS PRODUCTOS

exports.obtenerTodosLosResumenes = async (req, res) => {

  let  mes= moment().format('l').split('/')[0]
  let año= moment().format('l').split('/')[2]
  let fecha = mes +'/'+ año

 
  try {
    const resumenes = await Resumen.find({fecha:fecha});
     res.send(resumenes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};


// exports.borrarTodasLosResumenes = async (req, res) => {
//   try {
//     const resumenes = await Resumen.remove();
//     res.send(resumenes);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error");
//   }
// };
