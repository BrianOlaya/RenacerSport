const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
  //LEYENDO EL TOKEN
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token permiso no valido" });
  }
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    req.admin = cifrado.admin;
    next();
  } catch (error) {
    res.status(401)({ msg: "Token no valido" });
  }
};