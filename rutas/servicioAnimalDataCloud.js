"use strict";

var express = require("express");
var servicioAnimalDataCloudController = require("../controller/servicioAnimalDataCloud");
var servicioInsumoAnimalController = require("../controller/servicioInsumoAnimal");

var api = express.Router();
var md_auth = require("../middlewares/authenticated");

//#region Credenciales
api.get("/login/:user?/:password?/:esCelular?", servicioAnimalDataCloudController.login);
//#endregion

//#region Animal
api.post(
    "/nuevoAnimal",
    servicioAnimalDataCloudController.nuevoAnimal);
api.get("/getDiio/:diio?", servicioAnimalDataCloudController.getDiioSinap);

api.post(
    "/nuevaGeoAnimal",
    servicioAnimalDataCloudController.nuevaGeoreferenciaAnimal);

api.post(
    "/nuevoAnimalChecking",
    servicioAnimalDataCloudController.nuevoRegistroAnimalChecking);
api.post(
    "/syncronizarAnimalChecking",
    servicioAnimalDataCloudController.syncronizarRegistrosAnimalChecking);
//#endregion

//#region Tarea
api.post(
    "/nuevoTarea",
    servicioAnimalDataCloudController.nuevaTarea);
//#endregion

//#region InsumoAnimal
api.post(
    "/nuevoStockAlimento",
    servicioInsumoAnimalController.nuevoAlimento);
api.post(
    "/descuentoStockAlimento",
    servicioInsumoAnimalController.descuentoStockAlimento);
api.get("/listaInsumos/:empresaId?", servicioInsumoAnimalController.listaAlimentos);
//#endregion



module.exports = api;