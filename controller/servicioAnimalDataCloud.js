"use strict";
const nodemailer = require("nodemailer");
var request = require('request');

const servicioCredenciales = require("../servicio/servicioCredenciales.js");
const servicioAnimal = require("../servicio/servicioAnimal");

var _usuarioReturn;
function login(req, res) {
  var params = req.query;

  var user = params.user;
  var password = params.password;
  var esCelular = params.esCelular;


  return new Promise((resolve, reject) => {


    servicioCredenciales
      .validarCredenciales(user, password, esCelular)
      .then(function (data) {
        console.log(data);
        _usuarioReturn = JSON.parse(data);
        return _usuarioReturn;

      })
      .then(function (f) {
        console.log("EMpresa => " + f.EmpresaId);
        return servicioCredenciales.listarBastones(f.EmpresaId)

      })
      .then(function (d) {
        var data = {
          usuario: _usuarioReturn,
          bastones: JSON.parse(d)
        }

        res.status(200).send(data);
        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res.status(401).send({ message: "El usuario no pudo loguearse" });
        reject(error);
      });
  });
}


function nuevoAnimal(req, res) {
  var params = req.body;


  //diio, fechaNacimiento,especie,raza,categoria,rup,estadoAnimal,sexo,estadoProceso


  var diio = params.diio;
  var fechaNacimiento = params.fechaNacimiento;
  var especie = params.especie;
  var raza = params.raza;
  var categoria = params.categoria;
  var rup = params.rup;
  var estadoAnimal = params.estadoAnimal;
  var sexo = params.sexo;
  var estadoProceso = params.estadoProceso;
  var pesoActual = params.pesoActual;
  var loteId = params.loteId;
  var empresaId = params.empresaId;
  var latitud = params.latitud;
  var longitud = params.longitud;
  var usuarioId = params.usuarioId;

  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
    servicioAnimal
      .nuevoAnimal(
        diio, fechaNacimiento, especie, raza, categoria, rup, estadoAnimal, sexo, estadoProceso, pesoActual, loteId, empresaId,
        latitud, longitud, usuarioId
      )
      .then(function (data) {
        //        console.log("DATA P => "+data);
        let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        animalInsertado = reco.recordset[0].respuesta;
        return reco.recordset[0].respuesta;
      })
      .then(function (re) {
        let objRet = {
          animalInsertado: re,
        };
        console.log('RESPUESTA => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para generar el aninmal" });
        reject(error);
      });
  });
}

function nuevaTarea(req, res) {
  var params = req.body;


  // nombre, objetivoTarea, cantidadAnimales,
  //    fechaEjecucion, estadoTarea, objetivoTareaId,
  //     estadoTareaId, UsuarioId, UsuarioAsignadoId


  var nombre = params.nombre;
  var objetivoTarea = params.objetivoTarea;
  var cantidadAnimales = params.cantidadAnimales;
  var fechaEjecucion = params.fechaEjecucion;
  var objetivoTareaId = params.objetivoTareaId;
  var estadoTareaId = params.estadoTareaId;
  var UsuarioId = params.UsuarioId;
  var UsuarioAsignadoId = params.UsuarioAsignadoId;

  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
    servicioAnimal
      .nuevaTarea(
        nombre, objetivoTarea, cantidadAnimales,
        fechaEjecucion, objetivoTareaId,
        estadoTareaId, UsuarioId, UsuarioAsignadoId
      )
      .then(function (data) {
        //        console.log("DATA P => "+data);
        let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        tareaInsertado = reco.recordset[0].respuesta;
        return reco.recordset[0].respuesta;
      })
      .then(function (re) {
        let objRet = {
          animalInsertado: re,
        };
        console.log('RESPUESTA => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para generar la tarea" });
        reject(error);
      });
  });
}

function getDiioSinap(req, res) {
  var params = req.query;

  var diio = params.diio;
  console.log("DIIO => " + diio)
  return new Promise((resolve, reject) => {
    request('https://sinaptest.sag.gob.cl/api/apilab/ConsultaDiioGet?diio=' + diio + '', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(response.body)
        res.status(200).send(data);

        resolve("ok");
      }
    })

  }, reject => {
    reject("error");
  });



}

function nuevaGeoreferenciaAnimal(req, res) {
  var params = req.body;
  //diio, rup, longitud, latitud, usuarioId, empresaId
  var diio = params.diio;
  var rup = params.rup;
  var longitud = params.longitud;
  var latitud = params.latitud;
  var usuarioId = params.usuarioId;
  var empresaId = params.empresaId;

  return new Promise((resolve, reject) => {

    let animalGeoreferenciadoInsertado = 0;
    servicioAnimal
      .nuevaGeoreferenciaAnimal(
        diio, rup, longitud, latitud, usuarioId, empresaId
      )
      .then(function (data) {
        //        console.log("DATA P => "+data);
        let reco = JSON.parse(data);
        console.log("DATA ProtocoloID => " + reco.recordset);
        animalGeoreferenciadoInsertado = reco.recordset;
        return reco.recordset;
      })
      .then(function (re) {
        let objRet = {
          animalGeoInsertado: re,
        };
        console.log('RESPUESTA => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        console.log("ERROR QLAO => " + error);
        res
          .status(401)
          .send({ message: "Existen problemas para generar la georeferencia del animal" });
        reject(error);
      });
  });
}


 function nuevoRegistroAnimalChecking(req, res) {
  var params = req.body;
  var jsonAnimales = params.jsonAnimales;
    
  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
     servicioAnimal
      .nuevoRegistroAnimalChecking(
        jsonAnimales
      )
      .then(function (data) {
        console.log("DATA P => " + data);

        // let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        // animalInsertado = reco.recordset[0].respuesta;
        let objRet = {
          eventoLote: data,
        };
        return objRet;
      })
      .then(function (re) {
        let objRet = {
          eventoLote: re,
        };
        console.log('RESPUESTA => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para generar el lote" });
        reject(error);
      });
  });

}

function syncronizarRegistrosAnimalChecking(req, res) {
  var params = req.body;
  var jsonAnimales = params.jsonAnimales;
    
  return new Promise((resolve, reject) => {

    let animalInsertado = 0;
     servicioAnimal
      .syncronizarRegistrosAnimalChecking(
        jsonAnimales
      )
      .then(function (data) {
        console.log("DATA P => " + data);

        // let reco = JSON.parse(data);
        // console.log("DATA ProtocoloID => " + reco.recordset[0].protocoloId);
        // animalInsertado = reco.recordset[0].respuesta;
        let objRet = {
          eventoLote: data,
        };
        return objRet;
      })
      .then(function (re) {
        let objRet = {
          eventoLote: re,
        };
        console.log('RESPUESTA => ' + JSON.stringify(objRet))
        res.status(200).send(objRet);

        resolve("ok");
      })
      .catch((error) => {
        //console.log(error);
        res
          .status(401)
          .send({ message: "Existen problemas para generar el lote" });
        reject(error);
      });
  });

}

module.exports = {
  login,
  nuevoAnimal,
  nuevaTarea,
  getDiioSinap,
  nuevaGeoreferenciaAnimal,
  nuevoRegistroAnimalChecking,
  syncronizarRegistrosAnimalChecking

};
