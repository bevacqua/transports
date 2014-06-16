'use strict';

var passport = require('passport');

module.exports = function setup (data, handler) {
  return function oauthOne (name, Strategy, fields) {
    if (!data.providers[name].enabled) {
      return;
    }
    var opts = {
      consumerKey: data.providers[name].id,
      consumerSecret: data.providers[name].secret,
      callbackURL: data.authority + data.providers[name].callback,
      profileFields: fields
    };

    passport.use(new Strategy(opts, oauthOneHandler));

    function oauthOneHandler (token, tokenSecret, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(query, profile, done);
    }
  };
};
