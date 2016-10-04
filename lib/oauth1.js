'use strict';

var url = require('url');
var store = require('./store');

module.exports = function setup (handler) {
  var data = store.get();
  return function oauthOne (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var opts = {
      consumerKey: provider.id,
      consumerSecret: provider.secret,
      callbackURL: url.resolve(data.authority, provider.callback),
      profileFields: data.fields
    };

    data.passport.use(new provider.strategy(opts, oauthOneHandler));

    function oauthOneHandler (token, tokenSecret, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(query, profile, done);
    }
  };
};
