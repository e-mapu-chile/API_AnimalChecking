"use strict";

var express = require("express");
var bodyParse = require("body-parser");
var cors = require("cors");

var app = express();

app.get("/", function (req, res) {
 
  //CONEXION STRING SQL SERVER
  
  
});
var servicioAnimalDataCloud = require("./rutas/servicioAnimalDataCloud");

app.use(cors({ origin: "*" }));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json({limit: "50mb"}));
app.use(bodyParse.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//CONFIGURAR CABECERAS HTTP

//RUTAS BASE
app.use("/api", servicioAnimalDataCloud);

module.exports = app;

var app = require("./app");
var port = 8080;//process.env.PORT;

app.listen(port, function () {
  console.log("el servidor esta oka");
});
