"use strict";

const { query } = require("express");
const { resolve } = require("path");

function nuevoAlimento(nombre, numeroSerie, fechaVencimiento,
    tipoAlimento, cantidadStock, cantidadStockIngreso,
    precioCompra, empresaId, usuarioId) {

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
        console.log("Ejecutar SP3");

        time = new Date(fechaVencimiento + " 00:00");
        console.log(time.getDate() + '/' + time.getMonth() + '/' + ime.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes());

        //  nombre nvarchar(50),
        //    @numeroSerie nvarchar(50),
        //    @fechaVencimiento datetime,
        //    @tipoAlimento nvarchar(50),
        //    @cantidadStock float,
        //    @cantidadStockIngreso float,
        //    @precioCompra float
        mssql
            .connect(sqlConfig)
            .then((pool) => {
                return pool
                    .request()
                    .input("nombre", mssql.VarChar(50), nombre)
                    .input("numeroSerie", mssql.VarChar(50), numeroSerie)
                    .input("fechaVencimiento", mssql.DateTime, time)
                    .input("tipoAlimento", mssql.VarChar(50), tipoAlimento)
                    .input("cantidadStock", mssql.Float, cantidadStock)
                    .input("cantidadStockIngreso", mssql.Float, cantidadStockIngreso)
                    .input("precioCompra", mssql.Float, precioCompra)
                    .input("empresaId", mssql.Int, empresaId)
                    .input("usuarioId", mssql.Int, usuarioId)
                    .execute("SP_InsertarAlimento");
            })
            .then((result) => {
                console.dir("resultado INSERT alimeto = " + result);
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

function descuentoStockAlimento(alimentoId, cantidadADescontar){
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
        console.log("Ejecutar SP3");

        time = new Date(fechaVencimiento + " 00:00");
        console.log(time.getDate() + '/' + time.getMonth() + '/' + ime.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes());

        //  @id as int
        //,@cantidad as float
        mssql
            .connect(sqlConfig)
            .then((pool) => {
                return pool
                    .request()
                    .input("id", mssql.Int, alimentoId)
                    .input("cantidad", mssql.Float, cantidadADescontar)
                    .execute("SP_DescuentoStockAlimento");
            })
            .then((result) => {
                console.dir("resultado UPDATE alimeto = " + result);
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

function listarAlimentos(empresaId) {
    
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
            .execute("SP_ListarAlimentos");
        })
        .then((result) => {
          console.dir("resultado Lista Alimentos = " + result);
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

exports.nuevoAlimento = nuevoAlimento;
exports.descuentoStockAlimento = descuentoStockAlimento;
exports.listarAlimentos = listarAlimentos;