var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth_dos");
const moment = require('moment')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

router.get('/', function (req, res, next) {
    res.render('auth')
});

router.get('/inicio', auth, function (req, res, next) {
    let usuario= localStorage.getItem('user');
    let  mes= moment().format('l').split('/')[0]
    let mes_actual=''
     
    if (mes=='1') {
        mes_actual ='Enero'
    } else if (mes=='2') {
        mes_actual ='Febrero'
    }else if (mes=='3') {
        mes_actual ='Marzo'
    }else if (mes=='4') {
        mes_actual ='Abril'
    }else if (mes=='5') {
        mes_actual ='Mayo'
    }else if (mes=='6') {
        mes_actual ='Junio'
    }else if (mes=='7') {
        mes_actual ='Julio'
    }else if (mes=='8') {
        mes_actual ='Agosto'
    }else if (mes=='9') {
        mes_actual ='Septiembre'
    }else if (mes=='10') {
        mes_actual ='Octubre'
    }else if (mes=='11') {
        mes_actual ='Noviembre'
    }else if (mes=='12') {
        mes_actual ='Diciembre'
    }else{
        mes_actual ='Mes en curso' 
    }
    res.render('index', {usuario:usuario, mes_actual})
});

router.get('/inventario',  auth, function (req, res, next) {
    let usuario= localStorage.getItem('user');
    res.render('inventario', {usuario:usuario})

});

module.exports = router;