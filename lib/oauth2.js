'use strict';

var store = require('./store');

module.exports = function (handler) {
  var data = store.get();
  return function oauthTwo (name) {
    var provider = data.providers[name];
    if (!provider.enabled) {
      return;
    }
    var opts = {
      clientID: provider.id,
      clientSecret: provider.secret,
      callbackURL: data.authority + provider.callback
    };

    data.passport.use(new provider.strategy(opts, oauthTwoHandler));

    function oauthTwoHandler (accessToken, refreshToken, profile, done) {
      var query = {};
      query[name + 'Id'] = profile.id;
      handler(query, profile, done);
    }
  };
};
