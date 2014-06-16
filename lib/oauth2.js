'use strict';

var passport = require('passport');

module.exports = function (providers, handler) {
  return function oauthTwo (name, Strategy) {
    if (!data.providers[name].enabled) {
      return;
    }
    var opts = {
      clientID: data.providers[name].id,
      clientSecret: data.providers[name].secret,
      callbackURL: data.authority + data.providers[name].callback
    };

    passport.use(new Strategy(opts, oauthTwoHandler));

    function oauthTwoHandler (accessToken, refreshToken, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(query, profile, done);
    }
  };
};
