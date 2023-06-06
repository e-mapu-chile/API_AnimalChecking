"use strict";

const { query } = require("express");
const { resolve } = require("path");


function nuevoAnimal(diio, fechaNacimiento, especie, raza, categoria, rup, estadoAnimal, sexo, estadoProceso,
    pesoActual, loteId, empresaId, latitud, longitud, usuarioId) {

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

        time = new Date(fechaNacimiento + " 00:00");
        console.log(time.getDate() + '/' + time.getMonth() + '/' + ime.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes());

        //   @diio nvarchar(50),
        //   @fechaNacimiento datetime,
        //  @especie  nvarchar(50),
        //  @raza nvarchar(50),
        //  @categoria nvarchar(50),
        //  @rup nvarchar(50),
        //  @estadoAnimal nvarchar(50),
        //  @sexo nvarchar(50),
        //  @estadoProceso int
        // @pesoActual float,
        //    @valorDinero float,
        //    @loteId int,
        //    @empresaId int,
        //    @latitud nvarchar(50),
        //    @longitud nvarchar(50),
        //    @usuarioId int

        mssql
            .connect(sqlConfig)
            .then((pool) => {
                return pool
                    .request()
                    .input("diio", mssql.VarChar(50), diio) //    query(querySqls);
                    .input("fechaNacimiento", mssql.DateTime, time)
                    .input("especie", mssql.VarChar(50), especie)
                    .input("raza", mssql.VarChar(50), raza)
                    .input("categoria", mssql.VarChar(50), categoria)
                    .input("rup", mssql.VarChar(50), rup)
                    .input("estadoAnimal", mssql.VarChar(50), estadoAnimal)
                    .input("sexo", mssql.VarChar(50), sexo)
                    .input("estadoProceso", mssql.Int, estadoProceso)
                    .input("pesoActual", mssql.Float, pesoActual)
                    .input("loteId", mssql.Int, loteId)
                    .input("empresaId", mssql.Int, empresaId)
                    .input("latitud", mssql.VarChar(50), latitud)
                    .input("longitud", mssql.VarChar(50), longitud)
                    .input("usuarioId", mssql.Int, usuarioId)
                    .execute("SP_InsertarAnimal");
            })
            .then((result) => {
                console.dir("resultado INSERT = " + result);
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


function nuevaTarea(nombre, objetivoTarea,
    fechaEjecucion, objetivoTareaId,
    estadoTareaId, UsuarioId, UsuarioAsignadoId, loteId, rup) {

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

        time = new Date(fechaEjecucion + " 00:00");
        console.log(time.getDate() + '/' + time.getMonth() + '/' + ime.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes());

        //   @nombre nvarchar(50),
        //    @objetivoTarea nvarchar(50),
        //    @cantidadAnimales int,
        //    @fechaEjecucion datetime,
        //    @estadoTarea nvarchar(50),
        //    @objetivoTareaId int,
        //    @estadoTareaId int
        //    @UsuarioId int,
        //    @UsuarioAsignadoId int
        mssql
            .connect(sqlConfig)
            .then((pool) => {
                return pool
                    .request()
                    .input("nombre", mssql.VarChar(50), nombre) //    query(querySqls);
                    .input("objetivoTarea", mssql.VarChar(50), objetivoTarea)
                    .input("fechaEjecucion", mssql.DateTime, time)
                    .input("objetivoTareaId", mssql.Int, objetivoTareaId)
                    .input("estadoTareaId", mssql.Int, estadoTareaId)
                    .input("UsuarioId", mssql.Int, UsuarioId)
                    .input("UsuarioAsignadoId", mssql.Int, UsuarioAsignadoId)
                    .input("LoteId", mssql.Int, loteId)
                    .input("RUP", mssql.VarChar(50), rup)
                    .execute("SP_InsertarTarea");
            })
            .then((result) => {
                console.dir("resultado INSERT = " + result);
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


function nuevaGeoreferenciaAnimal(diio, rup, longitud, latitud, usuarioId, empresaId) {
    if (longitud.length > 0 && latitud.length > 0) {
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
            console.log("Ejecutar SP4");


            //  @DIIO as nvarchar(50)
            // ,@RUP as nvarchar(50)
            // ,@Longitud as nvarchar(50)
            // ,@Latitud as nvarchar(50)
            // ,@UsuarioId as int
            // ,@EmpresaId as int

            mssql
                .connect(sqlConfig)
                .then((pool) => {
                    return pool
                        .request()
                        .input("DIIO", mssql.VarChar(50), diio) //    query(querySqls);
                        .input("RUP", mssql.VarChar(50), rup)
                        .input("Longitud", mssql.VarChar(50), longitud)
                        .input("Latitud", mssql.VarChar(50), latitud)
                        .input("empresaId", mssql.Int, empresaId)
                        .input("usuarioId", mssql.Int, usuarioId)
                        .execute("SP_InsertarGeoreferencia");
                })
                .then((result) => {
                    console.dir("resultado INSERT = " + result);
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

}

async function nuevoRegistroAnimalChecking(JsonAnimales) {

    // diio: string;
    // registroLoteEvento: eventoLote;
    // registroEnfermedades: registroEnfermedad[];
    // registroSanitario: registroSanitario;
    // registroMedicamentos: registroMedicamento[];
    // registroAlimentacion: registroAlimentacion;

    // console.log("JSON = >" + JSON.stringify(JsonAnimales));
    const dataT = JSON.stringify(JsonAnimales);
    const dataJson = JSON.parse(dataT);


    //const jsonData = JSON.parse(JsonAnimales);

    for (const a of dataJson) {
        //INSERTAR EVENTO LOTE
        console.log(" A => " + JSON.stringify(a))
        const dataELote = await this.nuevoEventoLote(a.registroLoteEvento.diio,
            a.registroLoteEvento.nombreLote, a.registroLoteEvento.ubicacionLote, a.registroLoteEvento.usuarioId,
            a.registroLoteEvento.empresaId, a.registroLoteEvento.pesoKg, a.registroLoteEvento.latitud, a.registroLoteEvento.longitud)

        //INSERTAR ENFERMEDADES
        await a.registroEnfermedades.forEach(e => {
            this.nuevoRegistroEnfermedad(e.diio, e.enfermedad, e.contieneEnfermedad, 0, e.usuarioId, e.empresaId,
                e.latitud, e.longitud)
        });
        //INSERTAR REGISTRO SANITARIO
        await this.nuevoRegistroSanitario(a.registroSanitario.diio, a.registroSanitario.parto, a.registroSanitario.aborto,
            a.registroSanitario.traumatismo, a.registroSanitario.parteCuerpo, a.registroSanitario.descorne,
            a.registroSanitario.castracion, a.registroSanitario.tecnicaCastracion,
            a.registroSanitario.observacionSanitaria, 0, a.registroSanitario.usuarioId,
            a.registroSanitario.empresaId, a.registroSanitario.latitud, a.registroSanitario.longitud)
        //INSERTAR MEDICAMENTOS
        await a.registroMedicamentos.forEach(m => {
            this.nuevoRegistroMedicamento(m.diio, m.medicamentoNombre, m.tipoMedicamento, m.presentacion, m.dosis,
                m.recetaNumero, m.usuarioId, m.empresaId, 0, m.latitud, m.longitud)
        });
        //INSERTAR ALIMENTACION
        await this.nuevoRegistroAlimentacion(a.registroAlimentacion.diio, a.registroAlimentacion.tipoAlimento,
            a.registroAlimentacion.unidadesAplicadas, a.registroAlimentacion.usuarioId, a.registroAlimentacion.empresaId,
            0, a.registroAlimentacion.latitud, a.registroAlimentacion.longitud)

    }

    return "OK";

}

async function syncronizarRegistrosAnimalChecking(JsonAnimales) {

    //VIENEN MUCHOS REGISTROS DESDE EL CELULAR OFF LINE
    // diio: string;
    // registroLoteEvento: eventoLote;
    // registroEnfermedades: registroEnfermedad[];
    // registroSanitario: registroSanitario;
    // registroMedicamentos: registroMedicamento[];
    // registroAlimentacion: registroAlimentacion;

    //
    const dataT = JSON.stringify(JsonAnimales);
    console.log("JSON = >" + JSON.stringify(JsonAnimales));
    var datoLimpio = dataT.replace(/['"]+/g, "'");
    const dataJson = JSON.parse(datoLimpio);


    //const jsonData = JSON.parse(JsonAnimales);
    for (var i = 0; i < dataJson.length; i++) {
        //console.log(" X => " + JSON.stringify(dataJson[i]))
        for (const a of dataJson[i]) {
            //INSERTAR EVENTO LOTE
             console.log(" A => " + JSON.stringify(a))
            const dataELote = await this.nuevoEventoLote(a.registroLoteEvento.diio,
                a.registroLoteEvento.nombreLote, a.registroLoteEvento.ubicacionLote, a.registroLoteEvento.usuarioId,
                a.registroLoteEvento.empresaId, a.registroLoteEvento.pesoKg, a.registroLoteEvento.latitud, a.registroLoteEvento.longitud)

            //INSERTAR ENFERMEDADES
            await a.registroEnfermedades.forEach(e => {
                this.nuevoRegistroEnfermedad(e.diio, e.enfermedad, e.contieneEnfermedad, 0, e.usuarioId, e.empresaId,
                    e.latitud, e.longitud)
            });
            //INSERTAR REGISTRO SANITARIO
            await this.nuevoRegistroSanitario(a.registroSanitario.diio, a.registroSanitario.parto, a.registroSanitario.aborto,
                a.registroSanitario.traumatismo, a.registroSanitario.parteCuerpo, a.registroSanitario.descorne,
                a.registroSanitario.castracion, a.registroSanitario.tecnicaCastracion,
                a.registroSanitario.observacionSanitaria, 0, a.registroSanitario.usuarioId,
                a.registroSanitario.empresaId, a.registroSanitario.latitud, a.registroSanitario.longitud)
            //INSERTAR MEDICAMENTOS
            await a.registroMedicamentos.forEach(m => {
                this.nuevoRegistroMedicamento(m.diio, m.medicamentoNombre, m.tipoMedicamento, m.presentacion, m.dosis,
                    m.recetaNumero, m.usuarioId, m.empresaId, 0, m.latitud, m.longitud)
            });
            //INSERTAR ALIMENTACION
            await this.nuevoRegistroAlimentacion(a.registroAlimentacion.diio, a.registroAlimentacion.tipoAlimento,
                a.registroAlimentacion.unidadesAplicadas, a.registroAlimentacion.usuarioId, a.registroAlimentacion.empresaId,
                0, a.registroAlimentacion.latitud, a.registroAlimentacion.longitud)

        }
    }


    return "OK";

}



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

async function nuevoEventoLote(diio, nombreLote, ubicacionLote, usuarioId, empresaId, pesoKg, latitud, longitud) {

    console.log("Ejecutar SP3");
    let pool = await mssql.connect(sqlConfig);

    let result2 = await pool
        .request()
        .input("Diio", mssql.VarChar(50), diio) //    query(querySqls);
        .input("NombreLote", mssql.VarChar(50), nombreLote)
        .input("UbicacionLote", mssql.VarChar(50), ubicacionLote)
        .input("UsuarioId", mssql.Int, usuarioId)
        .input("EmpresaId", mssql.Int, empresaId)
        .input("PesoKG", mssql.VarChar(50), pesoKg)
        .input("Latitud", mssql.VarChar(150), latitud)
        .input("Longitud", mssql.VarChar(150), longitud)
        .execute("SP_ACH_NuevoEventoLote");

    return result2;

}
async function nuevoRegistroEnfermedad(diio, enfermedad, contieneEnfermedad, eventoLoteId, usuarioId, empresaId, latitud, longitud) {

    console.log("Ejecutar SP3");
    let pool = await mssql.connect(sqlConfig);

    let result2 = await pool
        .request()
        .input("DIIO", mssql.VarChar(50), diio) //    query(querySqls);
        .input("Enfermedad", mssql.VarChar(80), enfermedad)
        .input("ContieneEnfermedad", mssql.VarChar(80), contieneEnfermedad)
        .input("EventoLoteId", mssql.Int, eventoLoteId)
        .input("UsuarioId", mssql.Int, usuarioId)
        .input("EmpresaId", mssql.Int, empresaId)
        .input("Latitud", mssql.VarChar(150), latitud)
        .input("Longitud", mssql.VarChar(150), longitud)
        .execute("SP_ACH_NuevoRegistroEnfermedad");
    return result2;


}
async function nuevoRegistroSanitario(diio, parto, aborto, traumatismo, parteCuerpo, descorne, castracion, tecnicaCastracion,
    observacion, eventoLoteId, usuarioId, empresaId, latitud, longitud) {
    console.log("Ejecutar SP4 => " + observacion);
    let pool = await mssql.connect(sqlConfig);

    let result2 = await pool
        .request()
        .input("DIIO", mssql.VarChar(50), diio) //    query(querySqls);
        .input("AnimalId", mssql.Int, 0)
        .input("Parto", mssql.VarChar(50), parto)
        .input("Aborto", mssql.VarChar(80), aborto)
        .input("Traumatismo", mssql.VarChar(150), traumatismo)
        .input("ParteCuerpoAnimal", mssql.VarChar(50), parteCuerpo)
        .input("Descorne", mssql.VarChar(80), descorne)
        .input("Castracion", mssql.VarChar(80), castracion)
        .input("TecnicaCastracion", mssql.VarChar(50), tecnicaCastracion)
        .input("ObservacionSanitaria", mssql.VarChar(2000), observacion)
        .input("EventoLoteId", mssql.Int, eventoLoteId)
        .input("UsuarioId", mssql.Int, usuarioId)
        .input("EmpresaId", mssql.Int, empresaId)
        .input("Latitud", mssql.VarChar(150), latitud)
        .input("Longitud", mssql.VarChar(150), longitud)
        .execute("SP_ACH_NuevoRegistroSanitario");
    return result2;

}
async function nuevoRegistroMedicamento(diio, medicamentoNombre, tipoMedicamento, presentacion, dosis,
    receta, usuarioId, empresaId, eventoLoteId, latitud, longitud) {

    console.log("Ejecutar SP3");
    let pool = await mssql.connect(sqlConfig);

    let result2 = await pool
        .request()
        .input("DIIO", mssql.VarChar(50), diio) //    query(querySqls);
        .input("MedicamentoNombre", mssql.VarChar(150), medicamentoNombre)
        .input("TipoMedicamento", mssql.VarChar(50), tipoMedicamento)
        .input("Presentacion", mssql.VarChar(50), presentacion)
        .input("Dosis", mssql.VarChar(50), dosis)
        .input("RecetaNumero", mssql.Int, receta)
        .input("UsuarioId", mssql.Int, usuarioId)
        .input("EmpresaId", mssql.Int, empresaId)
        .input("EventoLoteId", mssql.Int, eventoLoteId)
        .input("Latitud", mssql.VarChar(150), latitud)
        .input("Longitud", mssql.VarChar(150), longitud)
        .execute("SP_ACH_NuevoRegistroMedicamento");
    return result2;


}
async function nuevoRegistroAlimentacion(diio, tipoAlimento, unidadesAplicadas, usuarioId, empresaId, eventoLoteId, latitud, longitud) {

    console.log("Ejecutar SP3");
    let pool = await mssql.connect(sqlConfig);

    let result2 = await pool
        .request()
        .input("DIIO", mssql.VarChar(50), diio) //    query(querySqls);
        .input("TipoAlimento", mssql.VarChar(50), tipoAlimento)
        .input("UnidadesAplicadas", mssql.VarChar(50), unidadesAplicadas)
        .input("UsuarioId", mssql.Int, usuarioId)
        .input("EmpresaId", mssql.Int, empresaId)
        .input("EventoLoteId", mssql.Int, eventoLoteId)
        .input("Latitud", mssql.VarChar(150), latitud)
        .input("Longitud", mssql.VarChar(150), longitud)
        .execute("SP_ACH_NuevoRegistroAlimentacion");
    return result2;

}

exports.nuevoAnimal = nuevoAnimal;
exports.nuevaTarea = nuevaTarea;
exports.nuevaGeoreferenciaAnimal = nuevaGeoreferenciaAnimal;
exports.nuevoEventoLote = nuevoEventoLote;
exports.nuevoRegistroEnfermedad = nuevoRegistroEnfermedad;
exports.nuevoRegistroSanitario = nuevoRegistroSanitario;
exports.nuevoRegistroMedicamento = nuevoRegistroMedicamento;
exports.nuevoRegistroAlimentacion = nuevoRegistroAlimentacion;
exports.nuevoRegistroAnimalChecking = nuevoRegistroAnimalChecking;
exports.syncronizarRegistrosAnimalChecking = syncronizarRegistrosAnimalChecking;