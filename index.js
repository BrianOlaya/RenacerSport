const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser');
const app = express()
var path = require('path');
const conectarBD = require('./config/db');

conectarBD();

app.use(cors());
app.use(express.json ({ extended:true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server on port ${PORT}`)
});

app.use('/', require ('./routes/index'));
app.use('/producto', require ('./routes/producto'));
app.use('/venta', require ('./routes/venta'));
app.use('/resumen', require ('./routes/resumen'));
app.use('/cliente', require ('./routes/cliente'));
app.use('/historico_ventas', require ('./routes/historico_ventas'));
app.use('/auth', require ('./routes/auth'));
app.use('/admin', require ('./routes/admin'));