'use strict';

var _ = require('lodash');
var store = require('./store');

function passports (providerHandler) {
  var data = store.get();
  var protocols = {
    oauth1: require('./oauth1')(providerHandler),
    oauth2: require('./oauth2')(providerHandler),
    openid: require('./openid')(providerHandler)
  };

  _.keys(data.providers).forEach(function setup (name) {
    var provider = data.providers[name];
    var protocol = protocols[provider.protocol];
    if (!protocol) {
      throw new Error(provider.protocol + ' is unsupported');
    }
    protocol(name);
  });
}

module.exports = passports;
