'use strict';

var passport = require('passport');

module.exports = function (data, providerHandler) {
  return function openid (name, Strategy) {
    if (!data.providers[name].enabled) {
      return;
    }
    var opts = {
      returnURL: data.authority + data.providers[name].callback,
      realm: data.authority
    };

    passport.use(new Strategy(opts, openidHandler));

    function openidHandler (identifier, profile, done) {
      var query = {};
      query[name + 'Id'] = identifier;
      providerHandler(query, profile, done);
    }
  };
};