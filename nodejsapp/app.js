require("dotenv").config();

var express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };

//const cors = require("cors");

//var prueba=require("./inicio");
const rutas=require("./rutas");
app.set('port',9000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(cors(corsOptions));
//app.use("", prueba);
app.use(rutas);



app.listen(9000, () => {
    console.debug("Servidor escuchando en puerto: 9000");
});
  
module.exports = app;