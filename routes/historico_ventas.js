var express = require('express');
const Venta = require("../models/Venta");
var router = express.Router();
const VentaController = require("../controllers/VentaController");
const { check } = require("express-validator"); //VALIDACION, LA FUNCION CHECK RECIBE: 1. EL CAMPO VALIDAR, 2 . EL MENSAJE DE VALIDACION , 3. LAS REGLAS DE VALIDACION
const auth = require("../middleware/auth_dos");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}



router.get('/', auth, function (req, res, next) {
    let usuario= localStorage.getItem('user');
    res.render('historico_ventas', {usuario:usuario})

});

//OBTENER VENTAS  
router.get( '/full', auth, VentaController.obtenerTodasLosVentas );

//BORRAR TODAS VENTAS 
// router.delete( '/borrar', auth, VentaController.borrarTodasLosVentas );


//OBTENER NRO VEMTA   
router.get( '/nro_venta', auth, VentaController.obtenerNroVenta );

router.post("/",  auth,
  [
    check("numero_venta", "Numero de venta es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("nombre_cliente", "El nombre de cliente es obligatorio").not().isEmpty(),
    check("documento_cliente", "El documento es obligatorio").not().isEmpty(),
    check("costo", "El costo es obligatorio").not().isEmpty(),
    check("precio_venta", "El precio es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("utilidad", "La utilidad es obligatoria").not().isEmpty(),
    check("producto", "El producto es obligatorio").not().isEmpty(),
    check("codigo_producto", "El  codigo de producto es obligatorio").not().isEmpty()
    
    
  ],
 VentaController.crearVenta
);


module.exports = router;