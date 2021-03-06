'use strict';

var url = require('url');
var assign = require('assignment');
var store = require('./store');

module.exports = function setup (handler) {
  var data = store.get();
  return function oauthOne (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var clientOpts = {
      consumerKey: provider.id,
      consumerSecret: provider.secret,
      callbackURL: url.resolve(data.authority, provider.callback),
      passReqToCallback: true
    };
    if (data.fields) {
      clientOpts.profileFields = data.fields;
    }
    var userExtras = provider.extras || {};
    var opts = assign(clientOpts, userExtras);

    data.passport.use(new provider.strategy(opts, oauthOneHandler));

    function oauthOneHandler (req, token, tokenSecret, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      if (opts.preserveToken) {
        query[name + 'Token'] = token;
        query[name + 'TokenSecret'] = tokenSecret;
      }
      handler(req, query, profile, done);
    }
  };
};
