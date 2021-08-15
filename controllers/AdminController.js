const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

exports.crearAdmin = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre, contraseña } = req.body;

  try {
    let admin = await Admin.findOne({ nombre });
    if (admin) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    admin = new Admin(req.body);

    // CODIGO PARA HASHEAR CONTRASEÑA 
    const salt = await bcryptjs.genSalt(10);
    admin.contraseña = await bcryptjs.hash(contraseña, salt);

    await admin.save();

    res.send("usuario creado");
    //CREANDO EL JWT
    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 10800,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};


exports.obtenerTodosLosAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.send(admins);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};