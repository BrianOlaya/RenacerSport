//RUTAS PARA AUTENTICAR USUARIOS
const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const auth = require("../middleware/auth_dos");
const { check } = require("express-validator");

router.post(
  "/",

  authController.autenticarAdmin
);

router.post(
    "/logout", 
  
    authController.cerrarSesion
  );

router.get("/", auth, authController.adminAutenticado);

module.exports = router;