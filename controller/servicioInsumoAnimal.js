"use strict";
const nodemailer = require("nodemailer");

const servicioInsumoAnimal = require("../servicio/servicioInsumoAnimal");


function nuevoAlimento(req, res) {
  var params = req.body;


  // nuevoAlimento(nombre, numeroSerie, fechaVencimiento,
  //tipoAlimento, cantidadStock, cantidadStockIngreso,
  // precioCompra, empresaId


  var nombre = params.nombre;
  var numeroSerie = params.numeroSerie;
  var fechaVencimiento = params.fechaVencimiento;
  var tipoAlimento = params.tipoAlimento;
  var cantidadStock = params.cantidadStock;
  var cantidadStockIngreso = params.cantidadStockIngreso;
  var precioCompra = params.precioCompra;
  var empresaId = params.empresaId;


  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
    servicioInsumoAnimal
      .nuevoAlimento(
        nombre, numeroSerie, fechaVencimiento,
        tipoAlimento, cantidadStock, cantidadStockIngreso,
        precioCompra, empresaId
      )
      .then(function (data) {
        //        console.log("DATA P => "+data);
        let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        // tareaInsertado = reco.recordset[0].respuesta;
        return reco.recordset[0].respuesta;
      })
      .then(function (re) {
        let objRet = {
          alimentoInsertado: re,
        };
        console.log('RESPUESTA alimento => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para insertar el alimento" });
        reject(error);
      });
  });
}

function descuentoStockAlimento(req, res) {
  var params = req.body;


  // alimentoId, cantidadADescontar


  var alimentoId = params.alimentoId;
  var cantidadADescontar = params.cantidadADescontar;
  
  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
    servicioInsumoAnimal
      .descuentoStockAlimento(
        alimentoId,cantidadADescontar
      )
      .then(function (data) {
        //        console.log("DATA P => "+data);
        let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        // tareaInsertado = reco.recordset[0].respuesta;
        return reco.recordset[0].respuesta;
      })
      .then(function (re) {
        let objRet = {
          alimentoStockActualizado: re,
        };
        console.log('RESPUESTA update alimento => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para updatear el alimento" });
        reject(error);
      });
  });
}


function listaAlimentos(req, res) {
  var params = req.query;

  var empresaId = params.empresaId;
  
  return new Promise((resolve, reject) => {


    servicioInsumoAnimal
      .listarAlimentos(empresaId)
      .then(function (data) {
        console.log(data);

        res.status(200).send(data);
        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res.status(401).send({ message: "No existen insumos" });
        reject(error);
      });
  });
}


module.exports = {
  nuevoAlimento,
  descuentoStockAlimento,
  listaAlimentos
};