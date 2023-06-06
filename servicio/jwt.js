"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'clave_secreta';

exports.createToken = function (user) {
  var payload = {
    sub: user.usuarioId,
    persona: user.personaId,
    name: user.nombrePersona,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix
  };

  return jwt.encode(payload,secret);
};
