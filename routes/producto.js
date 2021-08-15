var express = require('express');
const Producto = require("../models/Producto");
var router = express.Router();
const ProductoController = require("../controllers/ProductoController");
const { check } = require("express-validator"); //VALIDACION, LA FUNCION CHECK RECIBE: 1. EL CAMPO VALIDAR, 2 . EL MENSAJE DE VALIDACION , 3. LAS REGLAS DE VALIDACION
const auth = require("../middleware/auth_dos");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}


router.get('/', auth, function (req, res, next) {     
    let usuario= localStorage.getItem('user');
    res.render('producto', {usuario:usuario})
});

router.post("/", auth,
  [
    check("codigo", "El código de producto es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción de producto es obligatoria").not().isEmpty(),
    check("costo", "El costo de producto es obligatorio").not().isEmpty(),
    check("precio_venta", "El precio venta de producto es obligatorio").not().isEmpty()
  ],
  ProductoController.crearProducto
);


//OBTENER PRODUCTOS
router.get( "/productos", auth, ProductoController.obtenerProductos);

//OBTENER PRODUCTO POR ID
router.get( "/:descripcion",  auth, ProductoController.obtenerProducto);

//ACTUALIZAR INFO PRODUCTOS VIA ID
router.put( "/productos/:id", auth,
  [
    check("descripcion", "La descripción de producto es obligatoria").not().isEmpty(),
    check("costo", "El costo de producto es obligatorio").not().isEmpty(),
    check("precio_venta", "El precio venta de producto es obligatorio").not().isEmpty(),
  ],
  ProductoController.actualizarProducto
);

//INGRESAR CANTIDAD PRODUCTOS VIA ID
router.put( "/productos_cantidad/:id", auth,
  [
    check("descripcion", "La descripción de producto es obligatoria").not().isEmpty(),
    check("costo", "El costo de producto es obligatorio").not().isEmpty(),
    check("precio_venta", "El precio venta de producto es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad de producto es obligatorio").not().isEmpty(),
  ],
  ProductoController.IngresarCantidadProducto
);


//RESTAR CANTIDAD PRODUCTOS DELINVENTARIO AL VENDER VIA CODIGO
router.put( "/productos_restar_cantidad/:id", auth,
  [
    check("cantidad", "La cantidad de producto es obligatorio").not().isEmpty(),
  ],
  ProductoController.RestarCantidadProducto
);



 module.exports = router;