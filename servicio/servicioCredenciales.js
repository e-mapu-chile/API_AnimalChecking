"use strict";

const { query } = require("express");
const { resolve } = require("path");

var jwt = require("../servicio/jwt");

let _tokenG1;
function validarCredenciales(user, pass, esCelular) {
  var ramdoms = Math.random();
  var dataJ = user + pass + ramdoms;
  _tokenG1 = jwt.createToken(dataJ);
  return new Promise((resolve, reject) => {
    const mssql = require("mssql");
    var conexionStringParams = require("../SQLConfString/config.json");
    const sqlConfig = {
      password: conexionStringParams.password,
      database: conexionStringParams.database,
      stream: false,
      options: {
        enableArithAbort: true,
        encrypt: false,
      },
      port: 1433,
      user: conexionStringParams.user,
      server: conexionStringParams.server,
    };
    console.log("Ejecutar SP2");

    mssql
      .connect(sqlConfig)
      .then((pool) => {
        return pool
          .request()
          .input("user", mssql.VarChar(100), user) //    query(querySqls);
          .input("password", mssql.VarChar(100), pass)
          .input("token", mssql.VarChar(3000), _tokenG1)
          .input("esCelular", mssql.Int, esCelular)
          .execute("SP_ValidarCredenciales");
      })
      .then((result) => {
        console.dir("resultado VALIDA = " + result);
        const datoJson = JSON.stringify(result.recordset[0], null, 4);
        console.log("SQL = " + datoJson);
        mssql.close();
        resolve(datoJson);
      })
      .catch((err) => {
        console.log("error handler");
        console.error(err);
        mssql.close();
        reject(err);
      });
  });
}
function listarBastones(empresaId) {

  return new Promise((resolve, reject) => {
    const mssql = require("mssql");
    var conexionStringParams = require("../SQLConfString/config.json");
    const sqlConfig = {
      password: conexionStringParams.password,
      database: conexionStringParams.database,
      stream: false,
      options: {
        enableArithAbort: true,
        encrypt: false,
      },
      port: 1433,
      user: conexionStringParams.user,
      server: conexionStringParams.server,
    };
    console.log("Ejecutar SP2");

    mssql
      .connect(sqlConfig)
      .then((pool) => {
        return pool
          .request()
          .input("empresaId", mssql.Int, empresaId)
          .execute("SP_ListarBastones");
      })
      .then((result) => {
        console.dir("resultado Lista Bastones = " + result);
        const datoJson = JSON.stringify(result.recordset, null, 4);
        console.log("SQL = " + datoJson);
        mssql.close();
        resolve(datoJson);
      })
      .catch((err) => {
        console.log("error handler");
        console.error(err);
        mssql.close();
        reject(err);
      });
  });
}

exports.validarCredenciales = validarCredenciales;
exports.listarBastones = listarBastones;
