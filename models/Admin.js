const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const AdminSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

AdminSchema.methods.encryptPassword = (contraseña)=>{
return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10))
}

AdminSchema.methods.comparePassword = function (contraseña) {
 return bcrypt.compareSync(contraseña, this.contraseña);
}

module.exports = mongoose.model("Admin", AdminSchema);