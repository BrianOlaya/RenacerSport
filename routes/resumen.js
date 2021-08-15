var express = require('express');
var router = express.Router();
const ResumenController = require("../controllers/ResumenController");
const { check } = require("express-validator"); //VALIDACION, LA FUNCION CHECK RECIBE: 1. EL CAMPO VALIDAR, 2 . EL MENSAJE DE VALIDACION , 3. LAS REGLAS DE VALIDACION
const auth = require("../middleware/auth_dos");




//OBTENER PRODUCTOS  
router.get( '/mes', auth, ResumenController.obtenerTodosLosResumenes );


//BORRRAE RESUMENES  
// router.delete( '/borrar', auth, ResumenController.borrarTodasLosResumenes );



router.post("/", auth,
  [
    check("nro_venta", "El numero de venta es obligatorio").not().isEmpty(),
    check("cantidades", "Las cantidades son obligatorias").not().isEmpty(),
    check("cliente", "El nombre del cliente es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("total_pago", "El total pago es obligatorio").not().isEmpty(),
    check("utilidad", "La utilidad es obligatoria").not().isEmpty()
  ],
  ResumenController.crearResumen
);


module.exports = router;