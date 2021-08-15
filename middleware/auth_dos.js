module.exports = function (req, res, next) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
  if (localStorage.getItem("token") == '' || localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
    res.redirect("/");
    return('sin autenticar')
  } else {
    next();
  }
};
