var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth_dos");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

router.get('/', auth, function (req, res, next) {
    let usuario= localStorage.getItem('user');
    res.render('venta', {usuario:usuario})

});


module.exports = router;