'use strict';

var url = require('url');
var assign = require('assignment');
var store = require('./store');

module.exports = function (handler) {
  var data = store.get();
  return function oauthTwo (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var clientOpts = {
      clientID: provider.id,
      clientSecret: provider.secret,
      callbackURL: url.resolve(data.authority, provider.callback),
      passReqToCallback: true
    };
    var userExtras = provider.extras || {};
    var opts = assign(clientOpts, userExtras);

    data.passport.use(new provider.strategy(opts, oauthTwoHandler));

    function oauthTwoHandler (req, accessToken, refreshToken, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(req, query, profile, done);
    }
  };
};
