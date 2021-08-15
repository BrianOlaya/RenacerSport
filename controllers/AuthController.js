const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

exports.autenticarAdmin = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre, contraseña } = req.body;
  try {
    let admin = await Admin.findOne({ nombre });
    if (!admin) {
    return  res.send({ status: 400, message: 'El usuario no existe.' });
    }
    const contraseñaCorrecta = await bcryptjs.compare(
      contraseña,
      admin.contraseña
    );
    if (!contraseñaCorrecta) {
     return res.send({ status: 400, message: 'Contraseña incorrecta.' });
    }

    //CREANDO EL JWT
    const payload = {
      admin: {
        id: admin._id,
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
        localStorage.setItem('user', admin.nombre);
        localStorage.setItem('token', token);
        res.send({ token: token, message: 'Bienvenido a Renacer Sport.' });

      }
    );
  } catch (error) {
    console.log(error);
  }

};

//OBTIEN EL USUARIO AUTENTICADO

exports.adminAutenticado = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id); //selected('-contraseña');
    res.json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.cerrarSesion = async (req, res) => {
    try {
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
      res.send({ status: 'OK', message: 'Sesion cerrada.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Hubo un error" });
    }
  };