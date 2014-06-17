'use strict';

var store = require('./store');

module.exports = function (data, handler) {
  var data = store.get();
  return function openid (name, Strategy) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var opts = {
      returnURL: data.authority + provider.callback,
      realm: data.authority
    };

    data.passport.use(new provider.strategy(opts, openidHandler));

    function openidHandler (identifier, profile, done) {
      var query = {};
      query[name + 'Id'] = identifier;
      handler(query, profile, done);
    }
  };
};
