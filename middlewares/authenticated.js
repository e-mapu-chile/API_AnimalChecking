"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'clave_secreta';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({mensaje:'La petición no tiene la cabecera de autenticación'});
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token,secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({mensaje:'El token ha expirado'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({mensaje:'Token no valido'});
    }

    req.user = payload;

    next();
};