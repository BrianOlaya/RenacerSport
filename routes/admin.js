const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const { check } = require("express-validator");
const auth = require("../middleware/auth_dos");

router.post(
  "/", auth,
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("contraseña", "la contraseña es obligatoria").not().isEmpty(),
  ],
  adminController.crearAdmin
);

router.get( '/', auth, adminController.obtenerTodosLosAdmin );

module.exports = router;