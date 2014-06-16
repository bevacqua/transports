'use strict';

var passport = require('passport');

module.exports = function setup (data, handler) {
  return function oauthOne (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var opts = {
      consumerKey: provider.id,
      consumerSecret: provider.secret,
      callbackURL: data.authority + provider.callback,
      profileFields: fields
    };

    passport.use(new provider.strategy(opts, oauthOneHandler));

    function oauthOneHandler (token, tokenSecret, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(query, profile, done);
    }
  };
};
