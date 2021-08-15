const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const conectarBD = async () => {
  try {
    await mongoose.connect('mongodb+srv://iccserver:renacerparalasnaciones2020@cluster0.kgtsa.mongodb.net/iccserver', {
      //EL METODO CONNECT DE MONGOOSWE RECIBE DOS PARAMETROS
      useNewUrlParser: true, //EL PRIMERO ES  LA URL QUE SE VA A CONECGTAR Y EL SEGUNDO OBJETO LA CONFIGURACION
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex:true
    });
    console.log("DB CONECTADA");
  } catch (error) {
    console.log(error);
    process.exit(1); // detiene la aplicaion si hay un error
  }
};

module.exports = conectarBD;