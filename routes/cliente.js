var express = require('express');
const Cliente = require("../models/Cliente");
var router = express.Router();
const ClienteController = require("../controllers/ClienteController");
const { check } = require("express-validator"); //VALIDACION, LA FUNCION CHECK RECIBE: 1. EL CAMPO VALIDAR, 2 . EL MENSAJE DE VALIDACION , 3. LAS REGLAS DE VALIDACION
const auth = require("../middleware/auth_dos");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

router.get('/', auth, function (req, res, next) {     
    let usuario= localStorage.getItem('user');
    res.render('clientes', {usuario:usuario})
});

//OBTENER PRODUCTOS  
router.get( '/clientes', auth, ClienteController.obtenerTodosLosClientes );

//OBTENER PRODUCTO POR ID
router.get( "/:nombre", auth, ClienteController.obtenerClienteSeleccionado);


router.post("/", auth,
  [
    check("numero_documento", "El numero_documento es obligatorio").not().isEmpty(),
    check("tipo_documento", "El tipo_documento es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es obligatoria").not().isEmpty(),
    check("sector", "El sector es obligatoria").not().isEmpty()
  ],
  ClienteController.crearCliente
);


module.exports = router;