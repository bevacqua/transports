'use strict';

var url = require('url');
var assign = require('assignment');
var store = require('./store');

module.exports = function (handler) {
  var data = store.get();
  return function openid (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var clientOpts = {
      returnURL: url.resolve(data.authority, provider.callback),
      realm: data.authority,
      passReqToCallback: true
    };
    var userExtras = provider.extras || {};
    var opts = assign(clientOpts, userExtras);

    data.passport.use(new provider.strategy(opts, openidHandler));

    function openidHandler (req, identifier, profile, done) {
      var query = {};
      query[name + 'Id'] = identifier;
      if (opts.preserveToken) {
        query[name + 'Token'] = token;
        query[name + 'TokenSecret'] = tokenSecret;
      }
      handler(req, query, profile, done);
    }
  };
};
